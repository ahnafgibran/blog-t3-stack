import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET_JWT || 'changme'

export function signJwt(data: object) {
  return jwt.sign(data, SECRET)
}

export function verifyJwt<T>(token: string) {  //to return context user, pass generic type
  return jwt.verify(token, SECRET) as T
}