<script>
    import { avatar, activeScenario } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import ShopItem from "../core/ShopItem.svelte";
    import { onMount } from 'svelte';

    export let setCombatMode
    export let combatMode
    export let changeIntroText 

   
    let showOptions = true
    let options = 1

    $: crate = $avatar.items.some(item => item.name === inventoryItems.crate.id)
    $: flashbang = $avatar.unlocks.items.includes(inventoryItems.flashbang.id)
    $: knife = $avatar.unlocks.items.includes(inventoryItems.knife.id)
    $: discount = knife && flashbang ? 0.6 : !knife && !flashbang ? 1 : 0.8

   
    onMount(async () => {
        if(combatMode === 2) {
            postCombatHandler()
        }
    });


    const resupplyHandler = () => {

        showOptions = false

        // give a new quest if user has none, repeat the old if user does.

        if ($avatar.unlocks.armsdealer === 0) {
            const rng = Math.random()
            console.log(rng)
            if (rng > 0.5) {
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, armsdealer: 1}})
                changeIntroText("My stock is running low so I'm in dire need for some resupplies. Would you mind fetching me a weapons crate from the Police Station at Ramshaven Town?") 
            } else {
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, armsdealer: 2}})
                changeIntroText("My stock is running low so I'm in dire need for some resupplies. Would you mind fetching me a weapons crate from Fort Harper at Ramshaven Countryside?") 
            }   
        } else {
            if ($avatar.unlocks.armsdealer === 1) {
                changeIntroText("My stock is running low so I'm in dire need for some resupplies. Would you mind fetching me a weapons crate from the Police Station at Ramshaven Town?") 
            } else if ($avatar.unlocks.armsdealer === 2) {
                changeIntroText("My stock is running low so I'm in dire need for some resupplies. Would you mind fetching me a weapons crate from Fort Harper at Ramshaven Countryside?") 
            } 
        }

        setTimeout(() => {
            showOptions = true
        }, 3000);
    }


    const rewardHandler = () => {
        showOptions = false

        // check if user has unlocked the flashbang or knife
        if ($avatar.unlocks.armsdealer === 1 && !flashbang) {
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, items: [...$avatar.unlocks.items, inventoryItems.flashbang.id]}})
            changeIntroText("Greatly appreciated! I have added the flashbang and the shotgun to the shop and I will give you a permanent discount to my whole inventory.") 
        } else if ($avatar.unlocks.armsdealer === 2 && !knife) {
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, items: [...$avatar.unlocks.items, inventoryItems.knife.id]}})
            changeIntroText("Greatly appreciated! I have added the assault rifle and the combat knife to the shop and I will give you a permanent discount to my whole inventory.") 
        } else {
            avatar.changeStats([{type: 'money', value: 800}])
            changeIntroText("Excellent, thank you! (receive $800)") 
        }

        // remove the crate and reset the event
        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, armsdealer: 0}})
        avatar.changeStats([{type: 'remove item', value: inventoryItems.crate.id}])

        setTimeout(() => {
            showOptions = true
        }, 3000); 
    }

    const kidneyHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        changeIntroText("The storage unit you arrive at is made into a makeshift surgery room. The walls are taped with plastic and there is a large operating table in the middle. You recognise the doctor from the hospital. Unfortunately he also recognises you.")
        setTimeout(() => {
            setCombatMode(1)
        }, 3000);
    }

    const postCombatHandler = () => {
        changeIntroText("Between the corpses you find some boxes filled with organs. Surely your kidney is among them. Now you just have to find a trustworthy doctor to put everything back in place.")
        avatar.changeStats([{type: 'add item', value: inventoryItems.organs.id}, {type: 'add item', value: inventoryItems.organs.id}])
    }


</script>

{#if showOptions}
    {#if options === 1}
        {#if $avatar.unlocks.missingKidney === 2}
            <ScenarioOption 
                unlocked={$avatar.day === 4} 
                text="Go to storage unit 13 (Thursday)." 
                eventHandler={() => kidneyHandler()}
            />
        {/if}
        <ScenarioOption 
            unlocked={true} 
            text="go to arms dealer" 
            eventHandler={() => options = 2}
        />
    {:else if options === 2}
        <ScenarioOption 
            unlocked={true} 
            text="Do you have any work?" 
            eventHandler={() => resupplyHandler()}
        />
        {#if crate}
            <ScenarioOption 
                unlocked={true} 
                text="I got a weapons crate for you." 
                eventHandler={() => rewardHandler()}
            />
        {/if}
        <ScenarioOption 
            unlocked={true} 
            text="Can I see your inventory?" 
            eventHandler={() => options = 3}
        />
    {:else if options === 3}
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={false} 
            item={inventoryItems.pistol} 
            price={Math.floor(discount * 600)} 
            description="Standard issue Glock 17"
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={!flashbang} 
            item={inventoryItems.shotgun} 
            price={Math.floor(discount * 1000)} 
            description="Sawnoff Shotgun, short range, wide spray"
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={!knife} 
            item={inventoryItems.rifle} 
            price={Math.floor(discount * 1600)} 
            description="Military grade assault rifle, made for killing"
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={!flashbang} 
            item={inventoryItems.flashbang} 
            price={Math.floor(discount * 400)} 
            description="Stun Grenade, incapacitates the enemy for a short time"
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={!knife} 
            item={inventoryItems.knife} 
            price={Math.floor(discount * 700)} 
            description="Military grade melee weapon"
        />
    {/if}
{/if}




<style>

</style>