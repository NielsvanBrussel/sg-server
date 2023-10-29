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
		min-height: 3rem;
		min-width: 3rem;
		background-color: #CD173F;
        font-family: "PS2P";
        border-radius: 0;
        width: 100%;
        text-align: left;
		margin: 0.5rem 0;
		/* box-shadow: 2px 2px 0px 2px #91173F;
    	-webkit-box-shadow: 2px 2px 0px 2px #91173F; */
		border-radius: 2px;
		color: #F48C06;
		line-height: 1.6;
		border: solid 2px #F48C06;
	}

	.locked {
		cursor: default;
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
	}

	.unlocked:hover {
		scale: 1.01;
		transition: scale 0.25s;
		border-color: #faa334;
	}
	button:focus-visible {
  		outline: none !important;
	}
	.unlocked:active{
		scale: 1.01;
		border: none;
	}

	.unlocked:active{
		-webkit-box-shadow: 2px 2px 0px 2px #91173F inset;
		box-shadow: 2px 2px 0px 2px #91173F inset;
		scale: 1.01;
		border: solid 2px #F48C06;
        opacity: 0.9;
	}

</style>