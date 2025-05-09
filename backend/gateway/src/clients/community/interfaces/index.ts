export interface CommunityCreateRequest {
  name: string
  description?: string
  interestIds?: string[]
  specialtyId?: string
}

export interface CommunityUpdateRequest {
  name?: string
  description?: string
  avatar?: string
  tags?: string[]
  rules?: string
  interestIds?: string[]
  specialtyId?: string
}

export interface CommunityRetrieveAllResponse {
  id: string
  name: string
  description: string
  specialty?: {
    id: string
    name: string
  }
  interests?: {
    id: string
    name: string
  }[]
  members?: {
    userId: string
    name: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface JoinCommunityRequest {
  userId: string
}

export interface LeaveCommunityRequest {
  userId: string
}

export interface GetUserCommunitiesRequest {
  userId: string
}

export interface GetCommunityUsersRequest {
  communityId: string
}

export interface FindCommunitiesByInterestsRequest {
  interestIds: string[]
}

export interface FindCommunitiesBySpecialtyRequest {
  specialtyId: string
}

export interface CommunityUserResponse {
  userId: string
  name: string
  email: string
  avatar?: string
} 