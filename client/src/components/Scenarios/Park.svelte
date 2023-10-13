<script>
    import { avatar } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from "svelte";

    export let changeIntroText
    export let setCombatMode
    export let combatMode

    let showOptions = true

    onMount(async () => {
    if(combatMode === 2) {
        showOptions = false
        postCombatHandler()
    }
	});

    const postCombatHandler = () => {
        changeIntroText("You dealt with the pervert but now it's getting dark. Looks like you wont be finding any four-leaf clovers today.")
    }

    const luckBuffHandler = () => {
        const rng = Math.random()
        showOptions = false
        if (rng > 0.5) {
            changeIntroText("You wander off the path when looking for the clover. An old man jumps out of the bushes and exposes himself to you.")
            avatar.changeStats([{type: 'day', value: 1}])
            setTimeout(() => {
                setCombatMode(1)
            }, 3000);     
        } else {
            changeIntroText("Just before it gets dark you finally find a four-leaf clover. You will feel luckier for a week.")
            avatar.set({...$avatar, buffs: {...$avatar.buffs, luckBuff: 7}})
            avatar.changeStats([{type: 'day', value: 1}])            
        }
    }

</script>

{#if showOptions}
    <div class="options-container">
        <ScenarioOption 
            unlocked={true} 
            text="LUCK: Look for a four-leaf clover." 
            eventHandler={() => luckBuffHandler()}
        />
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>