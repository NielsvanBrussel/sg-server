<script>
    import { onMount } from 'svelte';
	import avatar from '../assets/img/avatar.png'

	const keyPress = {
		right: false,
		left: false
	} 

	//center avatar in the middle of the map
	let position = -135000   
	// position = 0
	let messagePosition = 0
    let background
	let entryMessage
	let showEntry = false
	let scenarioName
	let previousTimestamp = 0


	// positions of all the buildings
	const limitArray = [
		{
			min: 502,
			max: 552,
			name: 'Hospital'
		},
		{
			min: 655,
			max: 705,
			name: 'Supermarket'
		},
		{
			min: 780,
			max: 830,
			name: 'Hardware store'
		},
		{
			min: 835,
			max: 885,
			name: 'Children of the Golden Flower'
		},
		{
			min: 590,
			max: 640,
			name: 'Bridge'
		},
		{
			min: 370,
			max: 420,
			name: 'Gas station'
		},
		{
			min: 290,
			max: 340,
			name: 'Police station'
		},
		{
			min: 100,
			max: 150,
			name: 'Storage'
		},
		{
			min: 185,
			max: 235,
			name: 'School'
		},
		{
			min: 5,
			max: 55,
			name: 'Park'
		},
	]

    onMount(async () => {
		background = document.querySelector(".sliding-background1")
		entryMessage = document.querySelector(".entry-container")
        animate()
	});


	// when user presses left or right keys
	addEventListener('keydown', ({ key }) => {
		if (key === 'ArrowRight' || key === 'd') {
			keyPress.right = true
		} else if (key === 'ArrowLeft' || key === 'a') {
			keyPress.left = true
		}
	})

	// when user releases left or right keys
	addEventListener('keyup', ({ key }) => {
		if (key === 'ArrowRight' || key === 'd') {
			keyPress.right = false
		} else if (key === 'ArrowLeft' || key === 'a') {
			keyPress.left = false
		}
	})



	// check if the avatar is close to any buildings
	const checkPositions = () => {

		const truePosition = position - (Math.floor(position / 900) * 900)	
		console.log(truePosition)	

		for (let i = 0; i < limitArray.length; i++) {
			if (truePosition > limitArray[i].min && truePosition < limitArray[i].max) {
						
					const value =  (limitArray[i].min + limitArray[i].max) / 2
					if (!showEntry) {

						// position the message in the middle of the building (depending on which way he enters from)
						if (truePosition > value) {
							messagePosition = 25
						} else {
							messagePosition = -25
						}
						scenarioName = limitArray[i].name
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
				position -= (1 * fps / 20)
				messagePosition -= (1 * fps / 20)
			}
		} else if (keyPress.left) {
			//edge of map check
            if (position !== 0 && position < 0) {
			    position += (1 * fps / 20)
				messagePosition += (1 * fps / 20)
				if (position > 0) {
					position = 0
				}              
            }
		}	
	
		showEntry = checkPositions()

		// move background & entry messages
        background.style.transform = `translate3d(calc(${position}vh + 45vw), 0, 0)`
		entryMessage.style.transform = `translate3d(calc(${messagePosition}vh - 50%), 0, 0)`
		requestAnimationFrame(animate)
	}

</script>


<div class="container">
	<div class="sliding-background1"></div>
	<div class="sliding-background2"></div>
	<div class="sliding-background3"></div>
	<div >
		<img class="avatar" src={avatar} alt="Italian Trulli">
	</div>
	<div class="entry-container">
		{#if showEntry} 
			<p>{scenarioName}</p>
			<p>Enter</p>
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

	.sliding-background1, .sliding-background2, .sliding-background3 {
		position: absolute;
		background-repeat: repeat-x;
		background-size: 900vh 90vh;
		height: 90vh;
		width: 270000vh;
		margin: auto;
	}

	.sliding-background1 {
		background-image: url("../assets/img/layer1.png");
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
		top: 75%;
		left: 50%;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		z-index: 4;
		height: 10vh;
		width: auto;
	}

	.entry-container {
		position: absolute;
		z-index: 3;
		top: 20%;
		left: 50%;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
		background-color: black;
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
