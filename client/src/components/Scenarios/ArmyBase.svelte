<script>
    import { avatar } from "../../stores";
    import Combat from "../combat/Combat.svelte";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText
    export  let setCombatMode

    let showOptions = true

    const raidHandler = () => {

    }
  

</script>

{#if showOptions}
    <div class="options-container">
        <ScenarioOption text="COMBAT: Raid" eventHandler={() => setCombatMode(1)}/>
    </div>
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>