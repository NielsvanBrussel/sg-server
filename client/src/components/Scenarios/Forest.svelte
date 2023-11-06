<script>
    import { avatar, activeScenario } from "../../stores";
    import { onMount } from "svelte";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import inventoryItems from "../../utility/inventoryItems";
    import { enemies } from "../combat/enemies";

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
        if ($activeScenario.enemies[3].name === "Cult Member") {
            changeIntroText("You got rid of the cult member, Rudy will be pleased.")
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 6}}) 
        } else {
            changeIntroText("A few animal species are now nearly extinct thanks to you. Better wait for the forest to repopulate.")
        }
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

    const combatHandler = (value) => {
        avatar.changeStats([{type: 'day', value: 1}])
        if (value) {
            activeScenario.set({...$activeScenario, enemies: enemies.grandma})
        } 
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
            eventHandler={() => combatHandler(0)}
        />
        {#if $avatar.unlocks.cult === 5}
            <ScenarioOption 
                unlocked={true} 
                text="Find the Follower Of Rudy and make him disappear" 
                eventHandler={() => combatHandler(1)}
            />
        {/if}
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>