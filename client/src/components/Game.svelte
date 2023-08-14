<script>
	import { avatar, activeScenario, menuActive } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';
  	import TextButton from './core/TextButton.svelte';
	import hitpoints from '../assets/img/hitpoints.gif'
  	import CharacterDeath from './CharacterDeath.svelte';
  	import SideScroller from './SideScroller.svelte';
	import { IconMenu2 } from '@tabler/icons-svelte'; 

	const leaveScenario = () => {
		activeScenario.set({
			name: "",
			component: null,
        })
	}

</script>


<div class="button__menu__container">
	<button on:click={() => menuActive.set(true)}> 
		<IconMenu2 size={30} color={"grey"}/>
	</button>             
</div>
<div class="container">
	{#if !$avatar.name}
		<CharacterCreation />
	{:else}
		{#if $avatar.stats.currentHitpoints < 1}
			<CharacterDeath />
		{:else}
			<div class="stats-overlay-container">
				<div class="flexbox hitpoints-container">
					<img class="hitpoints-img" src={hitpoints} alt="hitpoints">
					<p>{$avatar.stats.currentHitpoints} / {$avatar.stats.maxHitpoints}</p>
				</div>
				<div class="flexbox money-container">
					<p class="dollar-sign">$</p>
					<p>{$avatar.money}</p>
				</div>
				<div class="flexbox day-container">
					{#if $avatar.day === 1}
						<p>monday</p>
					{:else if $avatar.day === 2}
						<p>tuesday</p>
					{:else if $avatar.day === 3}
						<p>wednesday</p>
					{:else if $avatar.day === 4}
						<p>thursday</p>
					{:else if $avatar.day === 5}
						<p>friday</p>
					{:else if $avatar.day === 6}
						<p>saturday</p>
					{:else if $avatar.day === 7}
						<p>sunday</p>
					{/if}
				</div>
			</div>
			{#if $activeScenario.component}
				<div class="scenario-container">
					<svelte:component this={$activeScenario.component} />
					<div class="button-container">
						<TextButton text='back' eventHandler={() => leaveScenario()}/>
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
	.button__menu__container {
		position: absolute;
		right: 0;
		top: 0;
		margin: 2rem;
		z-index: 10;
  	}
	.stats-overlay-container {
		position: absolute;
		top: 1rem;
		left: 0;
		z-index: 5;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		font-family: "PS2P";
		font-size: 1.25rem;
	}
	.flexbox {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin: 0rem 2rem;
		align-items: center;
	}
	.money-container {
		color: green;
	}
	.dollar-sign {
		font-size: 3rem;
		margin: 0 0.5rem;
		padding: 0;
	}
	.hitpoints-container {
		color: #CD173F;
	}
	.hitpoints-img {
		height: 6vh;
		width: auto;
	}
	p {
		margin: 0;
	}
	.scenario-container {
		position: relative;
		z-index: 6;
	}
	.button-container {
	
		position: relative;
	}
</style>
