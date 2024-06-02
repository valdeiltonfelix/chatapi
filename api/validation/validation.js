const {body,validationResult } = require('express-validator');
const loginValidator = [
  body('login', 'Campo login Não pode ser vazio').not().isEmpty(),
  body('password', 'Campo password Não pode ser vazio').not().isEmpty(),
  body("admin",'Campo admin Tem que ser do tipo booleano').isBoolean(),
]

module.exports={
  loginValidator
}