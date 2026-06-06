import bcrypt from 'bcryptjs';
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password:{
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  refreshToken:{
    type: String,
    select: false,
  }
},{
  timestamps:true
})

userSchema.pre('save',async function (){
  if(!this.isModified('password')) return ;

  this.password = await bcrypt.hash(this.password,10);
})

userSchema.method('comparePassword', async function (clearTextPassword){
  return await bcrypt.compare(clearTextPassword,this.password);
})

export default  mongoose.model("user",userSchema) 