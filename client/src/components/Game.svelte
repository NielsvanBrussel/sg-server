<script>
	import { avatar, activeScenario } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';
  	import TextButton from './core/TextButton.svelte';
  	import CharacterDeath from './CharacterDeath.svelte';
  	import SideScroller from './SideScroller.svelte';
  	import Overlay from './Overlay.svelte';

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
		{#if $avatar.stats.currentHitpoints < 1}
			<CharacterDeath />
		{:else}
			<Overlay />
			{#if $activeScenario.component}
				<div class="scenario-container">
					<svelte:component this={$activeScenario.component} />
					<div class="button-container">
						<TextButton text='leave' eventHandler={() => leaveScenario()}/>
					</div>
				</div>
			{:else}
				<SideScroller />
			{/if}
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
	.scenario-container {
		position: relative;
		z-index: 6;
	}
	.button-container {
	
		position: relative;
	}
</style>
