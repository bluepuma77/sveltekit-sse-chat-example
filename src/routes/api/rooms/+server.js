import { event } from 'sveltekit-sse'
import { getRooms } from '$lib/server/chats.js'
import { publish, subscribe } from '$lib/server/PubSub.js'

export function GET() {
    let unsubscribe

    // create SSE
    const e = event(async function run(emit) {
        
        // emit data on connect
        emit(JSON.stringify(getRooms()))

        // emit data on subscription
        await new Promise(function run(stop) {
            unsubscribe = subscribe('rooms', (data) =>  { emit(JSON.stringify(getRooms())) })
        })

    }).onCancel(function cancel() {
        // when connection is terminated
        if (unsubscribe) unsubscribe()
    })

    return e.toResponse()
}
