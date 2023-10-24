<script>
    import { avatar, achievements } from "../../stores";
    import achievementsData from "../../utility/achievements";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from "svelte";
  
    export let setCombatMode
    export let combatMode
    export let changeIntroText 
  
    
    let showOptions = true
    let options = 0

    const checkAchievement = () => {
		if (!$achievements.gladiator) {
			achievements.unlockAchievement(achievementsData.gladiator)
		}
	}
  
    onMount(async () => {
      if(combatMode === 2) {
          showOptions = false
          postCombatHandler()
      } else {
        changeIntroText("The loud cheering and chanting of a huge crowd welcomes you as you enter the tent. Hundreds of peoples eyes are all fixated at the center, where bloodied men are busy fighting eachother in a cage. You notice the fat man who gave you the key near the entrance. Once again he approaches you and asks if you are ready.")
      }
    });
  
    const postCombatHandler = () => {
        checkAchievement()
        changeIntroText("The crowd cheers for their new champion of the arena. You leave the cage and the fat man offers you a stack of cash.")
        options = 1
        setTimeout(() => {
           showOptions = true 
        }, 3000);
    }
  
  
    const combatHandler = () => {
      showOptions = false
      changeIntroText("The fat man guides you to the center of the arena and you step into the cage.")
      avatar.changeStats([{type: 'day', value: 1}])
      setTimeout(() => {
        setCombatMode(1)
      }, 3000);
    }
  
    const rewardHandler = (value) => {
      showOptions = false
      if (value === 0) {
        changeIntroText("You receive a tidy sum of $250. ")
        avatar.changeStats([{type: 'money', value: 250}])
      } else {
        changeIntroText("The man gives you a confused and slightly terrified look but eventually agrees. You receive some human body parts!")
        avatar.changeStats([{type: 'add item', value: inventoryItems.organs.id}])
      }
    }
    
  
  </script>
  
  
    {#if showOptions}
      {#if options === 0}
        <ScenarioOption 
          unlocked={true} 
          text="I'm ready." 
          eventHandler={() => combatHandler()}
        />             
      {:else if options === 1}
        <ScenarioOption 
            unlocked={true} 
            text="Take the reward." 
            eventHandler={() => rewardHandler(0)}
        />
        <ScenarioOption 
          unlocked={$avatar.unlocks.organTrade} 
          text="Tell him you rather have the corpses of your conquered foes as a trophy." 
          eventHandler={() => rewardHandler(1)}
        />    
      {/if}
    {/if}  
  
  <style>
  
  </style>