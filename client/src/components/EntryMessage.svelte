<script>
    export let scenario
    export let position 
    import { activeScenario, playerPosition, map } from '../stores.js';
    import { onDestroy } from 'svelte';
    import TextButton from './core/TextButton.svelte';

    
    const enterScenario = () => {

        playerPosition.set(position)

        if (!scenario.component) {
            if ($map.name === "map_1") {
                map.select("map_2")
            } else if ($map.name === "map_2") {
                map.select("map_1")
            } 
        } else {
            activeScenario.set({
                name: scenario.name,
                component: scenario.component,
                introText: scenario.introText,
                enemies: scenario.enemies,
            })               
        }

    }
    

    // possibility to enter scenaria by pressing space button, instead of clicking enter

    const spaceButtonEvenListener = ({ code }) => {
        if (code === 'Space') {
            enterScenario()
        }
    }

    addEventListener('keydown', spaceButtonEvenListener)
    onDestroy(() => removeEventListener('keydown', spaceButtonEvenListener));

</script>


<div class="container">
    <p>{scenario.name}</p>
    <TextButton  text='Enter' eventHandler={() => enterScenario()}/>
</div>



<style>

	.container {
		min-width: 12rem;
        max-width: 22rem;
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 5rem;
        border: 0.5rem #F48C06 solid;
	}
    p {
        font-family: 'Bungee-Spice';
        font-size: 2.25rem;
        margin: 0 0 1rem 0;
    }

</style>
