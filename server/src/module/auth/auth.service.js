import User from './auth.model.js'
import ApiError from '../../common/utils/api-error.js'
import bcrypt from 'bcryptjs'
import * as jwtHelper from '../../common/utils/jwt-helper.js'

const generateTokensAndSaveRefreshTokenIntoDB = async (userobj) =>{
  // here userObj is mongoose document model object. 
  const accessToken = jwtHelper.generateAccessToken({
    id: userObj._id,
    email: userobj.email
  })
  const refreshToken = jwtHelper.generateRefreshToken({
    id:userobj._id
  })

  // save refreshToken into the database.
  userobj.refreshToken = refreshToken;
  await userObj.save({
    validateBeforeSave:false
  })

  return { accessToken, refreshToken}
}

const findUserByEmail = async (email) => {
  const user = await User.findOne({email});
  if(!user){
    return null;
  }
  return user;
}

export const createUserWithEmailAndPassword = async ({fullName,email,password}) => {
  const existUser = await findUserByEmail(email);
  if(existUser)
    throw ApiError.conflict("User with Email is already exist.")

  const user = await User.create({
    fullName,
    email,
    password
  })

  if(!user){
    throw ApiError.serverError("Internal server error to register the user.")
  }

  const userObj = user.toObject();
  delete userObj.password
  delete userObj.refreshToken;

  return {user: userObj}
}

export const signInUserWithEmailAndPassword = async ({email, password})=>{
  
  const user = await findUserByEmail(email);
  if(!user) 
    throw ApiError.badRequest("Email or password is wrong")

  const isPasswordMatched = await user.comparePassword(password)

  if(!isPasswordMatched)
    throw ApiError.badRequest("Email or password is wrong")

  const {accessToken, refreshToken} = await generateTokensAndSaveRefreshTokenIntoDB(user);
  const userResponse = user.toObject();

  return {user:userResponse, accessToken, refreshToken};
}

export const logOutUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId,{
    refreshToken: null
  })

}

export const refreshTheTokens = async (refreshToken) =>{
  if(!refreshToken)
    throw ApiError.badRequest("Refresh Token is missing.")

  let decodedToken;
  try{
    decodedToken = jwtHelper.verifyRefreshToken(refreshToken)
  }catch(err){
    if(err.name === "TokenExpiredError")
      throw ApiError.unauthorised("Refresh Token expired.")
    if(err.name === "JsonWebTokenError") 
      throw ApiError.unauthorised("Invalid refresh token.")

    throw ApiError.serverError("")
  }

  const user = await User.findById(decodedToken.id,"+refreshToken");
  if(!user)
    throw ApiError.unauthorised("User not Found");

  if(user.refreshToken !== refreshToken)
    throw ApiError.unauthorised("Invalid refresh token.")

  // generate new AccessToken and refreshtoken
  const {accessToken, refreshToken: newRefreshToken} = await generateTokensAndSaveRefreshTokenIntoDB(user)  
  const userResponse = user.toObject();
  delete userResponse.refreshToken;

  return {
    user:userResponse,
    accessToken,
    refreshToken: newRefreshToken
  }
}

export const resetPassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId,"+password");

  const isOldPasswordMatched = await user.comparePassword(oldPassword);

  if(!isOldPasswordMatched)
    throw ApiError.unauthorised("Old Password is wrong.")

  user.password = newPassword;
  await user.save({
    validateBeforeSave: true
  })

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    user:userResponse
  }
}

