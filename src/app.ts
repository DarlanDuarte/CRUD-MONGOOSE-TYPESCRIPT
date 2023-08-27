import express from 'express'
import cors from 'cors'
import router from './routes/router'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middleware()
    this.router()
  }

  middleware() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  router() {
    this.app.use(router)
  }
}

export default new App().app
