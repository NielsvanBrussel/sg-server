<script>
    import { onMount, onDestroy } from 'svelte';
	import avatar from '../assets/img/avatar.png'
	import garethRunning from '../assets/img/gareth-running.gif'
	import garethStand from '../assets/img/gareth-stand.png'

	// floating message above locations
  	import EntryMessage from './EntryMessage.svelte';

	// list of all location positions, names and components
	import locationsArray from './Scenarios';
  	import { playerPosition } from '../stores';


	const keyPress = {
		right: false,
		left: false
	} 


	//center avatar in the middle of the map
	let position  
	// position = 0

	playerPosition.subscribe((value) => {
        position = value;
    });


	let messagePosition = 0
    let background
	let foreground
	let entryMessage
	let showEntry = false
	let showEntry2 = false
	let scenario
	let previousTimestamp = 0
	let loop = true
	let standStill = true
	let rightDirection = true


    onMount(async () => {
		background = document.querySelector(".sliding-background1")
		foreground = document.querySelector(".sliding-background0")
		entryMessage = document.querySelector(".entry-container")
        animate()
	});

	onDestroy(() => {
		loop = false
		removeEventListener('keydown', keyDownEvent)
		removeEventListener('keydown', keyUpEvent)
	});


	const keyDownEvent = ({ key }) => {
		if (key === 'ArrowRight' || key === 'd') {
			standStill = false
			keyPress.right = true
			rightDirection = true
		} else if (key === 'ArrowLeft' || key === 'a') {
			keyPress.left = true
			standStill = false
			if (keyPress.right === false) {
				rightDirection = false
			}
		}
	}

	const keyUpEvent = ({ key }) => {
		if (key === 'ArrowRight' || key === 'd') {
			keyPress.right = false
			if (keyPress.left === false) {
				standStill = true
				rightDirection = true
			}
		} else if (key === 'ArrowLeft' || key === 'a') {
			keyPress.left = false
			if (keyPress.right === false) {
				standStill = true
				rightDirection = false
			}
		}
	}


	// when user presses left or right keys
	addEventListener('keydown', keyDownEvent)

	// when user releases left or right keys
	addEventListener('keyup', keyUpEvent)



	// check if the avatar is close to any buildings
	const checkPositions = () => {

		const truePosition = position - (Math.floor(position / 900) * 900)	

		for (let i = 0; i < locationsArray.length; i++) {
			if (truePosition > locationsArray[i].min && truePosition < locationsArray[i].max) {
						
					const value =  (locationsArray[i].min + locationsArray[i].max) / 2
					if (!showEntry) {

						// dont display the message at first when the player returns from a scenario
						if (scenario !== locationsArray[i] && scenario && !showEntry2) {
							showEntry2 = true
						}

						// position the message in the middle of the building (depending on which way he enters from)
						if (truePosition > value) {
							messagePosition = 25
						} else {
							messagePosition = -25
						}
						scenario= locationsArray[i]
					}
					
					return true
			}
		}
		return false
	}


	const animate = (timestamp) => {


		// fps (not true fps but time between frames) used to mainteam same speed between different Hz monitors
		const fps = timestamp - previousTimestamp
		previousTimestamp = timestamp
		
		if(keyPress.right) {
			// edge of map check
			if (position > -265000) { 
				position -= (1 * fps / 25)
				messagePosition -= (1 * fps / 25)
			}
		} else if (keyPress.left) {
			//edge of map check
            if (position !== 0 && position < 0) {
			    position += (1 * fps / 25)
				messagePosition += (1 * fps / 25)
				if (position > 0) {
					position = 0
				}              
            }
		}	
	
		showEntry = checkPositions()

		// move background & entry messages
        background.style.transform = `translate3d(calc(${position}vh + 45vw), 0, 0)`
		foreground.style.transform = `translate3d(calc(${position}vh + 45vw), 0, 0)`
		entryMessage.style.transform = `translate3d(calc(${messagePosition}vh - 50%), 0, 0)`

		if (loop) {
			requestAnimationFrame(animate)
		}
	}

</script>


<div class="container">
	<div class="sliding-background0"></div>
	<div class="sliding-background1"></div>
	<div class="sliding-background2"></div>
	<div class="sliding-background3"></div>
	<div >
		{#if standStill && rightDirection} 
			<img class="avatar" src={garethStand} alt="avatar">
		{:else if standStill && !rightDirection}
			<img class="avatar avatar-left" src={garethStand} alt="avatar">
		{:else if !standStill && !rightDirection}
			<img class="avatar avatar-left" src={garethRunning} alt="avatar">
		{:else}
			<img class="avatar" src={garethRunning} alt="avatar">
		{/if}
	</div>
	<div class="entry-container">
		{#if showEntry && showEntry2} 
			<EntryMessage scenario={scenario} position={position}/>
		{/if}
	</div>
</div>



<style>

    .container {
		overflow: hidden;
		width: 100%;
		margin: 0rem auto;
		height: 90vh;
		width: 90vw;
		position: relative;
		background-color: black;
	}

	.sliding-background0, .sliding-background1, .sliding-background2, .sliding-background3 {
		position: absolute;
		background-repeat: repeat-x;
		background-size: 900vh 90vh;
		height: 90vh;
		width: 270000vh;
		margin: auto;
	}

	.sliding-background0 {
		background-image: url("../assets/img/layer1.0.png");
		z-index: 4;
	}

	.sliding-background1 {
		background-image: url("../assets/img/layer1.1.png");
		z-index: 2;
	}

	.sliding-background2 {
		background-image: url("../assets/img/layer2.png");
		animation: slide-left 240s linear infinite;
		z-index: 0;
	}


	.sliding-background3 {
		background-image: url("../assets/img/layer3.png");
		animation: slide-right 20s linear infinite;
		z-index: 1;
	}

	.avatar {
		position: absolute;
		bottom: 11vh;
		left: 50%;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		z-index: 3;
		height: 14vh;
		width: auto;
	}

	.avatar-left {
		-webkit-transform: scaleX(-1);
  		transform: scaleX(-1);
	}

	.entry-container {
		position: absolute;
		z-index: 6;
		top: 20%;
		left: 50%;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
	}


    @keyframes slide-left{
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-900vh, 0, 0);
	}
	}

	@keyframes slide-right{
	0% {
		transform: translate3d(-900vh, 0, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
	}

</style>
