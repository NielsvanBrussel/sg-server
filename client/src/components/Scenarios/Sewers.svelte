<script>
    import { avatar, activeScenario } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
  
    export  let setCombatMode
    export let changeIntroText 
  
    
    let showOptions = true
  
    const combatHandler = () => {
      avatar.changeStats([{type: 'day', value: 1}])
      setCombatMode(1)
    }
   
    const dealHandler = () => {
      avatar.changeStats([{type: 'add item', value: inventoryItems.shotgun.id}, {type: 'add item', value: inventoryItems.knife.id}, {type: 'add item', value: inventoryItems.knife_poisoned.id}, {type: 'add item', value: inventoryItems.nailgun.id}, {type: 'add item', value: inventoryItems.pistol.id}, {type: 'add item', value: inventoryItems.nail.id}, {type: 'add item', value: inventoryItems.chainsaw.id}, {type: 'add item', value: inventoryItems.oil.id}, {type: 'add item', value: inventoryItems.hammer.id}, {type: 'add item', value: inventoryItems.syringe_poisoned.id}, {type: 'add item', value: inventoryItems.rifle.id} ])
    }
  
  
  
  
  
  </script>
  
  
    {#if showOptions}   
       
            <ScenarioOption unlocked={true} text="COMBAT: enter the hobo arena. (MEDIUM)" eventHandler={() => combatHandler()}/>
           
       
        <ScenarioOption unlocked={true} text="get weapons" eventHandler={() => dealHandler()}/>
    {/if}  
  
  <style>
  
  </style>