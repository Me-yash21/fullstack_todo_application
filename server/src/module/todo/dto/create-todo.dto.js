import BaseDto from '../../../common/dto/base-dto.js'
import Joi from 'joi'

class CreateTodoDto extends BaseDto {
  static schema = Joi.object({
    task: Joi.string().trim().required(),
    isCompleted: Joi.boolean().default(false),
    tags: Joi.array().items(Joi.string()).allow(null).optional()
  })
}

export default CreateTodoDto;