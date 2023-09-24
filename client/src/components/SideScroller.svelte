<script>
    import { onMount, onDestroy } from 'svelte';
	import garethRunning from '../assets/img/gareth-running.gif'
	import garethStand from '../assets/img/gareth-stand.png'
	import rupertRunning from '../assets/img/rupert-running.gif'
	import rupertStand from '../assets/img/rupert-stand.png'
	import dwayneRunning from '../assets/img/dwayne-running.gif'
	import dwayneStand from '../assets/img/dwayne-stand.png'
	import { map, playerPosition, avatar, armoredCar } from '../stores';

	// floating message above locations
  	import EntryMessage from './EntryMessage.svelte';

	// list of all location positions, names and components
	import Background1A from './backgrounds/Background1A.svelte';
	import Background1B from './backgrounds/Background1B.svelte';

	
	let showVan
	
	$: if($armoredCar.location === $map.name && $armoredCar.day === $avatar.day) {
			showVan = true
		} else {
			showVan = false
		}

	const keyPress = {
		right: false,
		left: false
	} 


	const imageSelect = () => {
		switch ($avatar.name) {
			case 'King Dwayne':
				
				return {
					standing: dwayneStand,
					running: dwayneRunning
				}

			case 'Greasy Gareth':
			
				return {
					standing: garethStand,
					running: garethRunning
				}

			case 'Loopy Rupert':
			
				return {
					standing: rupertStand,
					running: rupertRunning
				}
	
			default:
				return {
					standing: dwayneStand,
					running: dwayneRunning
				}
		}
	}


	const avatarImg = imageSelect()


	//center avatar in the middle of the map
	let position  

	playerPosition.subscribe((value) => {
        position = value;
    });


	let messagePosition = 0
    let background
	let plane
	let planePosition = -270000
	let vanBackground
	let foreground
	let entryMessage
	let showEntry = false
	let showEntry2 = false
	let scenario
	let previousTimestamp = 0
	let loop = true
	let standStill = true
	let rightDirection = true
	let animating = false
	let mounted = false


    onMount(async () => {
		entryMessage = document.querySelector(".entry-container")
		plane = document.querySelector(".sliding-background3")
		mounted = true
		showEntry = false
	});


	const changeBackground = ({ backgroundValue, foregroundValue, vanBackgroundValue }) => {
		background = backgroundValue
		foreground = foregroundValue
		vanBackground = vanBackgroundValue
		scenario= $map.locationsArray[0]
		if (!animating) {
			animate()
		}
	}



	onDestroy(() => {
		loop = false
		removeEventListener('keydown', keyDownEvent)
		removeEventListener('keydown', keyUpEvent)
		playerPosition.set(position)
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


		// get the position on the image, regardless of how many times it looped
		const truePosition = position - (Math.floor(position / 900) * 900)
		

		for (let i = 0; i < $map.locationsArray.length; i++) {
			if (truePosition > $map.locationsArray[i].min && truePosition < $map.locationsArray[i].max) {


				// if the location is sewers and the avatar hasnt unlocked them yet skip location
				if($map.locationsArray[i].name === 'Sewers' && !$avatar.unlocks.sewer) {
					return false
				}
						
					const value =  ($map.locationsArray[i].min + $map.locationsArray[i].max) / 2
					if (!showEntry) {



						// position the message in the middle of the building (depending on which way he enters from)
						if (truePosition > value) {
							messagePosition = 25
						} else {
							messagePosition = -25
						}
						scenario= $map.locationsArray[i]
					}
					
					return true
			}
		}
		return false
	}


	const animate = (timestamp) => {

		if (mounted) {
			// fps (not true fps but time between frames) used to mainteam same speed between different Hz monitors
			const fps = timestamp - previousTimestamp
			previousTimestamp = timestamp
			
			if(keyPress.right) {
				// edge of map check
				if (position > -265000) { 
					position -= (1 * fps / 25)
					messagePosition -= (1 * fps / 25)
					planePosition += (0.6 * fps / 25)
				}
			} else if (keyPress.left) {
				//edge of map check
				if (position !== 0 && position < 0) {
					position += (1 * fps / 25)
					messagePosition += (1 * fps / 25)
					if (position > 0) {
						position = 0
					}
					planePosition += (2 * fps / 25)              
				}
			} else {
				planePosition += (1.2 * fps / 25)
			}
		
		
			showEntry = checkPositions()

			// dont display entrymessage on loading in
			if (!showEntry && !showEntry2) {
				showEntry2 = true
			}

			// move background & entry messages
			background.style.transform = `translate3d(calc(${position}vh + 45vw), 0, 0)`
			plane.style.transform = `translate3d(calc(${planePosition}vh + 45vw), 0, 0)`
			

			if (foreground) {
				foreground.style.transform = `translate3d(calc(${position}vh + 45vw), 0, 0)`
			}
			if (vanBackground) {
				let offset = 20
				if ($map.name === 'map_1') {
					offset = 260
				} 
				vanBackground.style.transform = `translate3d(calc(${position}vh + ${offset}vh + 45vw), 0, 0)`
			}
			entryMessage.style.transform = `translate3d(calc(${messagePosition}vh - 50%), 0, 0)`

			
		}

		if (loop) {
			requestAnimationFrame(animate)
		}

	}

</script>


<div class="container">
	{#if $map.name === "map_2"}
		<Background1B showVan={showVan} changeBackground={changeBackground}/>
	{:else}
		<Background1A showVan={showVan} changeBackground={changeBackground}/>
	{/if}		
	<div class="sliding-background2"></div>
	<div class="sliding-background3"></div>
	<div class="avatar-container">
			<!-- stack all 4 types of images on top of eachother and change zindex depending on condition -->
			<img 
				class={standStill && rightDirection ? "avatar visible" : "avatar hidden"} 
				src={avatarImg.standing} 
				alt="avatar"
			>
			<img 
				class={standStill && !rightDirection ? "avatar avatar-left visible" : "avatar avatar-left hidden"} 
				src={avatarImg.standing} 
				alt="avatar"
			>
			<img 
				class={!standStill && !rightDirection ? "avatar avatar-left visible" : "avatar avatar-left hidden"} 
				src={avatarImg.running} 
				alt="avatar"
			>
			<img 
				class={!standStill && rightDirection ? "avatar visible" : "avatar hidden"} 
				src={avatarImg.running} 
				alt="avatar"
			>
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

	.sliding-background2, .sliding-background3 {
		position: absolute;
		background-repeat: repeat-x;
		height: 90vh;
		width: 270000vh;
		background-size: 900vh 90vh;
		margin: auto;
	}

	.sliding-background2 {
		background-image: url("../assets/img/layer2.png");
		animation: slide-left 240s linear infinite;
		background-size: 900vh 90vh;
		z-index: 0;
	}


	.sliding-background3 {
		background-image: url("../assets/img/layer3.png");
		z-index: 1;
	}

	.avatar {
		position: absolute;
		bottom: 11vh;
		left: 50%;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		z-index: 3;
		height: auto;
		width: 9vh;
	}

	.visible {
		z-index: 3;
	}

	.hidden {
		z-index: -5;
	}

	.avatar-left {
		-webkit-transform: scaleX(-1);
  		transform: scaleX(-1);
	}

	.entry-container {
		position: absolute;
		z-index: 7;
		top: 2rem;
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
