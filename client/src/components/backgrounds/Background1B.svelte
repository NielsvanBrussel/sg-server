<script>
    export let changeBackground
    export let showVan
    import { onMount, onDestroy } from 'svelte';
  import { avatar, partyVan } from '../../stores';

    onMount(async () => {

        let vanBackground = null
		const background = document.querySelector(".sliding-background1B")
        const foreground = document.querySelector(".sliding-background0")
        if (showVan) {
            vanBackground = document.querySelector(".sliding-background-van")
        }
        changeBackground({ backgroundValue: background, foregroundValue: foreground, vanBackgroundValue: vanBackground })
	});
    
</script>

{#if $partyVan}
    <div class="sliding-background0 van"></div>
{:else}
    <div class="sliding-background0 no-van"></div>
{/if}
<div class="sliding-background1B"></div>
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

    .sliding-background1B, .sliding-background0, .sliding-background-van, .fade {
		position: absolute;
		background-repeat: repeat-x;
		background-size: calc(900vh + 1px) 90vh;
		height: 90vh;
		width: calc(270000vh + 900px);
		margin: auto;

	}

    .sliding-background0 {
		z-index: 5;
	}

    .van {
        background-image: url("../../assets/img/layer1.0_b_van.png");
    }

    .no-van {
        background-image: url("../../assets/img/layer1.0_b.png");
    }

    .sliding-background1B {
        background-image: url("../../assets/img/layer1.1_b.png");
		z-index: 2; 
    }

    .fade {
        z-index: 8;
        animation: fade-in 3s forwards;
    }

    .sliding-background-van {
		background-image: url("../../assets/img/armoredcar.png");
        transform: translate3d(calc(20vh + 45vw), 0, 0);
		z-index: 6;
	}

</style>