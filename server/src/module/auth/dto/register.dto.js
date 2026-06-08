import Joi from 'joi'
import BaseDto from '../../../common/dto/base-dto.js'

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    fullName: Joi.string().required().trim().min(3),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(8)
  })
}

export default RegisterDto;