const app = require("express")();
const indexRoute = require("./routes/index");
const {createRoom, joinRoom, removeUser, getUsers} = require("./models/users");

const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*"
    }
});
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(require('cors')())

app.use(indexRoute);

io.on("connection", socket=>{
    let socketData=null;

    //When room is first created by admin
    socket.on("adminJoin", (data, callback)=>{
        const {payload} = createRoom(data.username, data.chatroomName, socket.id);
        socketData = {
            username: data.username,
            chatroomId: socket.id
        }
        socket.emit("serverNotification", {
            user: "admin",
            message: `Welcome to your chatroom ${data.username}`
        })

        socket.join(socket.id);
        socket.emit("usersData", getUsers(socket.id));
        callback({payload});
    })

    //When users join the room
    socket.on("join", (data, callback)=>{
        const {error, payload} = joinRoom(data.username, data.chatroomId);
        
        if(error){
            callback({error});
            return;
        }

        //To store user data for use in disconnection
        socketData = {
            username: data.username,
            chatroomId: data.chatroomId
        }

        //To send notification to the client
        socket.emit("serverNotification", {
            user: "admin",
            message: `Welcome to the chatroom ${data.username}`
        })

        socket.broadcast.to(data.chatroomId).emit("serverNotification", {
            user: "admin",
            message: `${data.username} joined the room`
        })


        socket.join(data.chatroomId);

        io.to(data.chatroomId).emit("usersData", getUsers(data.chatroomId));
        callback({payload});
    })

    socket.on("clientMessage", (data)=>{
        io.to(socketData.chatroomId).emit("serverMessage", (data));
    })
    
    //When someone disconnects from the room
    socket.on("disconnect", ()=>{
        if(socketData.username && socketData.chatroomId){
            removeUser(socketData.username, socketData.chatroomId);
            io.to(socketData.chatroomId).emit("usersData", getUsers(socketData.chatroomId));
            socket.broadcast.to(socketData.chatroomId).emit("serverNotification", {
                user: "admin",
                message: `${socketData.username} left the room`
            })
        }
        console.log("User left!");
    })
})

httpServer.listen(PORT, ()=>{
    console.log("Server started");
})