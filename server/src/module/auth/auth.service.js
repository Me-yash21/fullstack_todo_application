import User from './auth.model.js'
import ApiError from '../../common/utils/api-error.js'
import bcrypt from 'bcryptjs'

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