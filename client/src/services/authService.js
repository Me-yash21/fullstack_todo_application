import api from './api.js'

const authService = {
  async registerUser(fullName,email,password){
    const response = await api.post('/auth/register',{fullName,email,password});
    return response.data;
  },

  async loginUser(email,password){
    const response = await api.post('/auth/login',{email,password});
    return response.data;
  },

  async logout(){
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async resetPassword(oldPassword,newPassword){
    const response = await api.post('/auth/reset-password',{oldPassword,newPassword})
    return Response.data;
  }
}

export default authService