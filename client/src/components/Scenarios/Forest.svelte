<script>
    import { avatar } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import inventoryItems from "../../utility/inventoryItems";

    export let changeIntroText
    let showOptions = true

    const forageHandler = () => {
        let max = $avatar.stats.intellect * 2
        if (max > 30)  {
            max = 30
        }

        const rng = Math.floor(Math.random() * 100) + max

        if (rng > 105) {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.truffle.id}, {type: 'day', value: 1}])
            changeIntroText('You found a truffle! Pigs love these things. Better hold on to these.')
        } else if (rng > 90) {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.frog.id}, {type: 'day', value: 1}])
            changeIntroText('You found a frog! This one looks poisonous. Maybe you can find a purpose for it.')
        } else if (rng > 75) {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.shroom.id}, {type: 'day', value: 1}])
            changeIntroText('You found some weird looking mushrooms. Someone might be interested in buying these.')
        } else {
            avatar.changeStats([{ type: 'add item', value: inventoryItems.turd.id}, {type: 'day', value: 1}])
            changeIntroText('You find some animal feces. You put them in your pocket. Might come in handy.')
        }

        showOptions = false
    }

    const punchHandler = () => {
        let max = $avatar.stats.strength
        if (max > 15)  {
            max = 15
        }

        const rng = Math.floor(Math.random() * 5) + max

        if (rng >= 15) {
            avatar.changeStats([{type: 'day', value: 1}])
            changeIntroText('These trees are no match for you. You break them one by one.')
        } else {
            avatar.changeStats([{ type: 'currentHitpoints', value: -10}, { type: 'strength', value: 1}, {type: 'day', value: 1}])
            changeIntroText('After repeatably punching the tree you break your wrist. You feel slightly stronger though.')
        }
        
        showOptions = false
    }

</script>

{#if showOptions}
    <div class="options-container">
        <ScenarioOption text="INTELLECT: Forage." eventHandler={() => forageHandler()}/>
        <ScenarioOption text="COMBAT: Hunt. (MEDIUM - HARD)" eventHandler={() => punchHandler()}/>
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>