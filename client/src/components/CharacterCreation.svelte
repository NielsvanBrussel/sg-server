<script>
	import { avatar } from '../stores.js';
	import { Circle } from 'svelte-loading-spinners';
	import dwayne from '../assets/img/dwayne.gif'
	import rupert from '../assets/img/rupert.gif'
	import gareth from '../assets/img/gareth.gif'
  	import TextButton from './core/TextButton.svelte';

	let loading = false
	let charIndex = 0

	const characters = [
		{
			name: 'Greasy Gareth',
			img: gareth,
			stats: {
				strength: 10,
				stamina: 3,
				intellect: 2,
				maxHitpoints: 20,
				currentHitpoints: 100,
				luck: 3,
			}
		},
		{
			name: 'Loopy Rupert',
			img: rupert,
			stats: {
				strength: 2,
				stamina: 5,
				intellect: 8, 
				maxHitpoints: 8,
				currentHitpoints: 40,
				luck: 5,
			}
		},
		{
			name: 'King Dwayne',
			img: dwayne,
			stats: {
				strength: 5,
				stamina: 5,
				intellect: 5,
				maxHitpoints: 10,
				currentHitpoints: 50,
				luck: 4,
			}
		},
	]

	$: activeCharacter = characters[charIndex]


	// change thorugh the array of characters

	const changeCharacter = (value) => {

		const newIndex = charIndex + value
		if (newIndex < 0) {
			charIndex = characters.length - 1
		} else if (newIndex >= characters.length) {
			charIndex = 0
		} else {
			charIndex = newIndex
		}
		
	}


	// initialize avatar 

	const setCharacter = () => {

		avatar.set({ 
			name: activeCharacter.name,
			stats: activeCharacter.stats,
			buffs: {
                strengthBuff: 0,
                intellectBuff: 0,
                luckBuff: 0,
            },
			level: 1,
            experience: 0,
			day: 1,
			money: 5000,
			items: [],
			unlocks: {
				hospitalVisits: 0,
				missingKidney: false,
				billy: false,
				growingWeed: 0,
				methLab: 0,
				cult: 0,
				armsdealer: 0,
				organTrade: false,
				sewers: false,
				transportRobbery: 0,
				items: []
			},
			date_created: new Date()
		})

	}

	
</script>


