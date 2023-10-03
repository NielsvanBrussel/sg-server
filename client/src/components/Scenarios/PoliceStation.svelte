<script>
    import { armoredCar, avatar } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from "svelte";

    export let changeIntroText
    export let combatMode
    export let setCombatMode
  
    let showOptions = true
    let options = 0

    $: truffle = $avatar.items.some(item => item.name === inventoryItems.truffle.id)

    onMount(async () => {
        if(combatMode === 2) {
            showOptions = false
            postCombatHandler()
        }
	});

    const postCombatHandler = () => {
        changeIntroText("You free the prison after you made your way to him by killing half the police station. He immediatly makes a run for it. Better do the same before more cops show up.")
        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, transportRobbery: 1}})
    }


    const cultQuestHandler = () => {

        showOptions = false

        changeIntroText("You find the corrupt cop and approach him somewhere secluded. He's asking what the information is worth to you.")

        setTimeout(() => {
            showOptions = true
            options = 1 
        }, 2000);
    }

    const cultQuestFollowupHandler = (value) => {

        showOptions = false

        changeIntroText(`The cop eagerly takes the ${value} and tells you the informant is beind held out of town at the Sundown Motel. He doesn't know what room though.`)

        if (value === "truffle") {
            avatar.changeStats([{type: "remove item", value: inventoryItems.truffle.id}])
        } else {
            avatar.changeStats([{type: "money", value: -500}])
        }

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 2}}) 
    }

    const combatHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        setCombatMode(1)
    }






</script>

{#if showOptions}
    <div class="options-container">
        {#if options === 0}
            {#if $avatar.unlocks.cult === 1}
                <ScenarioOption 
                    unlocked={true} 
                    text="Find the corrupt cop and ask him where the informant is being held." 
                    eventHandler={() => cultQuestHandler()} 
                />
            {/if}
            {#if $armoredCar.type === "prisoner" && $armoredCar.day === $avatar.day}
                <ScenarioOption 
                    unlocked={true} 
                    text="Ambush the prisoner transport." 
                    eventHandler={() => combatHandler()} 
                />
            {/if}
        {/if}
        {#if options === 1}
            <ScenarioOption 
                unlocked={truffle} 
                text="Give him a Truffle." 
                eventHandler={() => cultQuestFollowupHandler("truffle")} 
            />
            <ScenarioOption 
                unlocked={$avatar.money >= 500} 
                text="Give him $500." 
                eventHandler={() => cultQuestFollowupHandler("money")} 
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