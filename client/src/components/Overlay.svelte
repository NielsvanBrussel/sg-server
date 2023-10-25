<script>
	import { avatar, menuActive } from '../stores.js';

	import hitpoints from '../assets/img/hitpoints.gif'
	import inventoryIcon from '../assets/img/inventory.png'
	import inventoryOpenIcon from '../assets/img/inventory-open.png'
	import menuIcon from '../assets/img/menu.png'
	import statsIcon from '../assets/img/stats.png'
	import buff_str_img from '../assets/img/buff-str.png'
	import buff_luck_img from '../assets/img/buff-luck.png'
	import buff_int_img from '../assets/img/buff-int.png'

  	import InventoryItem from './InventoryItem.svelte';



	let inventoryActive = false
	let statsActive = false
	let experienceBottomBoundary 
	let experienceTopBoundary
	let widthInnerExperienceBar

	const menuStatus = (type) => {
		if (type === 'inventory') {
			statsActive = false
			inventoryActive = !inventoryActive
		} else {
			inventoryActive = false
			statsActive = !statsActive
		}
	}

	const calcExperience = () => {
		if ($avatar.level === 1) {
			experienceBottomBoundary = 0
		} else {
			experienceBottomBoundary = Math.floor((150 * ($avatar.level - 1)) + (($avatar.level + 4) ** 2) + (1.85 * ($avatar.level - 1) ** 3))
		}
		experienceTopBoundary = Math.floor((150 * $avatar.level) + (($avatar.level + 5) ** 2) + (1.85 * $avatar.level ** 3))	
		widthInnerExperienceBar = 100 * ($avatar.experience - experienceBottomBoundary) / (experienceTopBoundary - experienceBottomBoundary)
	}

	calcExperience()

	$: $avatar.level && $avatar.experience, calcExperience()

</script>
<div class="container left">
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
				<p>{$avatar.stats.currentHitpoints}/{$avatar.stats.maxHitpoints * 5}</p>
			</div>
			<div class="flexbox money-container">
				<p class="dollar-sign">$</p>
				<p>{$avatar.money}</p>
			</div>
			<div class="flexbox day-container">
				{#if $avatar.day === 1}
					<p>Monday</p>
				{:else if $avatar.day === 2}
					<p>Tuesday</p>
				{:else if $avatar.day === 3}
					<p>Wednesday</p>
				{:else if $avatar.day === 4}
					<p>Thursday</p>
				{:else if $avatar.day === 5}
					<p>Friday</p>
				{:else if $avatar.day === 6}
					<p>Saturday</p>
				{:else if $avatar.day === 7}
					<p>Sunday</p>
				{/if}
			</div>
		</div>		
	</div>
	{#if inventoryActive}
		<div class="inv-stats-container__outer">
			<div class="inv-stats-container__inner">
				<h3 class="inv-stats-header">inventory</h3>
				<div class="inv-stats">
					{#each $avatar.items as item (item.name)}
						<InventoryItem  data={item}/>
					{/each}
				</div>
			</div>
		</div>
	{:else if statsActive}
		<div class="inv-stats-container__outer">
			<div class="inv-stats-container__inner">
				<h3 class="inv-stats-header">stats</h3>
				<div class="level-container">
					<p class="level-title">level: {$avatar.level}</p>
					<div class="experience-bar-outer" 
						title={`${$avatar.experience - experienceBottomBoundary}/${experienceTopBoundary - experienceBottomBoundary}`}>
						<div style="--width: {widthInnerExperienceBar}%" class="experience-bar-inner"></div>
					</div>				
				</div>
				

				<div class="stats-container">
					<div class="stats-flex">
						<p class="stats-title">hitpoints: </p>
						<p class="stats-value">{$avatar.stats.maxHitpoints}</p>
					</div>
					<div class="stats-flex">
						<p class="stats-title">stamina: </p>
						<p class="stats-value">{$avatar.stats.stamina}</p>
					</div>
					<div class="stats-flex">
						<p class="stats-title">strength: </p>
						{#if $avatar.buffs.strengthBuff}
							<p class="stats-value green">{$avatar.stats.strength + 2}</p>	
						{:else}
							<p class="stats-value">{$avatar.stats.strength}</p>	
						{/if}						
					</div>
					<div class="stats-flex">
						<p class="stats-title">intellect: </p>
						{#if $avatar.buffs.intellectBuffBuff}
							<p class="stats-value green">{$avatar.stats.intellect + 2}</p>
						{:else}
							<p class="stats-value">{$avatar.stats.intellect}</p>
						{/if}
						
					</div>
					<div class="stats-flex">
						<p class="stats-title">luck: </p>
						{#if $avatar.buffs.luckBuff}
							<p class="stats-value green">{$avatar.stats.luck + 2}</p>
						{:else}
							<p class="stats-value">{$avatar.stats.luck}</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
<div class="container right">
	<div class="flexbox">
		{#if $avatar.buffs.strengthBuff}
			<img src={buff_str_img} alt='strength buff' class="buff-img">
		{/if}
		{#if $avatar.buffs.intellectBuff}
			<img src={buff_int_img} alt='strength buff' class="buff-img">
		{/if}
		{#if $avatar.buffs.luckBuff}
			<img src={buff_luck_img} alt='strength buff' class="buff-img">
		{/if}		
	</div>


</div>





<style>

	.container {
		position: absolute;
		top: 1rem;
		z-index: 10;
	}
	.left {
		left: 0;
	}
	.right {
		right: 0;
	}
	.buff-img {
		height: 2rem;
		border-radius: 2rem;
		border: #F48C06 solid 3px;
	}
	.flexbox-overlay {
		display: flex;
		flex-direction: row;
		width: 20rem;
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
		gap: 0.25rem;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-family: "PS2P";
		font-size: 1rem;
	}
	.flexbox {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin: 0rem 1rem;
		align-items: center;
		height: 2.5rem;
	}
	.green {
		color: #2cb51d;
	}
	.money-container {
		color: green;
	}
	.day-container {
		color: #F48C06;
		margin-left: 1.5rem;
	}
	.dollar-sign {
		font-size: 1.5rem;
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
		margin: 2rem 0 0 1rem;
		border: #F51743 solid 5px;
		width: calc(18rem - 10px);
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
		justify-content: start;
		gap: 1.5rem;
	}
	.inv-stats-header {
		color: #F48C06;
		margin: 1rem 0rem;
	}
	.level-container {
		width: 90%;
		margin: 0 auto 2rem auto;
	}
	.level-title {
		margin: 1rem 0;
	}
	.experience-bar-outer {
		height: 1rem;
		width: 100%;
		border: solid #F48C06 3px;
		background-color: rgba(0, 0, 0, 0.20);
	}
	.experience-bar-inner {
		height: 1rem;
		width: var(--width);
		background-image: linear-gradient(to bottom right, #F48C06, #87173E);
	}
	.stats-flex {
		display: flex;
		flex-direction: row;
		width: 90%;
		margin: 0 auto;
		justify-content: space-between;
		border-bottom: dashed 3px rgba(255, 255, 255, 0.87);
	}
	.stats-title {
		width: 10rem;
	}
	.stats-value {
		margin: 0;
	}
	.inv-stats {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 1rem;
	}


</style>