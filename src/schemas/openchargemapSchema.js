const mongoose = require('mongoose');

const openchargemapSchema = new mongoose.Schema({
    IsRecentlyVerified: Boolean,
    DateLastVerified: Date,
    ID: Number,
    UUID: String,
    DataProviderID: Number,
    OperatorID: Number,
    UsageTypeID: Number,
    UsageCost: String,
    AddressInfo: {
      ID: Number,
      Title: String,
      AddressLine1: String,
      AddressLine2: String,
      Town: String,
      StateOrProvince: String,
      Postcode: String,
      CountryID: Number,
      Latitude: Number,
      Longitude: Number,
      Distance: Number,
      DistanceUnit: Number,
    },
    Connections: [
      {
        ID: Number,
        ConnectionTypeID: Number,
        StatusTypeID: Number,
        LevelID: Number,
        PowerKW: Number,
        CurrentTypeID: Number,
        Quantity: Number,
      }
    ],
    NumberOfPoints: Number,
    StatusTypeID: Number,
    DateLastStatusUpdate: Date,
    DataQualityLevel: Number,
    DateCreated: Date,
    SubmissionStatusTypeID: Number
  }, { collection: 'openchargemap' });  

const OpenChargeMapModel = mongoose.model('Openchargemap', openchargemapSchema);

module.exports = OpenChargeMapModel;
