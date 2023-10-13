<script>
    import { avatar, activeScenario, achievements } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    export let changeIntroText

    
    let showOptions = true
  
    const strengthBuffHandler = () => {

      let max = $avatar.stats.strength * 0.02
      if (max > 0.3)  {
          max = 0.3
      }

      const rng = Math.floor(Math.random()) + max
    
      showOptions = false

      avatar.changeStats([{type: 'day', value: 1}, {type: 'money', value: -20}])
      if (rng < 0.5) {
          changeIntroText("As you start your workout a stonger alpha male enters the gym and shoos you away. No workout for you today.")
      } else {
          changeIntroText("Got a nice pump from that. You will feel stronger for a week.")
          avatar.set({...$avatar, buffs: {...$avatar.buffs, strengthBuff: 7}})          
      }

    }
    
  
  </script>
  
  
  {#if showOptions}
    <div class="options-container">
      <ScenarioOption 
        unlocked={true} 
        text="STRENGTH: Go for a workout ($20)" 
        eventHandler={() => strengthBuffHandler()}
      />
    </div>           
  {/if}      
  
  <style>
  
  </style>