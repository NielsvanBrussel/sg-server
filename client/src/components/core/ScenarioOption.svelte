<script>
    export let text
    export let eventHandler
</script>


<button class="button-nav" on:click={eventHandler}>{text}</button>



<style>

    .button-nav {
		background-repeat: no-repeat;
		background-position: center;
		background-size: 2rem auto;
		min-height: 3rem;
		min-width: 3rem;
		border: none;
		color: #F48C06;
		background-color: black;
        font-family: "PS2P";
        border-radius: 0;
        width: 100%;
        text-align: left;
	}
	.button-nav:hover {
		scale: 1.02;
	}
	button:focus-visible {
  		outline: none !important;
	}
	.button-nav:active{
		scale: 1.02;
		border: none;
	}

</style>