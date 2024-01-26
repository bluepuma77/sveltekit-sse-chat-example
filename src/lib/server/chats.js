import { publish, subscribe } from '$lib/server/pubsub.js'

const chats = { 'Room A': {}, 'Room B': {}, 'Room C': {} }
const protect = ['Room A', 'Room B', 'Room C']

export function addRoom(room) {
    console.log('add room', room)
    if (!chats[room]) {
        chats[room] = {}
        publish('updateRooms', room)
    }
}

export function delRoom(room) {
    console.log('delRoom()', room)
    if (chats[room] && !protect.includes(room)) delete chats[room]
    publish('updateRooms', room)
}

export function getRooms() {
    console.log('getRooms()')
    return Object.keys(chats)
}

export function getRoomUsers(room) {
    console.log('getRoomUsers()', room)
    return Object.keys(chats[room] || {})
}


export function addRoomUser(room, name) {
    console.log('addRoomUser()', room, name)
    addRoom(room)
    chats[room][name] = {}
    publish('newUser', { room, name })
}

export function delRoomUser(room, name) {
    console.log('delRoomUser()', room, name)
    if (chats[room][name]) delete chats[room][name]
    if (Object.keys(chats[room]).length == 0) delRoom(room)
}

export function newMessage(room, name, message) {
    console.log('newMessage()', room, name, message)
    publish('newMessage', { room, name, message })
}
