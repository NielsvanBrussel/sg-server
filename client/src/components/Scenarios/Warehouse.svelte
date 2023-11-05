<script>
    import { avatar } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import ShopItem from "../core/ShopItem.svelte";
    import { onMount } from 'svelte';

    export let setCombatMode
    export let combatMode
    export let changeIntroText 

   
    let showOptions = true
    let options = 1

   
    onMount(async () => {
        if(combatMode === 2) {
            postCombatHandler()
        }
    });

    const kidneyHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        changeIntroText("The storage unit you arrive at is made into a makeshift surgery room. The walls are taped with plastic and there is a large operating table in the middle. You recognise the doctor from the hospital. Unfortunately he also recognises you.")
        setTimeout(() => {
            setCombatMode(1)
        }, 3000);
    }

    const postCombatHandler = () => {
        changeIntroText("Between the corpses you find some boxes filled with organs. Surely your kidney is among them. Now you just have to find a trustworthy doctor to put everything back in place.")
        avatar.changeStats([{type: 'add item', value: inventoryItems.organs.id}, {type: 'add item', value: inventoryItems.organs.id}])
    }


</script>

{#if showOptions}
    {#if options === 1}
        {#if $avatar.unlocks.missingKidney === 2}
            <ScenarioOption 
                unlocked={$avatar.day === 4} 
                text="Go to storage unit 13 (Thursday)." 
                eventHandler={() => kidneyHandler()}
            />
        {/if}
    {/if}
{/if}




<style>

</style>