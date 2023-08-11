const UserService = require("./UserService");
const UserMap  = require("../mappers/UserMap");
const userModel = require("../schemas/userModel");
const userService = new UserService(userModel, new UserMap() );

const OpenChargeMapService = require("./OpenChargeMapService");
const OpenChargeMapModel = require("../schemas/openchargemapSchema")
const openChargeMapService = new OpenChargeMapService(OpenChargeMapModel)

const services = {
    userService,
    openChargeMapService,
  };

module.exports = services;