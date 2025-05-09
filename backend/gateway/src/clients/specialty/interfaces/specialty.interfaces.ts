export interface SpecialtyResponse {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateSpecialtyRequest {
  name: string
  description?: string
}

export interface UpdateSpecialtyRequest {
  name?: string
  description?: string
}

export interface AddUserSpecialtyRequest {
  userId: string
  specialtyId: string
}

export interface RemoveUserSpecialtyRequest {
  userId: string
  specialtyId: string
}

export interface AddCommunitySpecialtyRequest {
  communityId: string
  specialtyId: string
}

export interface RemoveCommunitySpecialtyRequest {
  communityId: string
  specialtyId: string
} 