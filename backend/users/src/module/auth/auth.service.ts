import type { User } from '@prisma/client'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '@prisma'
import { sign, refreshSign, signOut } from '@helpers'
import type {
  RetrieveAllUsersResponse,
  SignInRequest,
  SignInResponse,
  SignOutRequest,
  SignUpRequest,
  SignUpResponse,
} from './interfaces'

@Injectable()
export class AuthService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  //  Register User here by hashing password and return tokens
  async signUp(payload: SignUpRequest): Promise<SignUpResponse> {
    await this.#_chekExistsUser({ username: payload.username })

    const saltOrRounds = 10
    const hashPassword = await bcrypt.hash(payload.password, saltOrRounds)

    const newUser = await this.#_prisma.user.create({
      data: {
        username: payload.username,
        password: hashPassword,
      },
      select: {
        id: true,
        role: true,
      },
    })
    return {
      accessToken: sign({ id: newUser.id, role: newUser.role }),
      refreshToken: refreshSign({ id: newUser.id, role: newUser.role }),
    }
  }

  // User Authorization here by checking hash password

  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    const user = await this.#_chekUser({
      username: payload.username,
      password: payload.password,
    })

    const checkPassword = await bcrypt.compare(payload.password, user.password)
    if (!checkPassword) {
      throw new ConflictException('Password is wrong!')
    }

    const accessToken = await sign({ id: user.id, role: user.role })
    const refreshToken = await refreshSign({ id: user.id, role: user.role })

    await this.#_prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken,
        refreshToken,
      },
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  //  User Sign out  here
  async signOut(payload: SignOutRequest) {
    try {
      const user = await signOut(payload)
      await this.#_prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          accessToken: null,
          refreshToken: null,
        },
      })
    } catch (err) {
      return err
    }
  }

  //  Here delete and restore methods
  async deleteAccount(payload: { id: string }) {
    await this.#_prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        deletedAt: new Date(Date.now()),
      },
    })
  }

  async restoreAccount(payload: { id: string }) {
    await this.#_prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        deletedAt: null,
      },
    })
  }

  async retrieveAllUsers(): Promise<RetrieveAllUsersResponse[]> {
    return this.#_prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    })
  }

  //  Cheking methods

  async #_chekUser(payload: {
    username: string
    password?: string
  }): Promise<Pick<User, 'id' | 'password' | 'role'>> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        username: payload.username,
        deletedAt: null,
      },
      select: {
        id: true,
        password: true,
        role: true,
      },
    })

    if (!user) {
      const deletedUser = await this.#_prisma.user.findFirst({
        where: {
          username: payload.username,
        },
        select: {
          id: true,
        },
      })

      if (deletedUser) {
        throw new ConflictException('User already deleted!')
      }
      throw new NotFoundException('User not found!')
    }

    return {
      id: user.id,
      password: user.password,
      role: user.role,
    }
  }

  async #_chekExistsUser(payload: { username: string }): Promise<null> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        username: payload.username,
      },
      select: {
        id: true,
      },
    })

    if (user) {
      throw new ConflictException('User already exists')
    }

    return null
  }
}
