<script>
    import { avatar, menuActive, activeScenario } from '../stores.js';
    import TextButton from './core/TextButton.svelte';

    const backToMenu = () => {
        avatar.reset()
        activeScenario.reset()
    }

</script>

<div class="container">
    <p>
      YOU DIED  
    </p>
    <div class="button-container">
        <TextButton text='continue' eventHandler={() => backToMenu()}/>
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