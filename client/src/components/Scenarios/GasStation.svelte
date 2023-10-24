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

    onMount(async () => {

        // runs after the player has gone through the full combat cycle
        if(combatMode === 2) {
            postCombatHandler()
        }

    });

    const postCombatHandler = () => {
       
        // reward
        if ($armoredCar.type === 'money') {
            avatar.changeStats([{type: 'money', value: 500}])
            changeIntroText("Robbery succesfull! You get away with $500.")
        } else {
            avatar.changeStats([{type: 'add item', value: inventoryItems.shotgun.id}, {type: 'add item', value: inventoryItems.pistol.id}, {type: 'add item', value: inventoryItems.rifle.id}])
            changeIntroText("Robbery succesfull! You get away with a bunch of weapons.")
        }

        // remove the event
        armoredCar.set({ day: null, location: "", type: "" })
        
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
            text="Go to the shop." 
            eventHandler={() => options = 1}
        />
        {#if $armoredCar.day === $avatar.day && $armoredCar.location === $map.name && $armoredCar.type !== "prisoner"}
            <ScenarioOption 
                unlocked={true} 
                text="Attack the armored transport." 
                eventHandler={() => combatHandler()}
            />
        {/if}
    {:else}
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.gas} 
            price={50} 
            locked={false} 
            description="Canister of gasoline"
        />     
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.oil} 
            price={50} 
            locked={false} 
            description="Can of basic motoroil"
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.antifreeze} 
            price={50} 
            locked={false} 
            description="Jug of antifreeze"
        />         
    {/if}
{/if}        
