<script>
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import ShopItem from "../core/ShopItem.svelte";
    import { avatar } from "../../stores";

    export let changeIntroText
    let showOptions = true
    let options = 0


    const gunHandler = () => {
        showOptions = false
        changeIntroText('This is a hardware store, we dont sell guns. However I do have this phone number you can try, "555-673-883".')
        setTimeout(() => {
            showOptions = true
        }, 3000);
    }

</script>

{#if showOptions}

    {#if options === 0}
        <ScenarioOption unlocked={$avatar.level > 7} text="Do you have any guns for sale? (req. lvl 8)" eventHandler={() => gunHandler()}/>
        <ScenarioOption unlocked={true} text="Show me your wares." eventHandler={() => options = 1}/>
    {:else}
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.nail} 
            price={8} 
            locked={false} 
            description="Good for carpentry or used in the nailgun."
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.hammer} 
            price={60} 
            locked={false} 
            description="Good for carpentry or caving skulls in."
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.axe} 
            price={130} 
            locked={$avatar.level > 4} 
            description="Axe for woodcutting or chopping stuff up."
        /> 
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.nailgun} 
            price={500} 
            locked={$avatar.level > 3} 
            description="Shoots nails. Requires nails to work."
        />
        <ShopItem 
            changeIntroText={changeIntroText} 
            item={inventoryItems.chainsaw} 
            price={900} 
            locked={$avatar.level > 7} 
            description="Tears through anything. Requires gas to work."
        />      
    {/if}
{/if}        
