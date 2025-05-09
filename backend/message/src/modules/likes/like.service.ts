import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { LikeCheckRequest, LikeCreateRequest, LikeDeleteRequest } from './interfaces';

@Injectable()
export class LikeService {
    readonly #_prisma: PrismaService;

    constructor(prisma: PrismaService) {
        this.#_prisma = prisma;
    }

    async #_findLike(likeId: string): Promise<void> {
        const like = await this.#_prisma.like.findFirst({
            where: {
                id: likeId,
            },
        });
        if (!like) {
            throw new NotFoundException('Like not found');
        }
    }

    async checkLike(data: LikeCheckRequest): Promise<boolean> {
        
        try {
            const like = await this.#_prisma.like.findFirst({
                where: {
                    likerId: data.likerId,
                    likedId: data.likedId
                }
            });
            return !!like;
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async createLike(data: LikeCreateRequest): Promise<null> {
        
        try {
            await this.#_prisma.like.create({
                data: {
                    likerId: data.likerId,
                    likedId: data.likedId
                }
            });
            return null;
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async deleteLike(data: LikeDeleteRequest): Promise<null> {
        try {
            await this.#_findLike(data.likeId);
            await this.#_prisma.like.delete({
                where: {
                    id: data.likeId
                }
            });
            return null;
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async retrieveAllLikes() {
        try {
            return await this.#_prisma.like.findMany();
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async retrieveLikesByUser(userId: string) {
        try {
            return await this.#_prisma.like.findMany({
                where: {
                    likerId: userId
                }
            });
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }
}
