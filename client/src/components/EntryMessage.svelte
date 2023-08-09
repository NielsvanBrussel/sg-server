<script>
    export let scenario
    export let position 
    import { activeScenario, playerPosition } from '../stores.js';
    import { onDestroy } from 'svelte';

    

    

    const changeScenario = ({ code }) => {
        if (code === 'Space') {

            playerPosition.set(position)

            activeScenario.set({
                name: scenario.name,
                component: scenario.component
            })
        }
    }

    addEventListener('keydown', changeScenario)
    onDestroy(() => removeEventListener('keydown', changeScenario));

</script>


<div class="container">
    <p>{scenario.name}</p>
    <p>Enter</p>
</div>



<style>

	.container {
		width: 100%;
		padding: 1rem;
		background-color: #03071E;
	}

</style>
