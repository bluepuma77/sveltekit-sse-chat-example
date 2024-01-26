<script lang="ts">
    import EnterName from './EnterName.svelte'
    import SelectRoom from './SelectRoom.svelte'
    import Chat from './Chat.svelte'
    export let name = ''
    export let room = ''
</script>    

<!-- header -->
<h1 style="text-align: center">sveltekit-sse-chat-example</h1>

<!-- DEBUG: show and delete name and room -->
<div style="text-align: center; color: lightgrey">
    <span style="padding:64px">
        Name: {name}
        {#if name}
            <span on:click={() => { name = ''}} style="cursor:pointer">&times;</span>
        {/if}    
    </span>
    <span style="padding:64px">
        Room: {room}
        {#if room}
            <span on:click={() => { room = ''}} style="cursor:pointer">&times;</span>
        {/if}
    </span>
</div>

<!-- user interface with separate components -->
{#if !name}
    <div class="centered" style="background-color: #f7f7f7; padding: 16px">
        <EnterName bind:name={name} />
    </div>
{:else if !room}
    <div class="centered" style="background-color: #f7f7f7; padding: 16px">
        <SelectRoom bind:room={room} />
    </div>
{:else}
    <div>
        <Chat name={name} room={room} />
    </div>
{/if}
  
<!-- footer -->
<div class="bottom">Powered by <a href="https://kit.svelte.dev">SvelteKit</a> and <a href="https://github.com/tncrazvan/sveltekit-sse">sveltekit-sse</a>. <a href="https://github.com/bluepuma77/sveltekit-sse-chat-example">Source on Github</a>.</div>

<!-- styling -->
<style>
    .centered {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .bottom {
        position: absolute;
        top: 100%;
        width: 100%;
        transform: translate(0, -100%);
        text-align: center;
        background-color: #f0f0f0;
        padding: 4px;
    }
</style>