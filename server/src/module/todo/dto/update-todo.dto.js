import BaseDto from '../../../common/dto/base-dto.js'
import Joi from 'joi'

class UpdateTodoDto extends BaseDto {
  static schema = Joi.object({
    task: Joi.string().trim(),
    tags: Joi.array().items(Joi.string())
  }).or('task','tags')
}

export default UpdateTodoDto;