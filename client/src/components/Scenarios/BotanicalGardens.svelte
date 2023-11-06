<script>
    import { activeScenario, avatar } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText

    let showOptions = true
    let options = 0

    $: turd = $avatar.items.some(item => item.name === inventoryItems.turd.id)
    $: seeds = $avatar.items.some(item => item.name === inventoryItems.seeds.id)


    const questHandler = () => {
        changeIntroText("One of my ex-employees stole a bag of seeds when they got fired. Could you go and retrieve them for me? The guy is quite alternative and should be living in the forest somewhere.")
        showOptions = false
        setTimeout(() => {
            showOptions = true
            options = 1 
        }, 2000);
    }

    const fertilizerHandler = () => {
        changeIntroText("You sell the man some animal feces.")
        avatar.changeStats([{type: 'remove item', value: inventoryItems.turd.id}, {type: 'money', value: 2}])
    }

    const seedHandler = () => {
        changeIntroText("Much appreciated! I dont have much money but as a reward feel free to use a small part of the garden for your own use.")
        avatar.changeStats([{type: 'remove item', value: inventoryItems.seeds.id}, {type: 'money', value: 20}, {type: 'day', value: 1}])
        if ($avatar.unlocks.growingWeed === 0) {
           avatar.set({...$avatar, unlocks: {...$avatar.unlocks, growingWeed: 1}}) 
        }
        options = 0
        showOptions = false
    }

    const plantHandler = () => {
        changeIntroText("You plant the seeds along with some makeshift fertilizer. Better check back on it in a few days.")
        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, growingWeed: 2}})
        avatar.changeStats([{type: 'remove item', value: inventoryItems.seeds.id}, {type: 'remove item', value: inventoryItems.turd.id}, {type: 'day', value: 1}])
    }

    const harvestHandler = () => {
        changeIntroText("Looks like the plant is fully grown. You harvest it entirely.")
        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, growingWeed: 1}})
        if (Math.random() > 0.5) {
            avatar.changeStats([{type: 'add item', value: inventoryItems.weed.id}, {type: 'add item', value: inventoryItems.weed.id}, {type: 'day', value: 1}])
        } else {
            avatar.changeStats([{type: 'add item', value: inventoryItems.weed.id}, {type: 'add item', value: inventoryItems.weed.id}, {type: 'add item', value: inventoryItems.weed.id}, {type: 'day', value: 1}])
        }
    }

</script>

{#if showOptions}
    <div class="options-container">
        {#if $avatar.day !== 1 && $avatar.day !== 2}
            {#if options === 0}
                <ScenarioOption 
                    unlocked={true} 
                    text="Ask for a quest." 
                    eventHandler={() => questHandler()}
                />
                <ScenarioOption 
                    unlocked={turd} 
                    text='Sell "fertilizer (2$).' 
                    eventHandler={() => fertilizerHandler()} 
                />
                {#if $avatar.unlocks.growingWeed === 1}
                    <ScenarioOption 
                        unlocked={turd && seeds} 
                        text='Plant mysterious seeds (takes seeds & turd).' 
                        eventHandler={() => plantHandler()} 
                    />
                {/if}
                {#if $avatar.unlocks.growingWeed > 7}
                    <ScenarioOption 
                        unlocked={true} 
                        text='Harvest plant.' 
                        eventHandler={() => harvestHandler()} 
                    />
                {/if}
            {/if}
            {#if options === 1}
                {#if seeds}
                    <ScenarioOption 
                        unlocked={true} 
                        text='I found the seeds. (hand over seeds)' 
                        eventHandler={() => seedHandler()} 
                    />
                {:else}
                    <ScenarioOption 
                        unlocked={true} 
                        text="I'll see what I can do." 
                        eventHandler={() => activeScenario.reset()} 
                    />
                {/if}  
            {/if}
        {:else}
            <div>Closed on Mondays and Tuesdays</div>
        {/if}
        
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>