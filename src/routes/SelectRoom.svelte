<script lang="ts">
  import { source } from 'sveltekit-sse'

  const rooms = source('/api/rooms').json<Array<string>>(
    function fallback(result) {
      return result.previousParsedValue
    },
  )
  export let room = ''
  let value = ''
</script>

<div>
  <h3>Select a room:</h3>
  {#each $rooms || [] as roomLocal}
    <button
      on:click={function run() {
        room = roomLocal
      }}
      style="margin: 8px"
    >
      <span>{roomLocal}</span>
    </button>
  {/each}

  <h5>or create your own room:</h5>
  <p><input type="text" bind:value /></p>
  <p>
    <button
      on:click={function run() {
        room = value
      }}
    >
      <span>Enter</span>
    </button>
  </p>
</div>
