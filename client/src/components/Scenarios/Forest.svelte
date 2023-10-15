<script>
    import { avatar } from "../../stores";
    import { onMount } from "svelte";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import inventoryItems from "../../utility/inventoryItems";

    export let changeIntroText
    export let combatMode
    export let setCombatMode
   
    let showOptions = true

    onMount(async () => {
        // runs after the player has gone through the full combat cycle
        if(combatMode === 2) {
            postCombatHandler()
        }
    });

    const postCombatHandler = () => {
        showOptions = false
        changeIntroText("A few animal species are now nearly extinct thanks to you. Better wait for the forest to repopulate.")
    }

    const forageHandler = () => {
        let max = $avatar.stats.intellect * 2
        if (max > 30)  {
            max = 30
        }

        const rng = Math.floor(Math.random() * 100) + max

        if (rng > 105) {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.truffle.id}, {type: 'day', value: 1}])
            changeIntroText('You found a truffle! Pigs love these things. Better hold on to these.')
        } else if (rng > 85) {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.frog.id}, {type: 'day', value: 1}])
            changeIntroText('You found a frog! This one looks poisonous. Maybe you can find a purpose for it.')
        } else if (rng > 55) {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.shroom.id}, {type: 'day', value: 1}])
            changeIntroText('You found some weird looking mushrooms. Someone might be interested in buying these.')
        } else {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.turd.id}, {type: 'day', value: 1}])
            changeIntroText('You find some animal feces. You put them in your pocket. Might come in handy.')
        }

        showOptions = false
    }

    const combatHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        setCombatMode(1)
    }

</script>

{#if showOptions}
    <div class="options-container">
        <ScenarioOption 
            unlocked={true} 
            text="INTELLECT: Forage." 
            eventHandler={() => forageHandler()}
        />
        <ScenarioOption 
            unlocked={true} 
            text="COMBAT: Hunt. (MEDIUM - HARD)" 
            eventHandler={() => combatHandler()}
        />
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>