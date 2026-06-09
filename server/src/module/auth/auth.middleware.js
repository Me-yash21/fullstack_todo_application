import ApiError from '../../common/utils/api-error.js'
import {verifyAccessToken} from '../../common/utils/jwt-helper.js'
import User from './auth.model.js'

export const authenticate = async (req,_,next) =>{
  const token = req.cookies?.accessToken ?? (req.get("Authorization")?.startsWith("Bearer") ? req.get("Authorization").replace("Bearer ","") : undefined )
  if(!token)
    throw ApiError.unauthorised("User is not authenticated.")

  const decodedToken = verifyAccessToken(token)

  const user = await User.findById(decodedToken.id)
  if(!user)
    throw ApiError.unauthorised("Token is invalid");

  req.user = {
    id: user._id,
    email: user.email
  }
  next();
}