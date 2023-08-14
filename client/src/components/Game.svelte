<script>
	import { avatar, activeScenario, menuActive } from '../stores.js';
  	import CharacterCreation from './CharacterCreation.svelte';
  	import TextButton from './core/TextButton.svelte';
	import hitpoints from '../assets/img/hitpoints.gif'
  	import CharacterDeath from './CharacterDeath.svelte';
  	import SideScroller from './SideScroller.svelte';
	import { IconMenu2, IconMoneybag } from '@tabler/icons-svelte'; 

	const leaveScenario = () => {
		activeScenario.set({
			name: "",
			component: null,
        })
	}

</script>


<div class="button__menu__container">
	<button class="menu-button" on:click={() => menuActive.set(true)}> 
		
	</button>
	<button class="inventory-button" on:click={() => null}> 
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
		left: 0;
		top: 9rem;
		margin: 0rem 2rem;
		z-index: 10;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
  	}
	.menu-button, .inventory-button {
		background-repeat: no-repeat;
		background-position: center;
		background-size: 2rem auto;
		min-height: 3rem;
		min-width: 4rem;
		border: 3px solid transparent;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.menu-button:hover, .inventory-button:hover {
		border-color: #F48C06;
	}
	.menu-button {
		background-image: url('../assets/img/menu.png');
	}
	.inventory-button {
		background-image: url('../assets/img/inventory.png');
	}
	.stats-overlay-container {
		position: absolute;
		height: 8rem;
		padding: 1rem 0 0 0;
		top: 0rem;
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
	.day-container {
		color: #F48C06;
		margin-left: 2.5rem;
	}
	.dollar-sign {
		font-size: 2rem;
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
		padding: 0;
	}
	.scenario-container {
		position: relative;
		z-index: 6;
	}
	.button-container {
	
		position: relative;
	}
</style>
