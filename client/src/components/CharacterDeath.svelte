<script>
    import { avatar, menuActive, activeScenario } from '../stores.js';
    import TextButton from './core/TextButton.svelte';

    const backToMenu = () => {
        avatar.set(        {
            name: null,
			stats: {
				strength: null,
				stamina: null,
				intellect: null,
				maxHitpoints: null,
				currentHitpoints: null,
				intimidation: null,
			},
			day: 1,
			money: 20,
			items: [],
			unlocks: {
				hospitalVisits: 0,
				missingKidney: false,
				billy: false,
				growingWeed: false,
				hoboArena: false,
				organTrade: false,
				sewers: false,
			},
			date_created: null
        })
        activeScenario.set({
			name: "",
			component: null,
            introText: ""
        })
        menuActive.set(true)
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