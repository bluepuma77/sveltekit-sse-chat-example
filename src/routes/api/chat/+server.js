import { v4 as uuidv4 } from 'uuid'
import { json } from '@sveltejs/kit'
import { event } from 'sveltekit-sse'
import { getRoomUsers, addRoomUser, delRoomUser, newMessage } from '$lib/server/chats.js'
import { publish, subscribe } from '$lib/server/pubsub.js'

const emitters = new Map();
/* 

// subscribe to new users
subscribe('newUser', function emitter(data) {
    console.log('emit users')
    emitters.forEach(function run(emitter) {
        if (emitter.room == data.room) {
            emitter.emit('users', JSON.stringify(getRoomUsers(data.room)))
        }
    });
})
 */

// SSE function to stream back user list and new messages
export function GET({ url }) {
    const name = url.searchParams.get('name')
    const room = url.searchParams.get('room')
    console.log('GET SSE chat', name, room)
    addRoomUser(room, name)

    const id = new uuidv4()
    const e = event(async function run(emit) {
        console.log('run')
        emitters.set(id, { room, name, emit })
        while (true) {
            emit('users', 'x')
            await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        }
    }).onCancel(function stop() {
        console.log('cancel')
        delRoomUser(room, name)
        emitters.delete(id)
    })
    return e.toResponse()
}

// POST to receive new chat input { room, name, text }
export const POST = async ({ request }) => {
    const data = await request.json();
    console.log('POST', data)
    emitters.forEach(function run(emitter) {
        if (emitter.room == data.room) {
            console.log('emit message', data)
            emitter.emit('message', JSON.stringify(data))
        }
    })
    return json(data)
}
