import mongoose from 'mongoose'

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/praticando1'

const connection = mongoose.createConnection(MONGO_DB_URL)

export default connection
