import { Request, Response } from 'express'
import { IUserModel } from '../schema/User'

import User from '../schema/User'

interface IUserModelsClass {
  response?: IUserModel
  existEmailMessage?: string
}

interface IDeleteUser {
  email: string
}

class UserModels {
  public async create(data: {
    name: string
    lastName: string
    email: string
    password: string
  }): Promise<IUserModelsClass> {
    const existEmail = await User.exists({ email: data.email })

    if (existEmail) {
      return { existEmailMessage: `O Email já existe!` }
    }

    if (!data.name || !data.lastName || !data.email || !data.password) {
      throw new Error(`Suas Credenciais não foram passadas corretamente!`)
    }

    const { name, lastName, email, password } = data

    const response = await User.create({ name, lastName, email, password })

    return {
      response,
    }
  }

  public async deleteUser({ email }) {
    const user = await User.exists({ email })

    if (!user) return { message: `Usuário não existe!` }

    const result = await User.deleteOne({ email })

    console.log(result)

    return {
      result,
    }
  }
}

export default new UserModels()
