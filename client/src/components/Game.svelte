<script>
	import { avatar } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';
  import Main from './Main.svelte';

</script>


<div class="container">
	{#if !$avatar.name}
		<CharacterCreation />
	{:else}
		<Main />
	{/if}
</div>



<style>

	.container {
		overflow: hidden;
		width: 100%;
		margin: 0rem auto;
		height: 90vh;
		width: 90vw;
		position: relative;
		background-color: #03071E;
	}

</style>
