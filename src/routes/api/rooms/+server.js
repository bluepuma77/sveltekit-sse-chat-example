import { v4 as uuidv4 } from 'uuid';
import { event } from 'sveltekit-sse'
import { getRooms } from '$lib/server/chats.js'
import { subscribe } from '$lib/server/pubsub.js'

const emitters = new Map();

// subscribe to room updates
subscribe('updateRooms', function emitter() {
    emitters.forEach(function run(emit) {
        emit(JSON.stringify(getRooms()))
    });
})

// emit full list of rooms as string array
export function GET() {
    console.log('rooms')
    const id = new uuidv4()
    const e = event(async function run(emit) {
        console.log('run')
        emitters.set(id, emit);
        while (true) {
            emit(JSON.stringify(getRooms()))
            await new Promise(resolve => setTimeout(resolve, 60 * 1000))
        }
    }).onCancel(function stop() {
        console.log('cancel');
        emitters.delete(id);
    })
    return e.toResponse()
}
