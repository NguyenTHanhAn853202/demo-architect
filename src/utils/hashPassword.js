const bcrypt = require('bcrypt');
const {SATL} = require('./secret');
 const hash = (password)=>{
    
    return bcrypt.hashSync(password,+SATL)
}

 const compare = (password, hashedPassword)=>{
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {hash, compare}