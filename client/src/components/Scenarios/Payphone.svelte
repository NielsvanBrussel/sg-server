<script>
  import { avatar } from "../../stores";
  import Keypad from "../core/Keypad.svelte";
  import ScenarioOption from "../core/ScenarioOption.svelte";

  export let changeIntroText

  let number = ""
  let error = false

  let showOptions = true
  let options = "0"

  // reset all values when scenario options reset

  $: if (options === "0") {
      number = ""
      changeIntroText("enter a number")
  }

  const enterNumber = () => {
    if (!number) {
      changeIntroText("enter a number")
    } else {
       changeIntroText(`Dialing ${number}...`) 
    }
    setTimeout(() => {
        // check if number equals any events
        if (number === "555-673-883") {
          // arms dealer
          changeIntroText("Who is this?")
          showOptions = false
          options = "1A"
          setTimeout(() => {
            showOptions = true
          }, 3000);
        } else if (number === "555-762-115") {
          // mister X
          changeIntroText("...")
          showOptions = false
          options = "2A"
          setTimeout(() => {
            showOptions = true
          }, 3000);
        } else if (number === "555-363-663") {
          // organ traffickers
          changeIntroText("Kingsbride Private Hospital, how may I help you?")
          showOptions = false
          options = "3A"
          setTimeout(() => {
            showOptions = true
          }, 3000);    
        } else {
          // no match
          changeIntroText("Number is not in service.")
          error = true
          setTimeout(() => {
            error = false
          }, 2000);
          number = ""
        }
    }, 5000);
  }


  const changeNumber = (value) => {
    number = value
  }

  const handler = () => {

  }

  const hospitalHandler = (value) => {
    showOptions = false
  
    if (value) {
      changeIntroText("Sure thing, forwarding you to Dr. Stricklands office now.")
      options = "3B"
      setTimeout(() => {
        changeIntroText("Dr. Strickland speaking.")
      }, 3000);
    } else {
      changeIntroText("I'm sorry but there is no doctor here by that name. Goodbye.")
      setTimeout(() => {
        options = "0"
      }, 3000);
    }
    setTimeout(() => {
      showOptions = true
    }, 3000);
  }



  const doctorHandler = (value) => {
    showOptions = false

    if (value) {
      changeIntroText("Come to the warehouse in Ramshaven Town, storage unit 13 on Thursday. Bring $12500 in cash and be sober.")
      avatar.set({...$avatar, unlocks: {...$avatar.unlocks, missingKidney: 2}})
      options = "99"
    } else {
      changeIntroText("Call has ended.")
      setTimeout(() => {
        options = "0"
      }, 3000);
    }
    setTimeout(() => {
      showOptions = true
    }, 3000);
  }

</script>

{#if showOptions}
  {#if options === "0"}
      <Keypad 
        error={error} 
        number={number} 
        changeNumber={changeNumber} 
        enterNumber={enterNumber}
      />
  {:else}
    {#if options === "1A"}
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => handler()}
          text="hello"
        />
    {:else if options === "1B"}
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => handler()}
          text="hello"
        />
    {:else if options === "1C"}
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => handler()}
          text="hello"
        />
    {:else if options === "2A"}
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => handler()}
          text="hello"
        />
    {:else if options === "2B"}
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => handler()}
          text="hello"
        />
    {:else if options === "2C"}
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => handler()}
          text="hello"
        />
    {:else if options === "3A"}
    
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => hospitalHandler(false)}
          text="Ask to speak to Dr. Jenkins."
        />
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => hospitalHandler(false)}
          text="Ask to speak to Dr. Williamson."
          />
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => hospitalHandler($avatar.unlocks.missingKidney)}
          text="Ask to speak to Dr. Strickland."
        />
      
    {:else if options === "3B"}
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => doctorHandler(false)}
          text="Threaten him and tell him to return your kidney."
        />
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => doctorHandler(true)}
          text="Lie and tell him you are looking for a new heart."
        />
        <ScenarioOption 
          unlocked={true}
          eventHandler={() => doctorHandler(false)}
          text="Offer him $5000 to get your kidney back."
        />
    {/if}
    <ScenarioOption 
      unlocked={true}
      eventHandler={() => options = "0"}
      text="Hang up"
    />
  {/if}
{/if}


<style>

</style>