<div class="container">
	{#if loading}
		<div class="spinner-container">
			<Circle size="40" color="#FF3E00" unit="px" duration="1s" />                       
		</div>
	{:else}
	<div class="content-box">
		<div class="header-container">
			<h1>Select your character</h1>
		</div>
		<div class="selection-container">
			<div class="flex-row ">
				<div class="flex-column column-1">
					<div class="name-container">
						<h2>{activeCharacter.name}</h2>
					</div>
					<div class="image-container">
						<img src={activeCharacter.img} alt={activeCharacter.name} class="character-img">
					</div>
				</div>
				<div class="flex-column column-2">
					<h2>stats</h2>
					<div class="stats-container">
						<div class="stats-flex">
							<p class="stats-title">strength: </p>
							<p class={activeCharacter.stats.strength > 5 ? "stats-green" : activeCharacter.stats.strength < 5 ? "stats-red" : "stats-default"}>{activeCharacter.stats.strength}</p>					
						</div>
						<div class="stats-flex">
							<p class="stats-title">stamina: </p>
							<p class={activeCharacter.stats.stamina > 5 ? "stats-green" : activeCharacter.stats.stamina < 5 ? "stats-red" : "stats-default"}>{activeCharacter.stats.stamina}</p>
						</div>
						<div class="stats-flex">
							<p class="stats-title">intellect: </p>
							<p class={activeCharacter.stats.intellect > 5 ? "stats-green" : activeCharacter.stats.intellect < 5 ? "stats-red" : "stats-default"}>{activeCharacter.stats.intellect}</p>
						</div>
						<div class="stats-flex">
							<p class="stats-title">luck: </p>
							<p class={activeCharacter.stats.luck > 5 ? "stats-green" : activeCharacter.stats.luck < 5 ? "stats-red" : "stats-default"}>{activeCharacter.stats.luck}</p>
						</div>
						<div class="stats-flex">
							<p class="stats-title">hitpoints: </p>
							<p class={activeCharacter.stats.maxHitpoints > 30 ? "stats-green" : activeCharacter.stats.maxHitpoints < 30 ? "stats-red" : "stats-default"}>{activeCharacter.stats.maxHitpoints}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex-row">
				<div class="button-container">
					<button on:click={() => changeCharacter(-1)} class="button-prev button-nav"></button>
					<button on:click={() => changeCharacter(1)} class="button-next button-nav"></button>			
				</div>
				<div class="button-container">
					<TextButton eventHandler={() => setCharacter()} text='continue'/>
				</div>
			</div>
		</div>
	</div>
	{/if}
</div>


<style>

	.flex-column {
		display: flex;
		flex-direction: column;
		width: 35%;
		border-radius: 0.5rem;
		max-width: 25rem;
		min-width: 20rem;
	}
	.column-1 {
		border: #F48C06 1rem solid;
		background-color: #05173D;
	}
	.column-2 {
		border: #F51743 1rem solid;
		background-color: #41173D
	}
	.name-container {
		min-height: 7rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0rem 1rem;
	}
	.flex-row {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		gap: 3rem;
		margin: 2rem 0rem;
	}
	.image-container {
		height: 100%;
		width: 100%;
	}
	.character-img {
		display: block;
		width: 100%;
		height: auto;
	}
	.header-container {
		display: flex;
		margin: 3rem 0rem;
		justify-content: center;
		align-items: center;
	}
	h1 {
		font-size: 3rem;
		margin: 0;
	}
	.stats-container {
		margin: 0rem 1rem;
	}
	.stats-flex {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.stats-title {
		font-size: 1rem;
		width: 20rem;
		text-align: left;
	}
	.content-box {
		height: 100%;
		overflow-y: auto;
	}
	.selection-container {
	
		/* overflow-y: auto; */
	}
	.content-box::-webkit-scrollbar {
		width: 0.6rem;
		background: transparent;
		border-radius: 2rem;
		margin-bottom: 0.5rem;  
  	}
	.content-box::-webkit-scrollbar-track {
		background-color: #F48C06 ;
		color: transparent;
		margin: 2rem 0rem 6rem 0rem;
		border-radius: 2rem;
	}
  	.content-box::-webkit-scrollbar-thumb {
		background: #F51743;
		border-radius: 2rem;
  	}
	.stats-green {
		color: green;
	}
	.stats-red {
		color: red;
	}
	.container {
		width: 80%;
		height: 90vh;
		margin: 0 auto;
		font-family: "PS2P";
	}
	.button-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 3rem;
		width: 35%;
		margin: 0rem 1rem;
	}
	.button-nav {
		background-repeat: no-repeat;
		background-position: center;
		background-size: 2rem auto;
		min-height: 3rem;
		min-width: 3rem;
		border: none;
		color: #F48C06;
		background-color: #CD173F;
		box-shadow: 2px 2px 0px 2px #91173F;
    	-webkit-box-shadow: 2px 2px 0px 2px #91173F;
	}
	.button-nav:hover {
		scale: 1.02;
	}
	button:focus-visible {
  		outline: none !important;
	}
	.button-nav:active{
		-webkit-box-shadow: 2px 2px 0px 2px #91173F inset;
		box-shadow: 2px 2px 0px 2px #91173F inset;
		scale: 1.02;
		border: none;
	}
	.button-next {
		background-image: url('../assets/img/arrow-next.png');
	}
	.button-prev {
		background-image: url('../assets/img/arrow-prev.png');
	}


	@media screen and (max-width: 65em){
		.flex-row {
			flex-direction: column;
			align-items: center;
		}
	}
</style>