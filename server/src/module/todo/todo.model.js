import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  task: {
    type: String,
    required: true,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false
  },
  tags: {
    type: [String],
    validate: [tagsValidator, '{PATH} length must be less than 6']
  }
}, {
  timestamps: true
})

function tagsValidator(values) {
  return values.length <= 5
}

const Todo = mongoose.model('Todo', todoSchema);
export default Todo