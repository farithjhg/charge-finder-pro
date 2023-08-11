const User = require("../schemas/userModel");

class UserMap {
  
  toEntity(dto) {
    const { name, role, email, password, status } = dto;
    return new User({ name, email, role, password, status });
  }

  toDto(entity) {
    const { _id, name, email, role, status } = entity;
    return { id: _id, name, email, role, status };
  }
}

module.exports = UserMap;
