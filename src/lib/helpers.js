const path = require('path')
const bcrypt = require('bcryptjs')

const helpers = {}

helpers.fileType = (fileMimetype, fileOriginalname) => {
    const filetypes = /jpeg|jpg|png/
    const mimetype = filetypes.test(fileMimetype)
    const extname = filetypes.test(path.extname(fileOriginalname))
    return mimetype && extname 
} 

helpers.imageSize = (imageSize) => {
    return imageSize <= 2000000
}

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.matchPassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword)
    } catch (e) {
        console.log(e)        
    }
}

module.exports = helpers    