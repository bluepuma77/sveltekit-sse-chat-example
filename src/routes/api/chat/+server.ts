import { events } from 'sveltekit-sse'
import { json } from '@sveltejs/kit'
import { getRoomUsers, addRoomUser, delRoomUser, newMessage } from '$lib/server/chats.js'
import { publish, subscribe } from '$lib/server/pubsub.js'
import type { Unsubscriber } from 'svelte/store'

// SSE function to stream back user list and new messages
export function GET({ url }) {
  let unsubscribeUsers: Unsubscriber
  let unsubscribeMessage: Unsubscriber

  const name = url.searchParams.get('name')
  const room = url.searchParams.get('room')

  // new user entered room
  console.log('new SSE connection, room:', room, 'name:', name)
  addRoomUser(room ?? '', name ?? '')

  // create SSE
  const e = events(async function run(emit) {
    // emit data on connect
    emit('users', JSON.stringify(getRoomUsers(room)))

    // emit data of subscription
    await new Promise(function run(stop) {
      //@ts-ignore
      unsubscribeUsers = subscribe('users-' + room, (data) => {
        emit('users', JSON.stringify(getRoomUsers(room)))
      })
      //@ts-ignore
      unsubscribeMessage = subscribe('message-' + room, (data) => {
        emit('message', JSON.stringify(data))
      })
    })
  }).onCancel(function cancel() {
    // when connection is terminated
    if (unsubscribeUsers) unsubscribeUsers()
    if (unsubscribeMessage) unsubscribeMessage()
    delRoomUser(room ?? '', name ?? '')
  })

  return e.toResponse()
}

// POST to receive new message
export const POST = async ({ request }) => {
  const { room, name, text } = await request.json()
  newMessage(room, name, text)
  return json({ room, name, text })
}
