class ApiError extends Error{
  constructor(statusCode, message){
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    Error.captureStackTrace(this,this.constructor)
  }

  static unauthorised(message="Unauthorised Request"){
    return new ApiError(401,message)
  }

  static badRequest(message="Bad Request"){
    return new ApiError(400,message)
  }

  static conflict(message="Conflict"){
    return new ApiError(409,message)
  }

  static forbidden(message="forbidden"){
    return new ApiError(403,message)
  }

  static notFound(message="Not Found"){
    return new ApiError(404,message)
  }
}

export default ApiError;