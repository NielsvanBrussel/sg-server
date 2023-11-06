<script>
    import { activeScenario, avatar } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText
  
    let showOptions = true
    let options = 0

    $: shrooms = $avatar.items.some(item => item.name === inventoryItems.shroom.id)
    $: weed = $avatar.items.some(item => item.name === inventoryItems.weed.id)


    const initiationQuestHandler = () => {

        showOptions = false

        changeIntroText("You will have to prove your loyalty to Prophet Rudy first. As it happens one of our former associates has strayed off the path and has been talking to the FBI. Find him, release his soul and you will be welcomed in the warm embrace of the Prophet.")

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 1}}) 

        setTimeout(() => {
            showOptions = true
            options = 1 
        }, 2000);
    }

    const questInfoHandler = () => {

        changeIntroText("His location is unknown to us however we do have someone at the police station who is sympathic to our goals and might know where he is. This person might need some materialistic convincing.")
        showOptions = false
    }

    const finishQuestHandler = (value) => {

        showOptions = false

        if (value) {
            changeIntroText("Great work, you may now request an audience with the Prophet Rudy.")
        } else {
            changeIntroText("Well done my child, you are a true believer.")
        }

        avatar.changeStats([{type: 'experience', value: 1000}])


        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 4}}) 

        setTimeout(() => {
            showOptions = true
            options = 0 
        }, 2000);
    }

    const rudyHandler = () => {

        showOptions = false

        changeIntroText("A woman guides you to the a big empty backroom. A chubby bald man in his fifties is sitting in the middle of the room. He stands up and kisses you.")

        setTimeout(() => {
            showOptions = true
            options = 2
        }, 2000);
    }

    const sellHandler = (type) => {

        const price = type === "shrooms" ? 20 : 200
        const item = type === "shrooms" ? inventoryItems.shroom.id : inventoryItems.weed.id

        avatar.changeStats([{type: 'money', value: price}, {type: 'remove item', value: item }])
        changeIntroText(`You sell some ${type}.`)
    }

    const questHandler = () => {

        showOptions = false
        if ($avatar.unlocks.cult === 5) {
            changeIntroText("A follower of mine has been eyeballing one of my wives. I have sent him on a wild goose chase to the forest. Make sure he never returns.")
        } else {
            const rng = Math.random()
            if (rng > 0.8) {
                changeIntroText("A follower of mine has been eyeballing one of my wives. I have sent him on a wild goose chase to the forest. Make sure he never returns.")
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 5}}) 
            } else {
                changeIntroText("")
                
            }
        }

        setTimeout(() => {
            showOptions = true
        }, 3000);
    }


</script>

{#if showOptions}
    <div class="options-container">
        {#if options === 0}
            {#if $avatar.unlocks.cult === 0 || $avatar.unlocks.cult === 1}
                <ScenarioOption 
                    unlocked={true} 
                    text="I'd like to join and follow the words of the Prophet Rudy." 
                    eventHandler={() => initiationQuestHandler()} 
                />
            {/if}
            {#if $avatar.unlocks.cult === 3}
                <ScenarioOption 
                    unlocked={true} 
                    text="I dealt with the informant." 
                    eventHandler={() => finishQuestHandler(0)} 
                />
            {/if}
            {#if $avatar.unlocks.cult > 3}
                <ScenarioOption 
                    unlocked={true} 
                    text="Ask for an audience with Rudy." 
                    eventHandler={() => rudyHandler()} 
                />
            {/if}
            <ScenarioOption 
                unlocked={shrooms} 
                text="Sell some shrooms." 
                eventHandler={() => sellHandler("shroom")} 
            />
        {/if}
        {#if options === 1}
            <ScenarioOption 
                unlocked={true} 
                text="Where can I find this person?" 
                eventHandler={() => questInfoHandler()} 
            />
            <ScenarioOption 
                unlocked={true} 
                text="I'll start looking right away." 
                eventHandler={() => activeScenario.reset()} 
            />
        {/if}
        {#if options === 2}
            {#if $avatar.unlocks.cult === 6}
                <ScenarioOption 
                    unlocked={true} text="Nobody will be looking at your wives anymore." 
                    eventHandler={() => finishQuestHandler(1)} 
                />
            {:else}
                <ScenarioOption 
                    unlocked={true} text="Is there anything you need from me?" 
                    eventHandler={() => questHandler()} 
                />
            {/if}
        {/if}
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>