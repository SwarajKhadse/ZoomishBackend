 const express = require('express')
 const http = require('http')
 const app = express()
 const server = http.createServer(app)
//  const socket = require("socket.io")
const BASE_URL = process.env.BASE_URL
 const io = require("socket.io")(server,{
     cors:{
        origin:BASE_URL,
        methods:["GET","POST"] 
     }
 }) 

io.on("connection",(socket)=>{
    socket.emit("me",socket.id)

    socket.on("disconnect",()=>{
        socket.broadcast.emit("callEnded")
    })


    socket.on("callUser",(data)=>{
        io.to(data.userToCall).emit("callUser",{signal:data.signalData,from:data.from,name:data.name})
    })


    socket.on("answerCall",(data)=>{
        io.to(data.to).emit("callAccepted",data.signal)
    })
})

const PORT = process.env.PORT || 5000

 server.listen(PORT,()=>{
     console.log(`server started on  port ${PORT}`)
 })