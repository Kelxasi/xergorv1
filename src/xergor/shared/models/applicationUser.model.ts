
export interface IDomainUser {
    authenticationUser: IApplicationUser;
    accessToken: string;  
    refreshToken: string;
    expiration: string;
    expires: Date;
    isExpired: boolean,
    created: Date;
    createdByIp: string,
    revoked: string,
    revokedByIp: string,
    replacedByToken: string,
    isActive: boolean;

}

export interface IApplicationUser {
    id: number;
    userCode: string;
    userName: string;
    accountId: number;
    roleId: number;
    employeeId: number;
    inUse: number;
}