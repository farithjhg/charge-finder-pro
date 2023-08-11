
class OpenChargeMapService {
    constructor(repo) {
        this.repository = repo
        //this.map = mapper
    }

    async findAllPaginated(skip, elements) {
      const entities = await this.repository
          .find()
          .limit(elements)
          .skip(skip)
          .exec();
  
        return Promise.resolve(entities)
    }

    async findAll(page, elements) {
      const entities = await this.repository
        .find({
          limit: elements,
          skip: page * elements
        })
        .exec()
        
  
      return Promise.resolve(entities.map(entity => this.map.toDto(entity)))
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
    
module.exports = OpenChargeMapService;
