<script lang="ts">
  export let name = ''
  let value = ''
</script>


<div class="centered">
  <h2>Enter your name:</h2>
  <p><input type="text" bind:value /></p>
  <p>
    <button on:click={function run() { name = value }} disabled={!value}>
      <span>Submit</span>
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