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
		background-color: #CD173F;
		box-shadow: 2px 2px 0px 2px #91173F;
    	-webkit-box-shadow: 2px 2px 0px 2px #91173F;
        font-family: "PS2P";
	}
	.button-nav:hover {
		scale: 1.02;
	}
	button:focus-visible {
  		outline: none !important;
	}
	.button-nav:active{
		-webkit-box-shadow: 2px 2px 0px 2px #91173F inset;
		box-shadow: 2px 2px 0px 2px #91173F inset;
		scale: 1.02;
		border: none;
	}

</style>
