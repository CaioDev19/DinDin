const jwt = require("jsonwebtoken")

function signJwt(payLoad, secretKey, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payLoad,
      secretKey,
      options,
      (error, token) => {
        if (error) {
          return reject(error)
        }
        return resolve(token)
      }
    )
  })
}

function verifyTokenJwt(token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretKey,
      (error, data) => {
        if (error) {
          return reject(error)
        }
        return resolve(data)
      }
    )
  })
}
module.exports = {
  signJwt,
  verifyTokenJwt
}