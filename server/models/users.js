const rooms = [];

exports.createRoom = (username, chatroomName, chatroomId)=>{
    const roomObj = {
        chatroomId,
        chatroomName,
        users: [
            username
        ]
    }

    rooms.push(roomObj);

    return {
        payload: {
            chatroomId
        }
    }
}

exports.joinRoom = (username, chatroomId)=>{
    const roomIndex = rooms.findIndex(room=>(room.chatroomId==chatroomId));

    if(roomIndex<0){
        return {error: {
            message: "Room does not exist!"
        }}
    }

    const userExists = rooms[roomIndex].users.find(user=>(user==username));

    if(userExists){
        return {error: {
            message: "User is already in the room!"
        }}
    }

    rooms[roomIndex].users.push(username);

    return {payload: {
        chatroomName: rooms[roomIndex].chatroomName
    }}
}

exports.removeUser = (username, chatroomId)=>{
    const roomIndex = rooms.findIndex(room=>(room.chatroomId==chatroomId));
    const userIndex = rooms[roomIndex].users.findIndex(user=>user==username);

    rooms[roomIndex].users.splice(userIndex,1);

    if(rooms[roomIndex].users.length==0){
        rooms.splice(roomIndex, 1);
    }
}

exports.getUsers= (chatroomId)=>{
    const roomIndex = rooms.findIndex(room=>(room.chatroomId==chatroomId));
    return rooms[roomIndex].users;
}