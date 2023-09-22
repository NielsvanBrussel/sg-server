<script>
    import { avatar, activeScenario } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from 'svelte';

    export  let setCombatMode
    export let combatMode
    export let changeIntroText 

   
    let showOptions = true

   
    onMount(async () => {
        if(combatMode === 2) {
            postCombatHandler()
        }
    });

    const postCombatHandler = () => {
        changeIntroText("Between the corpses you find some boxes filled with organs. Surely your kidney is among them. Probably a good idea to find a trustworthy doctor to patch you up again.")
        avatar.changeStats([{type: 'add item', value: inventoryItems.organs.id}, {type: 'add item', value: inventoryItems.organs.id}])
    }

    const combatHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        setCombatMode(1)
    }

</script>


{#if showOptions && combatMode === 0 && $avatar.unlocks.missingKidney}              
    <ScenarioOption text="COMBAT: Get your kidney back! (MEDIUM)" eventHandler={() => combatHandler()}/>
{/if}  

<style>

</style>