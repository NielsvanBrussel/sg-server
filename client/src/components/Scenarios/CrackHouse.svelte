<script>
    import { avatar, activeScenario } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export  let setCombat
    export let changeIntroText 

    
    let showOptions = true
   
    const combatHandler = () => {
        avatar.changeStats([{type: 'day', value: 1}])
        setCombat(true)
    }





</script>


    {#if showOptions}              
        <ScenarioOption text="COMBAT: Look for their stash. (MEDIUM)" eventHandler={() => combatHandler()}/>
    {/if}  

<style>

</style>