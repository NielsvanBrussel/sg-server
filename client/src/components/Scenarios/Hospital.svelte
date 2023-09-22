<script>
    import { activeScenario, avatar, map, playerPosition } from "../../stores";
  import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import Motel from "./Motel.svelte";

    export let changeIntroText
    export let setCombatMode
    let showOptions = true

    $: organs = $avatar.items.some(item => item.name === inventoryItems.organs.id)

    const healHandler = () => {

        // on 4th heal remove kidney
        if ($avatar.unlocks.hospitalVisits === 3) {
            avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'day', value: 1}])
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, missingKidney: true, hospitalVisits: 4}})
            changeIntroText("You wake up naked in a motel room's bathtub. Everything is covered in blood, especially you. There's a huge scar on your abdomen and an empty feeling where your kidney used to be. You will now lose 5 hitpoints per day (unless you somehow manage to get your kidney back).")
            activeScenario.set({ name: 'Sundown Motel',
                enemies: null,
                component: Motel,
                introText: ""})
            map.select("map_2")
            playerPosition.set(-135575)
        } else {
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, hospitalVisits: $avatar.unlocks.hospitalVisits + 1}})
            avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'day', value: 1}])
            changeIntroText("You wake up in a hospital bed feeling fully revitalised.")
        }

        showOptions = false
    }

    const kidneyHandler = () => {
        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, missingKidney: false, organTrade: true}})
        changeIntroText("You find a doctor who patches you up again. He's also interested in the other box and says he will give you $50 for it and any other body parts you might find.")
        avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'remove item', value: inventoryItems.organs.id}, {type: 'day', value: 1}])
    }

    const organTradeHandler = () => {
        changeIntroText("You find the dodgey doctor and sell him some body parts.")
        avatar.changeStats([{type: 'remove item', value: inventoryItems.organs.id}, {type: 'money', value: 50}])
    }


</script>

{#if showOptions}
    <div class="options-container">
        {#if $avatar.unlocks.hospitalVisits < 4}
             <ScenarioOption text="Heal" eventHandler={() => healHandler()}/>
        {/if}
        {#if $avatar.unlocks.missingKidney && organs}
            <ScenarioOption text='Find a doctor to put everything back.' eventHandler={() => kidneyHandler()} />
        {/if}
        {#if $avatar.unlocks.organTrade && organs}
             <ScenarioOption text='Sell some "meat" ($50)' eventHandler={() => organTradeHandler()} />
        {/if}
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>