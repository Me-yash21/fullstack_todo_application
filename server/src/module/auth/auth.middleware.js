import ApiError from '../../common/utils/api-error.js'
import { verifyAccessToken } from '../../common/utils/jwt-helper.js'
import User from './auth.model.js'

export const authenticate = async (req, _, next) => {
  const token = req.cookies?.accessToken ?? (req.get("Authorization")?.startsWith("Bearer") ? req.get("Authorization").replace("Bearer ", "") : undefined)
  if (!token)
    throw ApiError.unauthorised("User is not authenticated.")

  let decodedToken;
  try {
    decodedToken = jwtHelper.verifyAccessToken(token)
  } catch (err) {
    if (err.name === "TokenExpiredError")
      throw ApiError.unauthorised("Access Token expired.")
    if (err.name === "JsonWebTokenError")
      throw ApiError.unauthorised("Invalid Access Token.")

    throw ApiError.serverError("Internal server Error.")
  }

  const user = await User.findById(decodedToken.id)
  if (!user)
    throw ApiError.unauthorised("Token is invalid");

  req.user = {
    id: user._id,
    email: user.email
  }
  next();
}