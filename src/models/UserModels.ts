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

  public async updateUser({ id, email, password }) {
    try {
      const user = await User.exists({ _id: id })

      if (!user) return { msg: `Usuário não existe!` }

      const result = await User.findByIdAndUpdate(id, { email, password })

      console.log(result)

      return {
        result,
      }
    } catch (e: any) {
      console.log(e.message)
      return { msgError: `Error ao atualizar usuário!` }
    }
  }
}

export default new UserModels()
