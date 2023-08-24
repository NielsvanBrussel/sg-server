<script>
    import { avatar } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText
    let showOptions = true

    const healHandler = () => {

        // on 4th heal remove kidney
        if ($avatar.unlocks.hospitalVisits === 3) {
            avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'day', value: 1}])
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, missingKidney: true, hospitalVisits: 4}})
            changeIntroText("You wake up half naked behind a dumpster. There's a huge scar on your abdomen and a empty feeling where your kidney used to be. You will now lose 5 hitpoints per day (unless you somehow get your kidney back).")
        } else {
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, hospitalVisits: $avatar.unlocks.hospitalVisits + 1}})
            avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'day', value: 1}])
            changeIntroText("You wake up in a hospital bed feeling fully revitalised.")
        }

        showOptions = false
    }

    const organTradeHandler = () => {
        
    }


</script>

{#if showOptions}
    <div class="options-container">
        {#if $avatar.unlocks.hospitalVisits < 4}
             <ScenarioOption text="Heal" eventHandler={() => healHandler()}/>
        {/if}
        {#if $avatar.unlocks.organTrade}
             <ScenarioOption text='Sell some "meat"' eventHandler={() => organTradeHandler()} />
        {/if}
    </div>           
{/if}        


<style>
    .options-container {
        width: 40%;
        text-align: left;
    }
</style>