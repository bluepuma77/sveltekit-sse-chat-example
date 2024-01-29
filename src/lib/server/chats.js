import { publish, subscribe } from '$lib/server/pubsub.js'

const chats = { 'Room A': {}, 'Room B': {}, 'Room C': {} }
const protect = ['Room A', 'Room B', 'Room C']

/**
 * Retrieves the list of existing rooms 
 * @returns {string[]} An array of room identifiers
 */
export function getRooms() {
    console.log('getRooms()')
    return Object.keys(chats)
}

/**
 * Add a new room
 * @param {string} room - The identifier of the room to be added
 */
export function addRoom(room) {
    console.log('addRoom()', room)
    if (!chats[room]) {
        chats[room] = {}
        publish('rooms', room)
    }
}

/**
 * Delete a room, will ignore when protected
 * @param {string} room - The identifier of the room to be added
 */
export function delRoom(room) {
    console.log('delRoom()', room)
    if (chats[room] && !protect.includes(room)) delete chats[room]
    publish('rooms', room)
}


/**
 * Retrieves the list of existing users in a room 
 * @returns {string[]} An array of name identifiers
 */
export function getRoomUsers(room) {
    console.log('getRoomUsers()', room)
    return Object.keys(chats[room] || {})
}

/**
 * Add a new user to a room, will create room if not exists
 * @param {string} room - The identifier of the room 
 * @param {string} name - The identifier of the name to be added 
 */
export function addRoomUser(room, name) {
    console.log('addRoomUser()', room, name)
    addRoom(room)
    chats[room][name] = {}
    publish('users' + room, { room, name })
    publish('users-' + room, { room, name })
}

/**
 * Delete a user from a room, will delete room when empty
 * @param {string} room - The identifier of the room 
 * @param {string} name - The identifier of the name to be deleted 
 */
export function delRoomUser(room, name) {
    console.log('delRoomUser()', room, name)
    if (chats[room][name]) delete chats[room][name]
    if (Object.keys(chats[room]).length == 0) delRoom(room)
    publish('users', { room, name })
    publish('users-' + room, { room, name })
}


/**
 * Sends a new message to a specified room.
 * @param {string} room - The room identifier to which the message is being sent
 * @param {string} name - The name of the user sending the message
 * @param {string} text - The text content of the message
 */
export function newMessage(room, name, text) {
    console.log('newMessage()', room, name, text)
    publish('message' + room, { room, name, text })
    publish('message-' + room, { room, name, text })
}