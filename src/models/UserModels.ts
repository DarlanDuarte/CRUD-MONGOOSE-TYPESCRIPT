import { Request, Response } from 'express'
import { IUserModel } from '../schema/User'

import User from '../schema/User'

interface IUserModelsClass {
  user?: IUserModel | undefined
  existEmailMessage?: string | undefined
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

    const user = await User.create({ name, lastName, email, password })

    return {
      user,
    }
  }
}

export default new UserModels()
