<script>
	import { avatar, activeScenario } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';
  	import CharacterDeath from './CharacterDeath.svelte';
  	import SideScroller from './SideScroller.svelte';
  	import Overlay from './Overlay.svelte';
  	import Scenario from './Scenario.svelte';
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
				<Scenario />
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
	
</style>
