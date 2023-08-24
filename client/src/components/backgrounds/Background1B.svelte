<script>
    export let changeBackground
    import { onMount, onDestroy } from 'svelte';

    onMount(async () => {
		const background = document.querySelector(".sliding-background1B")
        changeBackground({ backgroundValue: background, foregroundValue: null })
	});
    
</script>

<div class="sliding-background1B"></div>
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

    .sliding-background1B, .fade {
		position: absolute;
		background-repeat: repeat-x;
		background-size: 900vh 90vh;
		height: 90vh;
		width: 270000vh;
		margin: auto;

	}

    .sliding-background1B {
        background-image: url("../../assets/img/test.png");
		z-index: 2; 
    }

    .fade {
        z-index: 5;
        animation: fade-in 3s forwards;
    }

</style>