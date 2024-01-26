# sveltekit-sse-chat-example

Really simple example chat webapp built with [SvelteKit](https://kit.svelte.dev/) and [sveltekit-sse](https://github.com/tncrazvan/sveltekit-sse).

It's a playground to try out Server Sent Events ("SSE") with Publish–subscribe pattern ("pubsub") on the practical use case of a chat application.

## Warning

This is a technical prototype! There is no security, no authentication, no authorization and no checking. This can easily be misused by bad actors. Don't use this in production!

## Running the project

Checkout the git repository, install dependencies (`npm i`) and run on localhost (`npm run dev`) or listen on all local IPs (`npm run dev -- --host`).

## Architecture

Single page SvelteKit webapp using a single `+page.svelte` with variables `name` and `room`. 

Using components `EnterName`, `SelectRoom` and `Chat`. Supporting event emitter files `/api/rooms/+server.js` and `/api/chat/+server.js` using `sveltekit-sse`. 

Small libraries for in-memory storage (`/lib/server/chats.js`) and pubsub (`lib/servers/pubsub.js`).

Component `EnterName` returns the entered name to the main page via bind. 

Component `SelectRoom` returns the selected or entered room to the main page via bind, it uses the `rooms` SSE to list existing rooms, updating in real time. 

Then component `Chat` will be rendered with parameters `name` and `room`. TBD...
