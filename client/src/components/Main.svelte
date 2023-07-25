<script>
	import { avatar } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';



		console.log($avatar.name)
</script>


<div class="container">
	{#if !$avatar.name}
		<CharacterCreation />
	{:else}
			<p class="test">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
	{/if}
</div>



<style>
	@keyframes type { 
		from { width: 0; } 
	} 
	.container {
		overflow: hidden;
		width: 100%;
		margin: 0rem auto;
		height: 90vh;
		width: 90vw;
		position: relative;
		background-color: #03071E;
	}
	.test {
		font-family: "PS2P";
		color: Pink; 
		font-family: "Courier";
		font-size: 20px;
		margin: 10px 0 0 10px;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		animation: type 4s steps(60, end); 
	}

</style>
