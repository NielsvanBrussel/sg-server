<script>
    import { onMount } from 'svelte';

	const keyPress = {
		right: false,
		left: false
	} 

	let position = 0
    let background

    onMount(async () => {
		background = document.querySelector(".sliding-background1")
        animate()
	});


	addEventListener('keydown', ({ key }) => {
		if (key === 'ArrowRight' || key === 'd') {
			keyPress.right = true
		} else if (key === 'ArrowLeft' || key === 'a') {
			keyPress.left = true
		}
	})

	addEventListener('keyup', ({ key }) => {
		if (key === 'ArrowRight' || key === 'd') {
			keyPress.right = false
		} else if (key === 'ArrowLeft' || key === 'a') {
			keyPress.left = false
		}
	})


	const animate = () => {
		requestAnimationFrame(animate)

		if(keyPress.right) {
			position -= 1
		} else if (keyPress.left) {
            if (position !== 0 || position > 0) {
			    position += 1               
            }
		}

        background.style.transform = `translate3d(${position / 4}vh, 0, 0)`
		
	}

</script>


<div class="container">
	<div class="sliding-background1"></div>
	<div class="sliding-background2"></div>
	<div class="sliding-background3"></div>
</div>



<style>

    .container {
		overflow: hidden;
		width: 100%;
		margin: 0rem auto;
		height: 90vh;
		width: 90vw;
		position: relative;
	}

	.sliding-background1, .sliding-background2, .sliding-background3 {
		position: absolute;
		background-repeat: repeat-x;
		background-size: 900vh 90vh;
		height: 90vh;
		width: 2700vh;
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
