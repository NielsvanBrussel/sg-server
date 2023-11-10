<script>
    import { activeScenario, avatar, map, playerPosition, steroidTreatment } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import Motel from "./Motel.svelte";
    import { onMount } from "svelte";

    export let changeIntroText
    export let setCombatMode
    export let combatMode

    let showOptions = true
    let options = 0

    $: organs = $avatar.items.some(item => item.name === inventoryItems.organs.id)
    $: token = $avatar.items.some(item => item.name === inventoryItems.token.id)


    
    onMount(async () => {
        if(combatMode === 2) {
            showOptions = false
            postCombatHandler()
        }
	});

    const postCombatHandler = () => {
        changeIntroText("Seems like they called the police, better get out of here with the syringes you have.")
        avatar.changeStats([{ type: 'add item', value: inventoryItems.syringe.id}, { type: 'add item', value: inventoryItems.syringe.id}, { type: 'add item', value: inventoryItems.syringe.id}, {type: 'day', value: 1}])
    }

    const healHandler = () => {

        // remove kidney on free healthcare
        if ($avatar.unlocks.insurance === 1 && !$avatar.unlocks.organTrade) {
            avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'day', value: 1}])
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, missingKidney: 1}})
            changeIntroText("You wake up naked in a motel room's bathtub. Everything is covered in blood, especially you. There's a huge scar on your abdomen and an empty feeling where your kidney used to be. You will now lose 5 hitpoints per day (unless you somehow manage to get your kidney back).")
            activeScenario.set({ name: 'Sundown Motel',
                enemies: null,
                component: Motel,
                introText: ""})
            map.select("map_2")
            playerPosition.set(-13557)
        } else {
            avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'day', value: 1}])
            changeIntroText("You wake up in a hospital bed feeling fully revitalised.")
        }

        showOptions = false
    }

    const kidneyHandler = () => {
        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, missingKidney: 0, organTrade: true}})
        changeIntroText("You find a doctor who patches you up again. He's also interested in the other box and says he will give you $500 for it and any other body parts you might find.")
        avatar.changeStats([{type: 'currentHitpoints', value: 100}, {type: 'remove item', value: inventoryItems.organs.id}, {type: 'day', value: 1}])
    }

    const organTradeHandler = () => {
        changeIntroText("You find the dodgey doctor and sell him some body parts.")
        avatar.changeStats([{type: 'remove item', value: inventoryItems.organs.id}, {type: 'money', value: 500}])
    }

    const stealHandler = () => {

        const rng = Math.random() + (0.02 * $avatar.stats.luck)
        showOptions = false 

        // 2 possible outcomes (combat & success)
        if(rng > 0.7) {
            // success
            changeIntroText("You wait until nobody is looking, grab a handful of syringes from the supply room and make a run for it.")
            avatar.changeStats([{ type: 'add item', value: inventoryItems.syringe.id}, { type: 'add item', value: inventoryItems.syringe.id}, {type: 'day', value: 1}])
        } else {
            // combat
            changeIntroText("A nurse catches you when you try to grab a box of syringes from the supply room. ")
            setTimeout(() => {
                setCombatMode(1)
            }, 3000);
        }
    }

    const vendingMachineHandler = () => {
        showOptions = false
        options = 1
        changeIntroText("You insert a token into the vending machine. What tonic would you like to buy?")
        setTimeout(() => {
            showOptions = true
        }, 3000);
    }

    const vendingMachineOptionHandler = (option) => {
        showOptions = false
        changeIntroText("The machine gives you a mysterious tonic. You drink it and immediately feel stronger.")
        avatar.changeStats([{type: 'remove item', value: inventoryItems.token.id}, {type: option, value: 1}])
        options = 0
        setTimeout(() => {
            showOptions = true
        }, 3000);
    }

    const scheduleHandler = () => {
        showOptions = false
        changeIntroText("You now have an appointment for a steroid treatment tomorrow.")
        steroidTreatment.set(1)
        setTimeout(() => {
            showOptions = true
        }, 3000);
    }

    const steroidTreatmentHandler = () => {
        showOptions = false
        changeIntroText("A doctor injected you with grade A steroids. You will feel stronger for a week.")
        avatar.set({...$avatar, buffs: {...$avatar.buffs, strengthBuff: 7}})
        steroidTreatment.set(0)
        avatar.changeStats([{type: 'day', value: 1}])
        setTimeout(() => {
            showOptions = true
        }, 3000);
    }


</script>

{#if showOptions}
    <div class="options-container">
        {#if options === 0} 
            <ScenarioOption 
                unlocked={$avatar.unlocks.insurance > 0 && $avatar.unlocks.missingKidney === 0} 
                text="Heal. (requires health insurance)" 
                eventHandler={() => healHandler()}
            />
            <ScenarioOption 
                unlocked={$avatar.unlocks.insurance > 1 && $steroidTreatment === 0} 
                text="Schedule a steroid treatment for the next day. (requires Premium or Platinum Health Plan)" 
                eventHandler={() => scheduleHandler()}
            />
            {#if $steroidTreatment === 2}
            <ScenarioOption 
                unlocked={true} 
                text="Go to your steroid treatment appointment." 
                eventHandler={() => steroidTreatmentHandler()}
            />
            {/if}
            {#if $avatar.unlocks.missingKidney === 2 && organs}
                <ScenarioOption 
                    unlocked={true} 
                    text='Find a doctor to put everything back.' 
                    eventHandler={() => kidneyHandler()} 
                />
            {/if}
            {#if $avatar.unlocks.organTrade}
                <ScenarioOption 
                    unlocked={organs} 
                    text='Sell some "meat" ($500).' 
                    eventHandler={() => organTradeHandler()} 
                />
            {/if}
            <ScenarioOption 
                unlocked={true} 
                text="LUCK/COMBAT: Steal some syringes from the supply room." 
                eventHandler={() => stealHandler()}
            />
            <ScenarioOption 
                unlocked={token} 
                text='Go to the mysterious vending machine and insert a token.' 
                eventHandler={() => vendingMachineHandler()} 
            />
        {:else if options === 1}
                <ScenarioOption 
                    unlocked={$avatar.stats.maxHitpoints < 20} 
                    text='Hitpoints' 
                    eventHandler={() => vendingMachineOptionHandler('maxHitpoints')} 
                />                
                <ScenarioOption 
                    unlocked={$avatar.stats.stamina < 20} 
                    text='Stamina' 
                    eventHandler={() => vendingMachineOptionHandler('stamina')} 
                />                
                <ScenarioOption 
                    unlocked={$avatar.stats.strength < 20} 
                    text='Strength' 
                    eventHandler={() => vendingMachineOptionHandler('strength')} 
                />                
                <ScenarioOption 
                    unlocked={$avatar.stats.intellect < 20} 
                    text='Intellect' 
                    eventHandler={() => vendingMachineOptionHandler('intellect')} 
                />                
                <ScenarioOption 
                    unlocked={$avatar.stats.luck < 20} 
                    text='Luck' 
                    eventHandler={() => vendingMachineOptionHandler('luck')} 
                />                
        {/if}
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
        margin: 1rem 0rem 3rem 0rem;
    }
</style>