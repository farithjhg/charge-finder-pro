const User = require("../schemas/userModel")

class UserService {
  constructor(repo, mapper) {
    this.repository = repo
    this.map = mapper
  }

  async findUserByEmail(email) {
    const user = await this.repository.findOne({ email })

    console.log('User Map', this.map.toDto(user))

    return user != null
      ? {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password
        }
      : user
  }

  async findAll(page, elements) {
    const users = await this.repository
      .find({
        limit: elements,
        skip: page * elements
      })
      .exec()

    return Promise.resolve(users.map(user => this.map.toDto(user)))
  }

  async count() {
    return this.repository.countDocuments({}).exec()
  }

  async save(userDto) {
    const entityCreated = await this.repository.create(
      this.map.toEntity(userDto)
    )
    return this.map.toDto(entityCreated)
  }

  async findUserById(userId) {
    const entity = await this.repository
      .findOne({
        _id: userId
      })
      .exec()
    return entity != null ? Promise.resolve(this.map.toDto(entity)) : entity
  }

  async delete(userId) {
    const rowDeleted = await this.repository.deleteOne({ _id: userId }).exec()
    return rowDeleted.deletedCount
  }

  async update(userId, updateFields) {
    return this.repository
      .findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            name: updateFields.name,
            email: updateFields.email,
            status: updateFields.status
          }
        },
        {
          new: true
        }
      )
      .exec()
  }
}

module.exports = UserService;