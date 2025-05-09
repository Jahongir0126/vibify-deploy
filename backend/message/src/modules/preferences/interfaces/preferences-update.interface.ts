export declare interface PreferenceUpdateRequest {
    userId: string;
    preferredGender?: string;
    ageMin?: number;
    ageMax?: number;
    locationRadius?: number;
}