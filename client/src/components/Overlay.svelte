<script>
	import { avatar, menuActive } from '../stores.js';
	import hitpoints from '../assets/img/hitpoints.gif'
	import inventoryIcon from '../assets/img/inventory.png'
	import inventoryOpenIcon from '../assets/img/inventory-open.png'
	import menuIcon from '../assets/img/menu.png'
	import statsIcon from '../assets/img/stats.png'


	let inventoryActive = false
	let statsActive = false

</script>

<div class="flexbox-overlay">
    <div class="button__menu__container">
        <button class="menu-button" on:click={() => menuActive.set(true)}>
            <img src={menuIcon} alt='menu' class="menu-img">
        </button>
        <button class="stats-button" on:click={() => statsActive = !statsActive}>
            <img src={statsIcon} alt='stats' class="menu-img">
        </button>
        <button class="inventory-button" on:click={() => inventoryActive = !inventoryActive}>
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




<style>


	.flexbox-overlay {
		display: flex;
		flex-direction: row;
		position: absolute;
		top: 1rem;
		left: 0;
		z-index: 10;
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
		background-color: rgba(0, 0, 0, 0.3);
		padding: 0.25rem 0.5rem;
		display: flex;
		justify-content: center;
		flex-direction: row;
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

</style>