<script>
    import { avatar, activeScenario, achievements } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from "svelte";
    import achievementsData from "../../utility/achievements";
  

    
    let showOptions = true
  
    const unlockAchievement = (value) => {
        achievements.unlockAchievement(value)
    }
    
  
  </script>
  
  
    <button on:click={() => unlockAchievement(achievementsData.firstTimePlaying)}>update achievement</button>
    <button on:click={() => unlockAchievement(achievementsData.billyTheKid)}>update achievement</button>
  
  <style>
  
  </style>