import ApiError from '../utils/api-error.js'

export const validate = (dtoClass) => (req,res,next) =>{
  const {errors, value} = dtoClass.validate(req.body);

  if(errors){
    throw ApiError.badRequest(errors.join("; "))
  }

  req.body = value;
  next();
}