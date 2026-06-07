import jwt from 'jsonwebtoken'

const generateAccessToken = (payload) =>{
  return jwt.sign(payload,process.env.ACCESSTOKEN_SECRET, {
    expiresIn: process.env.ACCESSTOKEN_EXPIRY
  })
}

const generateRefreshToken = (payload) =>{
  return jwt.sign(payload,process.env.REFRESHTOKEN_SECRET,{
    expiresIn: process.env.REFRESHTOKEN_EXPIRY
  })
}

const verifyAccessToken = (token) =>{
  return jwt.verify(token,process.env.ACCESSTOKEN_SECRET);
}

const verifyRefreshToken = (token) =>{
  return jwt.verify(token, process.env.REFRESHTOKEN_SECRET)
}

export { 
  generateAccessToken, 
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
}
