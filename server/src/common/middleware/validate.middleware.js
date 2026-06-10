import ApiError from '../utils/api-error.js'

export const validate = (dtoClass) => (req,res,next) =>{

  //if user doesn't sent the body , it will be undefiend
  // and when pass the undefined in joiSchema.validate(undefiend) it give 
  // undefiend for both value and error.
  // so if req.body is undefied or null then assign it empty object.
  const data = req.body ?? {}
  const {errors, value} = dtoClass.validate(data);

  if(errors){
    throw ApiError.badRequest(errors.join("; "))
  }

  req.body = value;
  next();
}