<script>
    import { activeScenario, avatar, cultDrugs } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText
  
    let showOptions = true
    let options = 0

    $: mushrooms = $avatar.items.find(item => item.name === inventoryItems.shroom.id)
    $: weed = $avatar.items.find(item => item.name === inventoryItems.weed.id)
    $: amphetamines = $avatar.items.find(item => item.name === inventoryItems.pills.id)
    $: cocaine = $avatar.items.find(item => item.name === inventoryItems.cocaine.id)

    $: hasQuestItems = $cultDrugs.value
        && (weed?.amount >= $cultDrugs.drugs?.weed || !$cultDrugs.drugs?.weed)
        && (cocaine?.amount >= $cultDrugs.drugs?.cocaine || !$cultDrugs.drugs?.cocaine)
        && (mushrooms?.amount >= $cultDrugs.drugs?.mushrooms || !$cultDrugs.drugs?.mushrooms)
        && (amphetamines?.amount >= $cultDrugs.drugs?.amphetamines || !$cultDrugs.drugs?.amphetamines)


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

    const sellHandler = () => {

        showOptions = false

        const getID = (value) => {
            switch (value) {
                case 'mushrooms':
                    return inventoryItems.shroom.id
                case 'weed':
                    return inventoryItems.weed.id
                case 'amphetamines':
                    return inventoryItems.pills.id
                case 'cocaine':
                    return inventoryItems.cocaine.id                       
                default:
                    return null;
            }
        }

        // remove all the items that were required

        for (const [key, value] of Object.entries($cultDrugs.drugs)) {
            if (value) {
                const id = getID(key)
                for (let i = 0; i < value; i++) {
                    avatar.changeStats([{type: 'remove item', value: id}])
                }
            }
        }

        avatar.changeStats([{type: 'money', value: $cultDrugs.value}])
        cultDrugs.set({drugs: null, value: null, text: ""})
        changeIntroText(`You sell Rudy a bunch of drugs.`)

        setTimeout(() => {
            showOptions = true
        }, 3000);
    }


    const distribute = (length, value) => {

        if (length <= 1)
            return [value];
        var half = Math.floor(length / 2),
            dist = Math.floor(Math.random() * value)
        return distribute(half, dist).concat(distribute(length-half, value-dist))
        
    }

    const generateQuest = () => {


        // create random amounts for each with a maximum of 6
        const amounts = distribute(4, 6)
        const drugs = {
            mushrooms: amounts[0],
            weed: amounts[1],
            amphetamines: amounts[2],
            cocaine: amounts[3],
        }
   

        // calculate reward money
        const value = amounts[0] * 50 + amounts[1] * 120 + amounts[2] * 100 + amounts[3] * 200

        // generate the string for the quest
        let text = ""

        for (const [key, value] of Object.entries(drugs)) {
            if (value) {
                if (text) {
                    text = text.concat(`, ${key}: ${value}`)
                } else {
                    text = text.concat(`${key}: ${value}`)
                }
            }
        }

        cultDrugs.set({drugs: drugs, value: value, text: text})

        return text
    }


    const questHandler = () => {

        showOptions = false
        if ($avatar.unlocks.cult === 5) {
            changeIntroText("A follower of mine has been eyeballing one of my wives. I have sent him on a wild goose chase to the forest. Make sure he never returns.")
        } else if ($cultDrugs.value) {
            changeIntroText(`I'm planning on taking another spiritual journey soon and I could use some stimulants. Here's a list: ${$cultDrugs.text}.`)
        } else {
            const rng = Math.random()
            if (rng > 0.8) {
                changeIntroText("A follower of mine has been eyeballing one of my wives. I have sent him on a wild goose chase to the forest. Make sure he never returns.")
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 5}}) 
            } else {
                const text = generateQuest()
                changeIntroText(`I'm planning on taking another spiritual journey soon and I could use some stimulants. Here's a list: ${text}.`)
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
                <ScenarioOption 
                    unlocked={true} 
                    text="generate quest" 
                    eventHandler={() => questHandler()} 
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
            {#if $cultDrugs.value}
                <ScenarioOption 
                    unlocked={hasQuestItems} 
                    text="I got your drugs." 
                    eventHandler={() => sellHandler()} 
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