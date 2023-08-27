import connection from '../database/connection'
import { Schema, Document } from 'mongoose'

export interface IUserModel extends Document {
  name?: string
  lastName?: string
  email?: string
  password?: string
}

const UserSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  },
)

UserSchema.methods.fullName = function (): string {
  return `${this.name} ${this.lastName}`
}

const User = connection.model<IUserModel>('User', UserSchema)

export default User
