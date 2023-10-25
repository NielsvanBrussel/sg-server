<script>
  import { avatar, activeScenario } from "../../stores";
  import inventoryItems from "../../utility/inventoryItems";
  import ScenarioOption from "../core/ScenarioOption.svelte";
  import { onMount } from "svelte";
  import { locations_nomap } from "./index";

  export let setCombatMode
  export let combatMode
  export let changeIntroText 

  
  let showOptions = true
  let options = 0
  let scenario = locations_nomap[0]
  $: shrooms = $avatar.items.some(item => item.name === inventoryItems.shroom.id)
  $: key = $avatar.items.some(item => item.name === inventoryItems.key.id)

  onMount(async () => {
    if(combatMode === 2) {
        showOptions = false
        postCombatHandler()
    }
	});

  const postCombatHandler = () => {
      changeIntroText("A fat man in a suit who was watching the entire time approaches. He is a promoter for a big underground fighting arena and sees a lot of potential in you. He gives you a mysterious key and tells you to come find him at the circus on Wednesdays.")
      avatar.changeStats([{type: 'add item', value: inventoryItems.key.id}])
  }

 
  const dealHandler = () => {
    avatar.changeStats([{type: 'day', value: 1}])
    const rng = Math.random()
    if (rng > 0.7) {
      // outcome 1 - combat
      changeIntroText("Uh-oh. A manic hobo charges you!")
      setTimeout(() => {
        setCombatMode(1)
      }, 3000);
    } else {
      // outcome 2 - transaction
      changeIntroText("You sell some shrooms to a hobo. ")
      avatar.changeStats([{type: 'remove item', value: inventoryItems.shroom.id}, {type: 'money', value: 5}])
    }
    showOptions = false
  }


  const gateHandler = () => {
    showOptions = false
    options = 1
    changeIntroText("The gate is locked firmly. There's no way through unless you have the key.")
    setTimeout(() => {
      showOptions = true
    }, 3000);
  }

  const keyHandler = () => {
    showOptions = false
    changeIntroText("The key fits the lock. The gate opens and you enter the circus tent.")
    avatar.changeStats([{type: 'remove item', value: inventoryItems.key.id}])
    setTimeout(() => {
      activeScenario.set({
          name: scenario.name,
          component: scenario.component,
          introText: scenario.introText,
          enemies: scenario.enemies,
      }) 
    }, 3000);
  }
  

</script>


  {#if showOptions}
    {#if options === 0}
      <ScenarioOption 
        unlocked={shrooms} 
        text="Sell shrooms to the hobo's. (COMBAT?)" 
        eventHandler={() => dealHandler()}
      /> 
      <ScenarioOption 
        unlocked={true} 
        text="Approach the big gate." 
        eventHandler={() => gateHandler()}
      />             
    {:else if options === 1 && key}
        <ScenarioOption 
        unlocked={$avatar.day === 3} 
        text="Use the mysterious key to open the gate. (Wednesdays)" 
        eventHandler={() => keyHandler()}
      />    
    {/if}
  {/if}  

<style>

</style>