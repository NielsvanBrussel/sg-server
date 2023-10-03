<script>
  import { avatar, activeScenario } from "../../stores";
  import inventoryItems from "../../utility/inventoryItems";
  import ScenarioOption from "../core/ScenarioOption.svelte";
  import { onMount } from "svelte";

  export let setCombatMode
  export let combatMode
  export let changeIntroText 

  
  let showOptions = true

  $: shrooms = $avatar.items.some(item => item.name === inventoryItems.shroom.id)

  onMount(async () => {
    if(combatMode === 2) {
        showOptions = false
        postCombatHandler()
    }
	});

  const postCombatHandler = () => {
      changeIntroText("A fat man in a suit who was watching the entire time approaches. He is a promoter for a big underground fighting arena and sees a lot of potential in you. He gives you a mysterious key and tells you to come find him on wednesdays at the sewers.")
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
      changeIntroText("You sell some shrooms to the hobo's. ")
      avatar.changeStats([{type: 'remove item', value: inventoryItems.shroom.id}, {type: 'money', value: 5}])
    }
    showOptions = false
  }
  

</script>


  {#if showOptions}
    <ScenarioOption 
      unlocked={shrooms} 
      text="Sell shrooms to the hobo's. (COMBAT?)" 
      eventHandler={() => dealHandler()}
    />            
  {/if}  

<style>

</style>