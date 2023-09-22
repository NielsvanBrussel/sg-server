<script>
    import { avatar } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import inventoryItems from "../../utility/inventoryItems";
    import { onMount } from "svelte";

    export let changeIntroText
    export let setCombatMode
    export let combatMode

    let showOptions = true

    $: lolly = $avatar.items.some(item => item.name === inventoryItems.lolly_cocaine.id)
    $: cocaine = $avatar.items.some(item => item.name === inventoryItems.cocaine.id)


    onMount(async () => {
        if(combatMode === 2) {
            showOptions = false
            postCombatHandler()
        }
	});


    const postCombatHandler = () => {
        changeIntroText("You handled the guards but in the distance you hear police sirens coming closer. You'll have to come back for the equipment another time.")
        showOptions = false
    }


    const schoolHandler = () => {

        avatar.changeStats([{ type: 'intellect', value: 1}, {type: 'money', value: -200}, {type: 'day', value: 1}])

        changeIntroText('You sign up for one of the courses. You feel slightly smarter afterwards.')
        showOptions = false

    }

    const lollyHandler = () => {

        avatar.changeStats([{ type: 'remove item', value: inventoryItems.lolly_cocaine.id}, {type: 'day', value: 1}])

        if ($avatar.unlocks.billy === 2) {
            changeIntroText('You give Billy another lolly. He eagerly takes it out of your hands. Billy will now do anything for a lolly. Come back on mondays with some cocaine...') 
        } else {
            changeIntroText('You give Billy a special treat. He seems to enjoy it a lot.')
        }

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, billy: $avatar.unlocks.billy + 1}})
        showOptions = false
        
    }

    const drugdealHandler = () => {

        avatar.changeStats([{ type: 'remove item', value: inventoryItems.lolly_cocaine.id}, { type: 'remove item', value: inventoryItems.cocaine}, {type: 'day', value: 1}])

        changeIntroText('You give Billy some cocaine and another lolly to keep him motivated. Check back on him in a couple of days.') 

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, billy: 4}})
        showOptions = false
    }

    const collectHandler = () => {

        avatar.changeStats([{ type: 'money', value: 200}, {type: 'day', value: 1}])

        changeIntroText('Billy did good, he sold all the cocaine. You receive $200!') 

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, billy: 3}})
        showOptions = false
    }

    const stealHandler = () => {

        const rng = Math.random() + (0.01 * $avatar.stats.luck)
        avatar.changeStats([{type: 'day', value: 1}])

        // 2 possible outcomes (combat & success)
        if(rng > 0.7) {
            // success
            changeIntroText("You wait until nightime and break into the school. There's no sign of any security so you grab all the equipment you can use and make a run for it.")
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, methLab: 2}})
            showOptions = false 
        } else {
            // combat
            changeIntroText("You wait until nightime and break into the school. You trip the alarm and two guards come running...")
            setTimeout(() => {
                setCombatMode(1)
            }, 3000);
        }

        // TODO
        avatar.changeStats([{ type: 'add item', value: inventoryItems.cocaine.id}, { type: 'add item', value: inventoryItems.lolly_cocaine.id}, {type: 'day', value: 1}])

    }

</script>

{#if showOptions}
    <div class="options-container">
        {#if $avatar.day === 7 && $avatar.money >= 200}
            <ScenarioOption text="INTELLECT: Go to Sunday School." eventHandler={() => schoolHandler()}/>
        {/if}
        {#if $avatar.day !== 6 && $avatar.day !== 7}
            {#if $avatar.unlocks.billy === 3 && cocaine && lolly}
                <ScenarioOption text="Give Billy some cocaine to sell (and another lolly)." eventHandler={() => drugdealHandler()}/>
            {/if}
            {#if $avatar.unlocks.billy > 8}
                <ScenarioOption text="Collect from Billy." eventHandler={() => collectHandler()}/>
            {/if}
            {#if $avatar.unlocks.billy < 3 && lolly}
                <ScenarioOption text="Give Billy a special Lolly" eventHandler={() => lollyHandler()}/>
            {/if}
        {/if}
        {#if $avatar.unlocks.methLab === 1}
            <ScenarioOption text="LUCK/COMBAT: Steal school science lab equipment." eventHandler={() => stealHandler()}/>
        {/if}
        
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>