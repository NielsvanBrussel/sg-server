<script>
    import { avatar, activeScenario, achievements } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    export let changeIntroText

    
    let showOptions = true
    let options = 0
  
    const strengthBuffHandler = () => {

      let max = $avatar.stats.strength * 0.02
      if (max > 0.3)  {
          max = 0.3
      }

      const rng = Math.random() + max
    
      showOptions = false

      avatar.changeStats([{type: 'day', value: 1}, {type: 'money', value: -20}])
      if (rng < 0.5) {
          changeIntroText("As you start your workout a stonger alpha male enters the gym and shoos you away. No workout for you today.")
      } else {
          changeIntroText("Got a nice pump from that. You will feel stronger for a week.")
          avatar.set({...$avatar, buffs: {...$avatar.buffs, strengthBuff: 7}})          
      }

    }


    const insuranceInfoHandler = () => {
      showOptions = false
      options = 1
      changeIntroText("The bank insurance sales agent tells you that they offer 3 kinds of insurance: Free Health Plan, where you get basic hospital care, Premium Health Plan which gives extensive hospital care and Platinum Health Plan which gives both extensive hospital care and also life insurance (revival)")
      setTimeout(() => {
        showOptions = true
      }, 3000);
    }

    const healthplanHandler = (value) => {
      showOptions = false
      avatar.set({...$avatar, unlocks: {...$avatar.unlocks, insurance: value}})
      const insuranceString = value === 1 ? "Free Health Plan" : value === 2 ? "Premium Health Plan" : "Platinum Health Plan"
      changeIntroText(`Thank you for picking the ${insuranceString}!`)
      options === 0
      setTimeout(() => {
        showOptions = true
      }, 3000);  
    }

    const bankRobberyHandler = () => {
      
    }

    const skipdayHandler = () => {
      avatar.changeStats([{type: 'day', value: 1}])
    }

    const recoverKidneyHandler = () => {
      showOptions = false
      changeIntroText("The salesman swears he has nothing to do with your missing kidney and says he only talked to the doctor on the phone. He says his name is Dr. Strickland and gives you his number: 555-363-663.")
    }
    
  
  </script>
  
  
  {#if showOptions}
  {#if options === 0}
    <ScenarioOption 
      unlocked={true} 
      text="Inquire about an insurance plan." 
      eventHandler={() => insuranceInfoHandler()}
    />
    {#if $avatar.unlocks.bankRobbery === 1}
      <ScenarioOption 
        unlocked={true} 
        text="Initiate bank robbery." 
        eventHandler={() => bankRobberyHandler()}
      />
    {/if}
    {#if $avatar.unlocks.missingKidney > 0}
      <ScenarioOption 
        unlocked={true} 
        text="Threaten the insurance agent to tell him who took your kidney." 
        eventHandler={() => recoverKidneyHandler()}
      /> 
    {/if}
  {:else if options === 1}
    <ScenarioOption 
      unlocked={true} 
      text="Get the free Health Plan (0$/week)." 
      eventHandler={() => healthplanHandler(1)}
    />
    <ScenarioOption 
      unlocked={true} 
      text="Get the Premium Health Plan (50$/week)." 
      eventHandler={() => healthplanHandler(2)}
    />
    <ScenarioOption 
      unlocked={true} 
      text="Get the Platinum Health Plan (150$/week)." 
      eventHandler={() => healthplanHandler(3)}
    />
    <ScenarioOption 
      unlocked={true} 
      text="Go back." 
      eventHandler={() => options = 0}
    />
    
  {/if}
    <div class="options-container">
      <ScenarioOption 
        unlocked={true} 
        text="STRENGTH: Go for a workout ($20)" 
        eventHandler={() => skipdayHandler()}
      />
    </div>           
  {/if}      
  
  <style>
  
  </style>