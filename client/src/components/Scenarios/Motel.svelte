<script>
    import { avatar, activeScenario } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import inventoryItems from "../../utility/inventoryItems";

    export let changeIntroText
    export let setCombat
    let showOptions = true

    const forageHandler = () => {



    }


</script>

{#if showOptions}
    <ScenarioOption text="hehe" eventHandler={() => forageHandler()}/>    
{/if}        


<style>

</style>