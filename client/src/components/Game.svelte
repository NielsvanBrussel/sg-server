<script>
	import { avatar, activeScenario } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';
  	import Main from './Main.svelte'
  	import TextButton from './core/TextButton.svelte';

	const leaveScenario = () => {
		activeScenario.set({
			name: "",
			component: null,
        })
	}

</script>


<div class="container">
	{#if !$avatar.name}
		<CharacterCreation />
	{:else}
		{#if $activeScenario.component}
			<svelte:component this={$activeScenario.component} />
			<TextButton text='back' eventHandler={leaveScenario}/>
		{:else}
			<Main />
		{/if}
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
