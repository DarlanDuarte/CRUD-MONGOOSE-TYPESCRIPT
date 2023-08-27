import { Request, Response } from 'express'
import User from '../schema/User'
import UserModels from '../models/UserModels'
import { IUserModel } from '../schema/User'

interface IcreatedUser {
  user: {
    name: string
    lastName: string
    email: string
    password: string
  }
}

class UserControllers {
  public async getUser(req: Request, res: Response) {
    const users = await User.find()

    return res.status(200).json(users)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, lastName, email, password } = req.body

    const user = await UserModels.create({
      name,
      lastName,
      email,
      password,
    })

    if (user.existEmailMessage) {
      return res.status(404).json(user.existEmailMessage)
    }

    if (!user.response) {
      return res.status(404).json(`Suas Credenciais não foram passadas corretamente!`)
    }
    const { name: userName, lastName: userLastName, email: userEmail } = user.response
    return res.status(201).json({
      Message: `Usuário Criado com sucesso: name: ${userName} - lastName: ${userLastName} -  email: ${userEmail}`,
    })
  }
}

export default new UserControllers()
