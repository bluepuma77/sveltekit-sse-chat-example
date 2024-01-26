<script lang="ts">
    import { source } from "sveltekit-sse";

    export let name = "";
    export let room = "";
    let msgs = [];
    let text = "";

    const params = "?name=" + encodeURIComponent(name) + "&room=" + encodeURIComponent(room);
    const connection = source("/api/chat" + params);
    const users = connection.select("users");
    const message = connection.select("message");

    async function sendMessage() {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ room, name, text }),
        });
        const res = await response.json();
        console.log('res', res)
        text = "";
    }
</script>

<h1>Chat</h1>
<p>Name: {name}</p>
<p>Room: {room}</p>

<div style="width:100%">
    <div style="width:20%; display: inline-block; background-color: grey">
        <p>Users: {$users}</p>
        {#each $users as name}
        <p>{name}</p>
        {/each}

    </div>
    <div style="display: inline-block">
        <p>Message: {$message}</p>

        {#each msgs as msg}{/each}
    </div>
</div>

<input type="text" bind:value={text} />
<button on:click={() => sendMessage()}>Send</button>
