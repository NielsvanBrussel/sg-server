<script>
    export let changeBackground
    export let showVan
    import { onMount, onDestroy } from 'svelte';

    onMount(async () => {

        let vanBackground = null
		const background = document.querySelector(".sliding-background1A")
        const foreground = document.querySelector(".sliding-background0")
        if (showVan) {
            vanBackground = document.querySelector(".sliding-background-van")
        }
        changeBackground({ backgroundValue: background, foregroundValue: foreground, vanBackgroundValue: vanBackground })
	});

</script>

<div class="sliding-background0"></div>
<div class="sliding-background1A"></div>   
{#if showVan}
    <div class="sliding-background-van"></div>
{/if}
<div class="fade"></div>

<style>

    @keyframes fade-in {
        0% { 
            background-color: rgba(0, 0, 0, 1);
        }
        100% {
            background-color: rgba(0, 0, 0, 0);
        }
    }

    .sliding-background1A, .sliding-background0, .sliding-background-van, .fade {
		position: absolute;
		background-repeat: repeat-x;
		background-size: 900vh 90vh;
		height: 90vh;
		width: 270000vh;
		margin: auto;
        
	}

    .sliding-background0 {
		background-image: url("../../assets/img/layer1.0.png");
		z-index: 4;
	}

    .sliding-background1A {
        background-image: url("../../assets/img/layer1.1_a.png");
		z-index: 2;
    }

    .fade {
        z-index: 6;
        animation: fade-in 3s forwards;
    }

    .sliding-background-van {
		background-image: url("../../assets/img/armoredcar.png");
		transform: translate3d(calc(260vh + 45vw), 0, 0);
		z-index: 5;
	}

</style>