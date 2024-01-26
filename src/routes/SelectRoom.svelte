<script lang="ts">
    import { source } from "sveltekit-sse";
    const rooms = source("/api/rooms").json((res) => res.previousParsedValue);
    export let room = "";
    let value = "";
</script>

<div>
    <h3>Select a room:</h3>
    {#each $rooms || [] as r}
        <button on:click={() => {room = r}} style="margin: 8px">{r}</button>
    {/each}

    <h5>or create your own room:</h5>
    <p><input type="text" bind:value /></p>
    <p><button on:click={() => { room = value }}>Enter</button></p>
</div>
