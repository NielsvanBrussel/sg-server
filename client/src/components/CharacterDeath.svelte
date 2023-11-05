<script>
    import { avatar, menuActive, activeScenario, playerPosition, map } from '../stores.js';
    import TextButton from './core/TextButton.svelte';

    const backToMenu = () => {
        avatar.reset()
        activeScenario.reset()
        menuActive.set(true)
    }

    const resurrect = () => {
        map.select("map_1")
        activeScenario.reset()
        playerPosition.set(-13875)
        avatar.changeStats([{ type: 'currentHitpoints', value: 10}])
    }

</script>

<div class="container">
    <p>
      YOU DIED  
    </p>
    {#if $avatar.unlocks.insurance === 3}
        <div class="button-container">
            <TextButton text='resurrect' eventHandler={() => resurrect()}/>
        </div>
        <h3>OR</h3>
    {/if}
    <div class="button-container">
        <TextButton text='back to menu' eventHandler={() => backToMenu()}/>
    </div>
</div>


<style>
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
    }
    p {
        font-family: 'PS2P';
        font-size: 3rem;
    }
</style>