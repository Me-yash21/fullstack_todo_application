import * as authService from './auth.service.js'
import ApiResponse from '../../common/utils/api-response.js'
import ApiError from '../../common/utils/api-error.js';

const register = async (req, res) =>{
  const {user} = await authService.createUserWithEmailAndPassword(req.body);

  return ApiResponse.created(res,"User registered Successfully",{user})
}

const login = async (req,res) =>{
  const {user, accessToken, refreshToken} = await authService.signInUserWithEmailAndPassword(req.body)

  res.cookie("refreshToken",refreshToken,{
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  })
  res.cookie("accessToken",accessToken,{
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  })

  return ApiResponse.ok(res,"User logedIn successfully",{user})
}

const logout = async (req,res) =>{
  await authService.logOutUser(req.user.id)

  // Web browsers and other compliant clients will only clear the cookie if 
  // the given options is identical to those given to res.cookie()
  res.clearCookie("refreshToken",{
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  })
  res.clearCookie("accessToken",{
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  })
  return ApiResponse.noContent(res,"User logout successfully.")
}

const refresh = async (req,res) =>{
  // does it will be the secure route not, it will not be the secure route. 
  // it take the refresh token from the cookies.refreshtoken or req.get(X-Refresh-Token)
  // and pass the refereshToken to the function or service

  const token = req.cookies.refreshToken ?? req.get("X-Refresh-Token")

  if(!token)
    throw ApiError.unauthorised("Refresh Token is missing.")

  const {user, accessToken, refreshToken} = await authService.refreshTheTokens(token);

  res.cookie("refreshToken",refreshToken,{
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  })
  res.cookie("accessToken",accessToken,{
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  })

  return ApiResponse.ok(res,"Tokens refresh successfully",{user})
}

const resetPassword = async (req,res) =>{
  const {oldPassword, newPassword} = req.body;

  const {user} = await authService.resetPassword(req.user.id,oldPassword,newPassword)

  return ApiResponse.ok(res,"Password reset successfully",{user})
}

export {
  register,
  login,
  logout,
  refresh,
  resetPassword
}