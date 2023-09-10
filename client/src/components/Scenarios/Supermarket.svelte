<script>
    import inventoryItems from "../../utility/inventoryItems";
    import ShopItem from "../core/ShopItem.svelte";

    export let changeIntroText
    let showOptions = true

</script>

{#if showOptions}
    <ShopItem changeIntroText={changeIntroText} item={inventoryItems.nail} price={8} locked={false} description="Good for carpentry or used in the nailgun."/>
    <ShopItem changeIntroText={changeIntroText} item={inventoryItems.hammer} price={60} locked={false} description="Good for carpentry or caving skulls in."/>
    <ShopItem changeIntroText={changeIntroText} item={inventoryItems.knife} price={130} locked={true} description="General purpose combat knife."/> 
    <ShopItem changeIntroText={changeIntroText} item={inventoryItems.nailgun} price={500} locked={false} description="Shoots nails. Requires nails to work."/>
    <ShopItem changeIntroText={changeIntroText} item={inventoryItems.chainsaw} price={900} locked={true} description="Tears through anything. Requires motoroil to work."/>      
{/if}        
