<script lang="ts">
  import { source } from 'sveltekit-sse'

  export let name = ''
  export let room = ''

  type Message = {
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
  const users = connection
    .select('users')
    .json<Array<User>>(function onJsonParseError({
      error,
      currentRawValue,
      previousParsedValue,
    }) {
      console.error(`Could not parse "${currentRawValue}" as json.`, error)
      return previousParsedValue // this will be the new value of the store
    })
  const message = connection
    .select('message')
    .json<Message>(function onJsonParseError({
      error,
      currentRawValue,
      previousParsedValue,
    }) {
      console.error(`Could not parse "${currentRawValue}" as json.`, error)
      return previousParsedValue // this will be the new value of the store
    })

  // debug
  $: if (users) {
    console.log('users', $users)
  }

  // add new message to messages
  $: if ($message) {
    console.log('message', $message)
    messages.push($message)
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

<h1>Chat</h1>
<p>Name: {name}</p>
<p>Room: {room}</p>

<div style="width:100%">
  <div style="width:20%; display: inline-block; background-color: #f7f7f7">
    <p>Users: {$users}</p>
    {#each $users || [] as name}
      <p>{name}</p>
    {/each}
  </div>
  <div style="display: inline-block">
    {#if $message}
      <p>Latest message: {$message.name}: {$message.text}</p>
    {/if}

    {#each messages as messageLocal}
      {messageLocal?.name}: {messageLocal?.text}
    {/each}
  </div>
</div>

<input type="text" bind:value={text} />
<button on:click={sendMessage} disabled={!text}>Send</button>
