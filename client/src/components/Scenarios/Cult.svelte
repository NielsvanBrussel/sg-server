<script>
    import { activeScenario, avatar } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText
  
    let showOptions = true
    let options = 0


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

    const finishQuestHandler = () => {

        showOptions = false

        changeIntroText("Great work, you may now request an audience with the Prophet Rudy.")

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 4}}) 

        setTimeout(() => {
            showOptions = true
            options = 1 
        }, 2000);
    }

    const rudyHandler = () => {

        showOptions = false

        changeIntroText("A woman guides you to the a big empty backroom. A chubby bald man in his fifties is sitting in the middle of the room.He stands up and kisses you.")

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

    }





</script>

{#if showOptions}
    <div class="options-container">
      
            {#if options === 0}
                {#if $avatar.unlocks.cult === 0 || $avatar.unlocks.cult === 1}
                    <ScenarioOption text="I'd like to join and follow the words of the Prophet Rudy." eventHandler={() => initiationQuestHandler()} />
                {/if}
                {#if $avatar.unlocks.cult === 3}
                    <ScenarioOption text="I dealt with the informant." eventHandler={() => finishQuestHandler()} />
                {/if}
                {#if $avatar.unlocks.cult === 4}
                    <ScenarioOption text="Go talk to Rudy." eventHandler={() => rudyHandler()} />
                {/if}
                <ScenarioOption text="Sell some shrooms." eventHandler={() => sellHandler("shroom")} />
            {/if}
            {#if options === 1}
                <ScenarioOption text="Where can I find this person?" eventHandler={() => questInfoHandler()} />
                <ScenarioOption text="I'll start looking right away." eventHandler={() => activeScenario.reset()} />
            {/if}
            {#if options === 2}
                <ScenarioOption text="Is there anything you need from me?" eventHandler={() => questHandler()} />
                <ScenarioOption text="Sell Rudy some weed." eventHandler={() => sellHandler("weed")} />
            {/if}
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>