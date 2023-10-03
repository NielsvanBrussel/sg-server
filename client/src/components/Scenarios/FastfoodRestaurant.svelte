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
            text="Order some food." 
            eventHandler={() => options = 1}
        />
        {#if $armoredCar.day === $avatar.day && $armoredCar.location === $map.name}
            <ScenarioOption 
                unlocked={true} 
                text="Attack the armored transport." 
                eventHandler={() => combatHandler()}
            />
        {/if}
    {:else}
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
            locked={false} 
            item={inventoryItems.burger_basic} 
            price={12} description="Basic burger. Heals for 12."
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={false} 
            item={inventoryItems.burger_super} 
            price={18} 
            description="That's more like it. Heals for 16."
        /> 
        <ShopItem 
            changeIntroText={changeIntroText} 
            locked={false} 
            item={inventoryItems.burger_mega} 
            price={25} 
            description="The absolute best. Heals for 20."
        />         
    {/if}
{/if}     

