    
import * as mongoose from 'mongoose';

const UserSchema = {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
};
const User = new mongoose.Schema(UserSchema, { timestamps: true });

// User.pre('save', async (next, docs) => {
//   console.log('creating user', docs);
//   const user = await docs.findOne({ email: docs.email });
//   if (user) throw new Error('user already exists!');
//   next();
// });

// custom method
// myModel.methods.changeTitle = function (newTitle) {
// 	this.name = newTitle;
// 	this.save();
// }

// static method
// myModel.statics = {
//   findUser(name) {
//   	return this.findOne({name})
//   }
// }

// 나중에 await MyModel.changeTitle('this will be the new title'); 로 실행

export default mongoose.model('User', User); // <- 여기에 String으로 전달하는 인자가 실제 mongoose에서 사용할 이름/테이블 이름