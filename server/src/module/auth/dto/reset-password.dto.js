import Joi from 'joi'
import BaseDto from '../../../common/dto/base-dto.js'

class ResetPasswordDto extends BaseDto {
  static schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(8)
  })
}

export default ResetPasswordDto;