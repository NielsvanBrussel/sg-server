<script>
    export let text
    export let eventHandler
	export let unlocked
</script>


{#if unlocked}
	<button class="button-nav unlocked" on:click={eventHandler}>{text}</button>	
{:else}
	<button class="button-nav locked">{text}</button>	
{/if}



<style>

    .button-nav {
		background-repeat: no-repeat;
		background-position: center;
		background-size: 2rem auto;
		min-height: 3rem;
		min-width: 3rem;
		border: none;
		background-color: #CD173F;
        font-family: "PS2P";
        border-radius: 0;
        width: 100%;
        text-align: left;
		margin: 0.5rem 0;
		box-shadow: 2px 2px 0px 2px #91173F;
    	-webkit-box-shadow: 2px 2px 0px 2px #91173F;
		border-radius: 2px;
		color: #F48C06;
		line-height: 1.6;
	}

	.locked {
		cursor: default;
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
	}

	.unlocked:hover {
		scale: 1.02;
	}
	button:focus-visible {
  		outline: none !important;
	}
	.unlocked:active{
		scale: 1.02;
		border: none;
	}

	.unlocked:active{
		-webkit-box-shadow: 2px 2px 0px 2px #91173F inset;
		box-shadow: 2px 2px 0px 2px #91173F inset;
		scale: 1.02;
		border: none;
	}

</style>