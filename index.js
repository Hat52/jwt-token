const express = require('express')
const bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
const { json } = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const users =  {
    email:"email@test.com",
    password:'password'
}
let refreshTokens = []
app.post('/login',(req,res)=>{
    if(users.email !== req.body.email || users.password !== req.body.password){
        return res.json({status:false,message:"unable to find user"})
     }
    var token = jwt.sign({email:req.body.email}, 'privateKey', { algorithm: 'HS256',expiresIn:'1m'});
    var refreshToken = jwt.sign({email:req.body.email}, 'refreshKey', { algorithm: 'HS256'});
    refreshTokens.push(refreshToken)
    res.json({status:true,token:token,refreshToken:refreshToken})
})
app.post('/token',(req,res)=>{
    const refreshToken =  req.body.refreshToken
    if(refreshToken === null) return res.sendStatus(403)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(401)
    jwt.verify(refreshToken,'refreshKey',(error,result)=>{
        if(error){
            return res.json({status:false})
        }else if(!result){
            return res.json({status:false})
        }
        const newToken =  jwt.sign({email:req.body.email}, 'privateKey', { algorithm: 'HS256',expiresIn:'1m'})
        res.json({status:true,refreshToken:newToken})

    })
})
const middleWare = (req,res,next)=>{
    jwt.verify(req.body.token,'privateKey',(error,result)=>{
        
    if(error){
        res.json({status:false,error:error})
    }else if(result){
        next()
    }else{
        res.json({status:false,result:result})
    }
})
}
app.post('/test',middleWare,(req,res)=>{
  res.json({status:"user validated"})  
    
})
app.listen(4000,console.log('server is up and running'))