<script lang="ts">
    export let name = ''
    let value = ''
</script>    

<div>
    <h3>Enter your name:</h3>
    <p><input type="text" bind:value={value} /></p>
    <p><button on:click={() => {name = value}}>Submit</button></p>
</div>