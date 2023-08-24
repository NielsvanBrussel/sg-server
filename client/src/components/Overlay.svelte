<script>
	import { avatar, menuActive } from '../stores.js';
	import hitpoints from '../assets/img/hitpoints.gif'
	import inventoryIcon from '../assets/img/inventory.png'
	import inventoryOpenIcon from '../assets/img/inventory-open.png'
	import menuIcon from '../assets/img/menu.png'
	import statsIcon from '../assets/img/stats.png'
  import InventoryItem from './InventoryItem.svelte';


	let inventoryActive = false
	let statsActive = false

	const menuStatus = (type) => {
		console.log('???hu')
		if (type === 'inventory') {
			statsActive = false
			inventoryActive = !inventoryActive
		} else {
			inventoryActive = false
			statsActive = !statsActive
		}
	}

</script>
<div class="container">
	<div class="flexbox-overlay">
		<div class="button__menu__container">
			<button class="menu-button" on:click={() => menuActive.set(true)}>
				<img src={menuIcon} alt='menu' class="menu-img">
			</button>
			<button class={statsActive? "stats-button active":  "stats-button"} on:click={() => menuStatus('stats')}>
				<img src={statsIcon} alt='stats' class="menu-img">
			</button>
			<button class={inventoryActive? "inventory-button active":  "inventory-button"} on:click={() => menuStatus('inventory')}>
				<img src={inventoryActive ? inventoryOpenIcon : inventoryIcon} alt='inventory' class="menu-img">
			</button>                
		</div>	
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
	</div>
	{#if inventoryActive}
		<div class="inv-stats-container__outer">
			<div class="inv-stats-container__inner">
				<h3 class="inv-stats-header">inventory</h3>
				<div class="inv-stats">
					{#each $avatar.items as item, i}
						<InventoryItem  data={item}/>
					{/each}
				</div>
			</div>
		</div>
	{:else if statsActive}
		<div class="inv-stats-container__outer">
			<div class="inv-stats-container__inner">
				<h3 class="inv-stats-header">stats</h3>
				<div class="stats-container">
					<div class="stats-flex">
						<p class="stats-title">strength: </p>
						<p class="stats-value">{$avatar.stats.strength}</p>					
					</div>
					<div class="stats-flex">
						<p class="stats-title">stamina: </p>
						<p class="stats-value">{$avatar.stats.stamina}</p>
					</div>
					<div class="stats-flex">
						<p class="stats-title">intellect: </p>
						<p class="stats-value">{$avatar.stats.intellect}</p>
					</div>
					<div class="stats-flex">
						<p class="stats-title">intimidation: </p>
						<p class="stats-value">{$avatar.stats.intimidation}</p>
					</div>
					<div class="stats-flex">
						<p class="stats-title">hitpoints: </p>
						<p class="stats-value">{$avatar.stats.maxHitpoints}</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>





<style>

	.container {
		position: absolute;
		top: 1rem;
		left: 0;
		z-index: 10;
	}
	.flexbox-overlay {
		display: flex;
		flex-direction: row;
	}
	.button__menu__container {
		position: relative;
		margin: 0 0 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.25rem;
  	}
	.menu-button, .inventory-button, .stats-button {
		border: 3px solid transparent;
		background-image: linear-gradient(to bottom right, #19173D, #87173E);
		padding: 0.25rem 0.5rem;
		display: flex;
		justify-content: center;
		flex-direction: row;
	}
	.active {
		border-color: #F48C06 !important;
	}
	.menu-img {
		height: 1.75rem;
		width: 1.75rem;
	}
	.menu-button:hover, .inventory-button:hover, .stats-button:hover {
		border-color: #F48C06;
	}
	.stats-overlay-container {
		height: 9rem;
		position: relative;
		padding: 0;
		display: flex;
		gap: 0.25rem 0;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-family: "PS2P";
		font-size: 1.25rem;
	}
	.flexbox {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin: 0rem 1rem;
		align-items: center;
	}
	.money-container {
		color: green;
	}
	.day-container {
		color: #F48C06;
		margin-left: 1.5rem;
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
		height: 5vh;
		width: auto;
	}
	p {
		margin: 0;
		padding: 0;
	}
	.inv-stats-container__outer {
		min-height: 60vh;
		background-image: linear-gradient(to bottom right, #19173D, #87173E);
		border-radius: 3rem;
		margin: 2rem 0 0 2rem;
		border: #F51743 solid 5px;
		width: 17rem;
	}
	.inv-stats-container__inner {
		margin: 1rem;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		font-family: 'PS2P';
		
	}
	.stats-container {
		text-align: left;
		display: flex;
		flex-direction: column;
		height: 45vh;
		justify-content: space-between;
	}
	.inv-stats-header {
		color: #F48C06;
		margin-bottom: 3rem;
	}
	.stats-value {
		margin: 0.5rem;
	}
	.inv-stats {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}


</style>