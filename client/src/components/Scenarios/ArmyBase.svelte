<script>
    import { avatar } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from "svelte";

    export let changeIntroText
    export let combatMode
    export let setCombatMode
  
    let showOptions = true

    $: crate = $avatar.items.some(item => item.name === inventoryItems.crate.id)

    onMount(async () => {
        if(combatMode === 2) {
            showOptions = false
            postCombatHandler()
        }
	});

    const postCombatHandler = () => {
        changeIntroText("You make your way to the armory and grab one of the weapon crates.")
        avatar.changeStats([{type: "add item", value: inventoryItems.crate.id}])
    }

    const combatHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        setCombatMode(1)
    }

</script>

{#if showOptions}
    <div class="options-container">
        {#if $avatar.unlocks.armsdealer === 2 && !crate}
            <ScenarioOption 
                unlocked={true} 
                text="Retrieve a weapons cache from the armory." 
                eventHandler={() => combatHandler()} 
            />            
        {/if}
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
        margin-bottom: 3rem;
    }
</style>