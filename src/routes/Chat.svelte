<script lang="ts">
  import { source } from 'sveltekit-sse'

  export let name = ''
  export let room = ''

  type Message = {
    room: string
    name: string
    text: string
  }

  type User = {
    name: string
  }

  let messages = [] as Array<Message>
  let text = ''

  // setup SSE with parameters and multiple events
  const params =
    '?name=' + encodeURIComponent(name) + '&room=' + encodeURIComponent(room)
  const connection = source('/api/chat' + params)
  const users = connection.select('users').json<Array<User>>(
    function fallback(result) { return result.previousParsedValue }
  )
  const message = connection.select('message').json<Array<Message>>(
    function fallback(result) { return result.previousParsedValue }
  )

  // add new message to messages
  $: if ($message) {
    console.log('received message', $message)
    messages = [...messages, $message]
  }

  async function sendMessage() {
    // POST message
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ room, name, text }),
    })
    const res = await response.json()
    console.log('res', res)

    // empty input field
    text = ''
  }
</script>


<div class="users">
  <h3>Users</h3>
  {#each $users || [] as name}
    {name}<br />
  {/each}
</div>

<div class="chat">
  <div class="messages">
    <h3>Chat</h3>
    {#each messages as messageLocal}
      <div style="display: inline-block; min-width: 100px">{messageLocal?.name}:</div> {messageLocal?.text}<br />
    {/each}
  </div>
  <div class="input-container">
    <input class="input-field" type="text" bind:value={text} />
    <button class="submit-button" on:click={sendMessage} disabled={!text}>Send</button>
  </div>
</div>


<style>
  .users {
    width: 20%;
    overflow-y: auto;
    background-color: #f4f4f4;
    padding: 10px;
    box-sizing: border-box;
  }

  .chat {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: #e9e9e9;
  }

  .messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
  }

  .input-container {
    display: flex;
    width: 100%;
  }

  .input-field {
    flex-grow: 1;
  }

  .submit-button {
    flex-shrink: 0;
  }
</style>