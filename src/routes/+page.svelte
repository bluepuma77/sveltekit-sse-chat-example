<script lang="ts">
  import EnterName from './EnterName.svelte'
  import SelectRoom from './SelectRoom.svelte'
  import Chat from './Chat.svelte'
  export let name = ''
  export let room = ''
</script>


<div class="page">

  <div class="header">
    <h1>sveltekit-sse-chat-example</h1>

    <!-- show and enable delete of name and room -->
    <div style="color: grey">
      <span>
        Name: {name}
        {#if name}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span on:click={() => name = ''} style="cursor:pointer">(&times;)</span>
        {/if}
      </span>
      <span style="margin-left: 64px">
        Room: {room}
        {#if room}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span on:click={() => room = ''} style="cursor:pointer">(&times;)</span>
        {/if}
      </span>
    </div>
  </div>

  <div class="main">
    {#if !name}
      <EnterName bind:name />
    {:else if !room}
      <SelectRoom bind:room />
    {:else}
      <Chat {name} {room} />
    {/if}
  </div>

  <div class="footer">
    Powered by <a href="https://kit.svelte.dev">SvelteKit</a> and
    <a href="https://github.com/tncrazvan/sveltekit-sse">sveltekit-sse</a>.
    <a href="https://github.com/bluepuma77/sveltekit-sse-chat-example">Source on Github</a>.
  </div>

</div>


<style>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh; /* Full viewport height */
    margin: 0;
    width: 100vw; /* Full viewport width */
  }

  .header {
    background-color: lightgrey;
    text-align: center;
    padding: 4px;
  }

  .main {
      display: flex;
      flex-grow: 1; /* Takes up remaining space */
  }

  .footer {
      background-color: lightgrey;
      text-align: center;
      padding: 4px;
  }
</style>