<script>
	import { avatar, activeScenario } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';
  	import CharacterDeath from './CharacterDeath.svelte';
  	import SideScroller from './SideScroller.svelte';
  	import Overlay from './Overlay.svelte';
  	import Scenario from './Scenario.svelte';
	import LevelUpMessage from './LevelUpMessage.svelte';
 	import AchievementPopup from './AchievementPopup.svelte';

	let levelupMessage = false
	let level = $avatar.level


	// show level up message on level up

	const check = () => {
		if (level !== $avatar.level && level) {
			toggleMessage()
		}
		level = $avatar.level
	}

	const toggleMessage = () => {
		levelupMessage = !levelupMessage
	}

	$: $avatar.level, check()
</script>


<div class="container">
	{#if !$avatar.name}
		<CharacterCreation />
	{:else}
		{#if $avatar.stats.currentHitpoints < 1}
			<CharacterDeath />
		{:else}
			<AchievementPopup />
			<Overlay />
			{#if levelupMessage}
				<LevelUpMessage toggleMessage={toggleMessage} />
			{/if}
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
