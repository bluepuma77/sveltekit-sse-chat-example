<script lang="ts">
  import { source } from 'sveltekit-sse'

  const rooms = source('/api/rooms').json<Array<string>>(
    function fallback(result) { return result.previousParsedValue }
  )
  export let room = ''
  let value = ''
</script>


<div class="centered">
  <h2>Select a room:</h2>
  {#each $rooms || [] as roomLocal}
    <button on:click={function run() { room = roomLocal }} style="margin: 8px">
      <span>{roomLocal}</span>
    </button>
  {/each}

  <h3>or create your own room:</h3>
  <p><input type="text" bind:value /></p>
  <p>
    <button on:click={function run() { room = value }} disabled={!value}>
      <span>Enter</span>
    </button>
  </p>
</div>


<style>
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>