<script>
    import inventoryItems from "../../utility/inventoryItems";
    import ShopItem from "../core/ShopItem.svelte";

    export let changeIntroText
    let showOptions = true

</script>

{#if showOptions}
    <ShopItem changeIntroText={changeIntroText} locked={false} item={inventoryItems.lolly} price={4} description="Sweet but short. Heals for 8."/>
    <ShopItem changeIntroText={changeIntroText} locked={true} item={inventoryItems.burger_basic} price={12} description="Basic burger. Heals for 12."/>
    <ShopItem changeIntroText={changeIntroText} locked={true} item={inventoryItems.burger_super} price={18} description="That's more like it. Heals for 16."/> 
    <ShopItem changeIntroText={changeIntroText} locked={true} item={inventoryItems.burger_mega} price={25} description="The absolute best. Heals for 20."/>    
{/if}   