import { event } from 'sveltekit-sse'
import { getRooms } from '$lib/server/chats.js'
import { subscribe } from '$lib/server/pubsub.js'
import type { Unsubscriber } from 'svelte/store'

export function GET() {
  let unsubscribe: Unsubscriber

  // create SSE
  const e = event(async function run(emit) {
    // emit data on connect
    emit(JSON.stringify(getRooms()))

    // emit data on subscription
    await new Promise(function run() {
      //@ts-ignore
      unsubscribe = subscribe('rooms', function watch() {
        emit(JSON.stringify(getRooms()))
      })
    })
  }).onCancel(function cancel() {
    // when connection is terminated
    if (unsubscribe) unsubscribe()
  })

  return e.toResponse()
}
