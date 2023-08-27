import { Request, Response } from 'express'
import User from '../schema/User'
import UserModels from '../models/UserModels'
import { IUserModel } from '../schema/User'

class UserControllers {
  public async getUsers(req: Request, res: Response) {
    const users = await User.find()

    return res.status(200).json(users)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
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
    } catch (e: any) {
      console.log(e.message)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { email } = req.params

    const response = await UserModels.deleteUser({ email })

    if (response.message) return res.status(400).json(response.message)

    return res.status(200).json({ mensagem: `Usuário deletado com sucesso!`, resposta: response.result?.acknowledged })
  }

  public async updateUser(req: Request, res: Response) {
    const { email, password } = req.body
    const { id } = req.params

    const response = await UserModels.updateUser({ id, email, password })

    if (response.msg) return res.status(400).json(response.msg)
    if (response.msgError) return res.status(400).json(response.msgError)

    return res.status(200).json(response.result)
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (!email || !password) return res.status(401).json({ msg: `Credenciais estão incorretas!` })

      const user = await User.findOne({ email, password })

      if (!user) return res.status(401).json({ msg: `Usuário não existe! ou Senha incorreta!` })

      return res.status(200).json({ msg: `Login bem sucedido`, user })
    } catch (e: any) {
      console.log(e.message)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}

export default new UserControllers()
