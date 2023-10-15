<script>
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import ShopItem from "../core/ShopItem.svelte";
    import { armoredCar, avatar, map } from "../../stores";
    import { onMount } from "svelte";

    export let changeIntroText
    export let combatMode
    export let setCombatMode

    let options = 0
    let showOptions = true

    $: deermeat = $avatar.items.some(item => item.name === inventoryItems.deermeat.id)
    $: wolfmeat = $avatar.items.some(item => item.name === inventoryItems.wolfmeat.id)
    $: bearmeat = $avatar.items.some(item => item.name === inventoryItems.bearmeat.id)

    $: wack = $avatar.unlocks.items.includes(inventoryItems.burger_basic.id)
    $: bigWack = $avatar.unlocks.items.includes(inventoryItems.burger_super.id)
    $: wackRoyale = $avatar.unlocks.items.includes(inventoryItems.burger_mega.id)

    onMount(async () => {
        if(combatMode === 2) {
            postCombatHandler()
        }
    });

    const postCombatHandler = () => {

        // reward
        if ($armoredCar.type === 'money') {
            avatar.changeStats([{type: 'money', value: 700}])
            changeIntroText("Robbery succesfull! You get away with $500.")
        } else {
            avatar.changeStats([{type: 'add item', value: inventoryItems.shotgun.id}, {type: 'add item', value: inventoryItems.pistol.id}, {type: 'add item', value: inventoryItems.rifle.id}])
            changeIntroText("Robbery succesfull! You get away with a bunch of weapons.")
        }

        // remove the event
        armoredCar.set({ day: null, location: "", type: "" })
        
    }

    const sellMeatHandler = (value) => {

        showOptions = false

        // sell the meat depending on type and check if its the first time selling it, unlocking the new burger type if so
        if (value === "deermeat") {
            avatar.changeStats([{type: 'money', value: 50}, {type: 'remove item', value: inventoryItems.deermeat.id}])
            if (wack) {
                changeIntroText("You sell some deer meat to the kitchen chef.")
            } else {
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, items: [...$avatar.unlocks.items, inventoryItems.burger_basic.id]}})
                changeIntroText("You sell some deer meat to the kitchen chef. The Wack burger has been added to the menu.")
            }
        } else if(value === "wolfmeat") {
            avatar.changeStats([{type: 'money', value: 80}, {type: 'remove item', value: inventoryItems.wolfmeat.id}])
            if (bigWack) {
                changeIntroText("You sell some wolf meat to the kitchen chef.")
            } else {
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, items: [...$avatar.unlocks.items, inventoryItems.burger_super.id]}})
                changeIntroText("You sell some wolf meat to the kitchen chef. The Big Wack has been added to the menu.")
            }
        } else {
            avatar.changeStats([{type: 'money', value: 110}, {type: 'remove item', value: inventoryItems.bearmeat.id}])
            if (wackRoyale) {
                changeIntroText("You sell some bear meat to the kitchen chef.")
            } else {
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, items: [...$avatar.unlocks.items, inventoryItems.burger_mega.id]}})
                changeIntroText("You sell some bear meat to the kitchen chef. The Wack Royale has been added to the menu.")
            }
            
        }

        setTimeout(() => {
            showOptions = true
        }, 3000);
        
    }

    const workHandler = () => {
        changeIntroText("We're not hiring at the moment. However we are in dire need of some meat. Bring us any meat you can find and we'll pay premium price.")
        options = 2
    }

    const combatHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        setCombatMode(1)
    }


</script>

{#if showOptions}
    {#if options === 0}
        <ScenarioOption 
            unlocked={true} 
            text="Order some food." 
            eventHandler={() => options = 1}
        />
        <ScenarioOption 
            unlocked={true} 
            text="Ask for work." 
            eventHandler={() => workHandler()}
        />
        {#if $armoredCar.day === $avatar.day && $armoredCar.location === $map.name}
            <ScenarioOption 
                unlocked={true} 
                text="Attack the armored transport." 
                eventHandler={() => combatHandler()}
            />
        {/if}
    {:else if options === 1}
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={false} 
            item={inventoryItems.lolly} 
            price={4} 
            description="Sweet but short. Heals for 7."
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={false} 
            item={inventoryItems.sprute} 
            price={6} 
            description="Wacky's signature soda. Heals for 8."
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={!wack} 
            item={inventoryItems.burger_basic} 
            price={12} description="Basic burger. Heals for 12."
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={!bigWack} 
            item={inventoryItems.burger_super} 
            price={18} 
            description="That's more like it. Heals for 16."
        /> 
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={!wackRoyale} 
            item={inventoryItems.burger_mega} 
            price={25} 
            description="The absolute best. Heals for 20."
        />
    {:else}
        <ScenarioOption 
            unlocked={deermeat} 
            text="Sell deer meat" 
            eventHandler={() => sellMeatHandler("deermeat")}
        />
        <ScenarioOption 
            unlocked={wolfmeat} 
            text="Sell wolf meat" 
            eventHandler={() => sellMeatHandler("wolfmeat")}
        />    
        <ScenarioOption 
            unlocked={bearmeat} 
            text="Sell bear meat" 
            eventHandler={() => sellMeatHandler("bearmeat")}
        />
        <ScenarioOption 
            unlocked={true} 
            text="back" 
            eventHandler={() => options = 0}
        />               
    {/if}
{/if}     

