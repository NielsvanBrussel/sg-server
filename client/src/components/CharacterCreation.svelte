<script>
	import { newGame, avatar } from '../stores.js';
	import { Circle } from 'svelte-loading-spinners';
	import dwayne from '../assets/img/dwayne.gif'
	import rupert from '../assets/img/rupert.gif'
	import rodney from '../assets/img/rodney.gif'

	let loading = false
	let charIndex = 0

	const characters = [
		{
			name: 'Rodney',
			img: rodney,
			stats: {
				strength: 10,
				stamina: 3,
				intellect: 2,
				hitpoints: 40,
				charm: 3,
			}
		},
		{
			name: 'Loopy Rupert',
			img: rupert,
			stats: {
				strength: 2,
				stamina: 5,
				intellect: 8, 
				hitpoints: 25,
				charm: 5,
			}
		},
		{
			name: 'Dwayne',
			img: dwayne,
			stats: {
				strength: 5,
				stamina: 5,
				intellect: 5,
				hitpoints: 30,
				charm: 8,
			}
		},
	]

	$: activeCharacter = characters[charIndex]

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

	const setCharacter = () => {

		avatar.set({ 
			name: activeCharacter.name,
			strength: activeCharacter.stats.strength,
            stamina: activeCharacter.stats.stamina,
            intellect: activeCharacter.stats.intellect,
            charm: activeCharacter.stats.charm,
			hitpoints: activeCharacter.stats.hitpoints,
			items: [],
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
					<h2>{activeCharacter.name}</h2>
					<div class="image-container">
						<img src={activeCharacter.img} alt={activeCharacter.name} class="idkyet">
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
							<p class="stats-title">intimidation: </p>
							<p class={activeCharacter.stats.charm > 5 ? "stats-green" : activeCharacter.stats.charm < 5 ? "stats-red" : "stats-default"}>{activeCharacter.stats.charm}</p>
						</div>
						<div class="stats-flex">
							<p class="stats-title">hitpoints: </p>
							<p class={activeCharacter.stats.hitpoints > 30 ? "stats-green" : activeCharacter.stats.hitpoints < 30 ? "stats-red" : "stats-default"}>{activeCharacter.stats.hitpoints}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex-row">
				<div class="button-container">
					<button on:click={() => changeCharacter(-1)} class="button-prev button-nav"></button>
					<button on:click={() => changeCharacter(1)} class="button-next button-nav"></button>			
				</div>
				<div>
					<button class="button-nav" on:click={() => setCharacter()}>continue</button>
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
	}
	.column-1 {
		border: #F48C06 1rem solid;
		background-color: #05173D;
	}
	.column-2 {
		border: #F51743 1rem solid;
		background-color: #41173D
	}
	.flex-row {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-around;
		margin: 2rem 0rem;
	}
	img {
		display: block;
	}
	.header-container {
		height: 10rem;
		display: flex;
		justify-content: center;
		align-items: center;
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
		font-size: 1.25rem;
		width: 20rem;
		text-align: left;
	}
	.content-box {
		height: 100%;
	}
	.selection-container {
		height: calc(100% - 10rem);
		overflow-y: auto;
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
		gap: 4rem;
	}
	.button-nav {
		background-repeat: no-repeat;
		background-position: center;
		background-size: 2rem auto;
		margin: auto;
		min-height: 3rem;
		min-width: 3rem;
		border: none;
		color: #F48C06;
		background-color: #CD173F;
		box-shadow: 2px 2px 0px 2px #91173F;
    	-webkit-box-shadow: 2px 2px 0px 2px #91173F;
	}
	.button-nav:hover {
		border: none;
	}
	button:focus-visible {
  		outline: none !important;
	}
	.button-nav:active{
		-webkit-box-shadow: 2px 2px 0px 2px #91173F inset;
		box-shadow: 2px 2px 0px 2px #91173F inset;
		border: none;
	}
	.button-next {
		background-image: url('../assets/img/arrow-next.png');
	}
	.button-prev {
		background-image: url('../assets/img/arrow-prev.png');
	}

</style>