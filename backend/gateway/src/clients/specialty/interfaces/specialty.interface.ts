export interface Specialty {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSpecialty {
  userId: string;
  specialtyId: string;
}

export interface CommunitySpecialty {
  communityId: string;
  specialtyId: string;
}

export interface SpecialtyResponse extends Specialty {}
export interface CreateSpecialtyRequest {
  name: string;
  description?: string;
}

export interface UpdateSpecialtyRequest {
  name?: string;
  description?: string;
}

export interface AddUserSpecialtyRequest extends UserSpecialty {}
export interface RemoveUserSpecialtyRequest extends UserSpecialty {}
export interface AddCommunitySpecialtyRequest extends CommunitySpecialty {}
export interface RemoveCommunitySpecialtyRequest extends CommunitySpecialty {} 