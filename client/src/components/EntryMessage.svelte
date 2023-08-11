<script>
    export let scenario
    export let position 
    import { activeScenario, playerPosition } from '../stores.js';
    import { onDestroy } from 'svelte';
  import TextButton from './core/TextButton.svelte';

    
    const enterScenario = () => {
        console.log('first')
             playerPosition.set(position)

            activeScenario.set({
                name: scenario.name,
                component: scenario.component
            })       
    }
    

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
        max-width: 20rem;
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 5rem;
        border: 0.5rem #F48C06 solid;
	}
    p {
        font-family: 'Bungee-Spice';
        font-size: 2.5rem;
        margin: 0 0 1rem 0;
    }

</style>
