import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync())
export const isValidPass = (user, password)=> bcrypt.compareSync(password, user.password)
export const __dirname = dirname(fileURLToPath(import.meta.url))