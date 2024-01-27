<script lang="ts">
  export let name = ''
  let value = ''
</script>

<div>
  <h3>Enter your name:</h3>
  <p><input type="text" bind:value /></p>
  <p>
    <button
      on:click={function run() {
        name = value
      }}
    >
      <span>Submit</span>
    </button>
  </p>
</div>
