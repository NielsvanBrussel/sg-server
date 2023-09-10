<script>
    import { avatar } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import inventoryItems from "../../utility/inventoryItems";

    export let changeIntroText
    let showOptions = true

    $: billyCount = $avatar.unlocks.billy % 2
    $: lolly = $avatar.items.some(item => item.name === inventoryItems.lolly_cocaine.id)
    $: cocaine = $avatar.items.some(item => item.name === inventoryItems.cocaine.id)


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

        changeIntroText('You give Billy some cocaine and another lolly to keep him motivated. Check back on him on friday.') 

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, billy: $avatar.unlocks.billy + 1}})
        showOptions = false
    }

    const collectHandler = () => {

        avatar.changeStats([{ type: 'money', value: 200}, {type: 'day', value: 1}])

        changeIntroText('Billy did good, he sold all the cocaine. You receive $200!') 

        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, billy: $avatar.unlocks.billy + 1}})
        showOptions = false
    }

    const stealHandler = () => {

        // TODO
        avatar.changeStats([{ type: 'add item', value: inventoryItems.cocaine.id}, { type: 'add item', value: inventoryItems.lolly_cocaine.id}, {type: 'day', value: 1}])

    }

</script>

{#if showOptions}
    <div class="options-container">
        {#if $avatar.day === 7 && $avatar.money >= 200}
            <ScenarioOption text="INTELLECT: Go to Sunday School." eventHandler={() => schoolHandler()}/>
        {/if}
        {#if $avatar.unlocks.billy > 2 && billyCount === 1 && $avatar.day === 1 && cocaine && lolly}
            <ScenarioOption text="Give Billy some cocaine to sell (and another lolly)." eventHandler={() => drugdealHandler()}/>
        {/if}
        {#if $avatar.unlocks.billy > 2 && billyCount === 0 && $avatar.day === 5}
            <ScenarioOption text="Collect from Billy." eventHandler={() => collectHandler()}/>
        {/if}
        {#if $avatar.unlocks.billy < 3 && $avatar.day !== 6 && $avatar.day !== 7 && lolly}
            <ScenarioOption text="Give Billy a special Lolly" eventHandler={() => lollyHandler()}/>
        {/if}
        <ScenarioOption text="LUCK/COMBAT: Steal school science lab equipment." eventHandler={() => stealHandler()}/>
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>