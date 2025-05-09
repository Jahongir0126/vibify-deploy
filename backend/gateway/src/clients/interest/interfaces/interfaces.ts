export interface Interest {
    id: string;
    name: string;
    description?: string;
    userIds: string[];
    communityIds: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateInterestRequest {
    name: string;
    description?: string;
  }
  
  export interface UpdateInterestRequest {
    name?: string;
    description?: string;
  }
  
  export interface AddUserInterestRequest {
    userId: string;
    interestId: string;
  }
  
  export interface RemoveUserInterestRequest {
    userId: string;
    interestId: string;
  }
  
  export interface AddCommunityInterestRequest {
    communityId: string;
    interestId: string;
  }
  
  export interface RemoveCommunityInterestRequest {
    communityId: string;
    interestId: string;
  }
  
  export interface InterestResponse {
    id: string;
    name: string;
    description?: string;
    userIds: string[];
    communityIds: string[];
    createdAt: Date;
    updatedAt: Date;
  } 