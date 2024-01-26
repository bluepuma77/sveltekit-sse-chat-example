import { event } from 'sveltekit-sse'
import { json } from '@sveltejs/kit'
import { getRoomUsers, addRoomUser, delRoomUser, newMessage } from '$lib/server/chats.js'
import { publish, subscribe } from '$lib/server/pubsub.js'

// SSE function to stream back user list and new messages
export function GET({ url }) {
    let unsubscribeUsers
    let unsubscribeMessage

    const name = url.searchParams.get('name')
    const room = url.searchParams.get('room')
    addRoomUser(room, name)
    console.log('getRoomUsers', room, getRoomUsers(room))

    // create SSE
    const e = event(async function run(emit) {

        // emit data on connect
        emit(JSON.stringify(getRoomUsers(room)))
        emit('test', JSON.stringify(getRoomUsers(room)))
        emit('users', JSON.stringify(getRoomUsers(room)))

        // emit data of subscription
        await new Promise(function run(stop) {
            unsubscribeUsers = subscribe('users-' + room, (data) => { emit('users', JSON.stringify(getRoomUsers(room))) })
            unsubscribeMessage = subscribe('message-' + room, (data) => { emit('message', JSON.stringify(data)) })
        })

    }).onCancel(function cancel() {
        // when connection is terminated
        if (unsubscribeUsers) unsubscribeUsers()
        if (unsubscribeMessage) unsubscribeMessage()
        delRoomUser(room, name)
    })

    return e.toResponse()
}

// POST to receive new message
export const POST = async ({ request }) => {
    const { room, name, text } = await request.json();
    newMessage(room, name, text)
    return json({ room, name, text })
}