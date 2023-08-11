CREATE TABLE openchargemap (
    IsRecentlyVerified BOOLEAN,
    DateLastVerified DATETIME,
    ID INT PRIMARY KEY,
    UUID VARCHAR(255),
    DataProviderID INT,
    OperatorID INT,
    UsageTypeID INT,
    UsageCost VARCHAR(255),
    AddressInfoID INT,
    ConnectionsID INT,
    NumberOfPoints INT,
    StatusTypeID INT,
    DateLastStatusUpdate DATETIME,
    DataQualityLevel INT,
    DateCreated DATETIME,
    SubmissionStatusTypeID INT
);

CREATE TABLE addressinfo (
    ID INT PRIMARY KEY,
    Title VARCHAR(255),
    AddressLine1 VARCHAR(255),
    AddressLine2 VARCHAR(255),
    Town VARCHAR(255),
    StateOrProvince VARCHAR(255),
    Postcode VARCHAR(20),
    CountryID INT,
    Latitude DECIMAL(10, 6),
    Longitude DECIMAL(10, 6),
    Distance DECIMAL(20, 15),
    DistanceUnit INT
);

CREATE TABLE connections (
    ID INT PRIMARY KEY,
    ConnectionTypeID INT,
    StatusTypeID INT,
    LevelID INT,
    PowerKW DECIMAL(10, 2),
    CurrentTypeID INT,
    Quantity INT,
    OpenchargemapID INT,
    FOREIGN KEY (OpenchargemapID) REFERENCES openchargemap(ID)
);

ALTER TABLE openchargemap ADD FOREIGN KEY (AddressInfoID) REFERENCES addressinfo(ID);
ALTER TABLE openchargemap ADD FOREIGN KEY (ConnectionsID) REFERENCES connections(ID);