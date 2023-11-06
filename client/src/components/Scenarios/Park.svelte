<script>
    import { avatar, activeScenario } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from "svelte";
    import { enemies } from "../combat/enemies";
    import inventoryItems from "../../utility/inventoryItems";

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
        if ($activeScenario.enemies[0].name === "Weird Naked Pervert") {
            changeIntroText("You dealt with the pervert but now it's getting dark. Looks like you wont be finding any four-leaf clovers today.")            
        } else {
            changeIntroText("That was one tough granny. When you grab her purse you find some cocaine and $1000")
            avatar.changeStats([{ type: 'money', value: 1000 }, { type: 'add item', value: inventoryItems.cocaine.id }]) 
        }
    }

    const luckBuffHandler = () => {
        const rng = Math.random()
        showOptions = false
        avatar.changeStats([{type: 'day', value: 1}])  
        if (rng > 0.5) {
            changeIntroText("You wander off the path when looking for the clover. An old man jumps out of the bushes and exposes himself to you.")
            setTimeout(() => {
                setCombatMode(1)
            }, 3000);     
        } else {
            changeIntroText("Just before it gets dark you finally find a four-leaf clover. You will feel luckier for a week.")
            avatar.set({...$avatar, buffs: {...$avatar.buffs, luckBuff: 7}})            
        }
    }

    const mugHandler = () => {
        showOptions = false
        let max = $avatar.stats.strength * 0.02
        if (max > 0.3)  {
            max = 0.3
        }
                                    
        const rng = Math.random() + max
        avatar.changeStats([{type: 'day', value: 1}])

        changeIntroText("You wait in the bushes until an easy target walks by...")

        setTimeout(() => {
            if (rng > 0.5) {
                changeIntroText("Mug attempt succesful! You jump out as an old lady passes by and snatch her purse. You find $20 inside!")
                avatar.changeStats([{type: 'money', value: 20}])
            } else {
                activeScenario.set({...$activeScenario, enemies: enemies.grandma})
                changeIntroText("Your attempt to mug an old lady failed. You try to snatch her purse but she holds on tight. Seems like a pretty strong lady and she's about to set you straight...")
                setTimeout(() => {
                    setCombatMode(1)
                }, 5000);  
            }
        }, 5000);            
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
    <div class="options-container">
        <ScenarioOption 
            unlocked={true} 
            text="STRENGTH: Mug. (COMBAT?)" 
            eventHandler={() => mugHandler()}
        />
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>