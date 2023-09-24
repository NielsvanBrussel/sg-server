<script>
    export let toggleMessage
</script>


<div class="message-container">
    <h1>this is the level up message</h1>
    <button on:click={() => toggleMessage()}>close</button>
</div>


<style>
    .message-container {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>