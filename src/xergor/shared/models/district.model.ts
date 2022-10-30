export interface IDistrict{
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IDistrictData[];
}
 
export interface IDistrictData {
    id: number;
    cityId: number,
    districtCode: string;
    districtName: string;
    inUse: boolean;
    insertedAt: Date;
    insertedBy: number;
    updatedAt: Date;
    UpdatedBy: number;
}
