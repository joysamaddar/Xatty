const app = require("express")();
const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*"
    }
});
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(require('cors')())

app.get("/", (req,res)=>{
    res.send("Xatty API");
})

io.on("connection", socket=>{
    console.log(socket.id);

    socket.on("disconnect", ()=>{
        console.log("User left.")
    })
})

httpServer.listen(PORT, ()=>{
    console.log("Server started");
})