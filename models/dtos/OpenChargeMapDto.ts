export interface OpenchargemapDto {
  isRecentlyVerified: boolean;
  dateLastVerified: Date;
  id: number;
  uuid: string;
  dataProviderID: number;
  operatorID: number;
  usageTypeID: number;
  usageCost: string;
  addressInfo: {
    id: number;
    title: string;
    addressLine1: string;
    addressLine2: string;
    town: string;
    stateOrProvince: string;
    postcode: string;
    countryID: number;
    latitude: number;
    longitude: number;
    distance: number;
    distanceUnit: number;
  };
  connections: {
    id: number;
    connectionTypeID: number;
    statusTypeID: number;
    levelID: number;
    powerKW: number;
    currentTypeID: number;
    quantity: number;
  }[];
  numberOfPoints: number;
  statusTypeID: number;
  dateLastStatusUpdate: Date;
  dataQualityLevel: number;
  dateCreated: Date;
  submissionStatusTypeID: number;
}
