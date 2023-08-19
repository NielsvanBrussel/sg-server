<script>
    import { avatar, activeScenario } from "../../stores";
    import AnimatedText from "../core/AnimatedText.svelte";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    let introText = 'You arrive at the park. The epicenter of nature and recreation in town. Trees, rocks, a duck pond and a playground. What would you like to do?'
    let showOptions = true

    const forageHandler = () => {
        let max = $avatar.stats.intellect
        if (max > 30)  {
            max = 30
        }
        const rng = Math.floor(Math.random() * 100) + max
        if (rng > 105) {
            console.log('adding truffle')
            avatar.changeStats([{ type: 'add item', value: 'truffle'}])
            introText = 'You found a truffle! Pigs love these things. Better hold on to these.'

        } else if (rng > 80) {
            console.log('adding mushroom')
            avatar.changeStats([{ type: 'add item', value: 'mushroom'}])
            introText = 'You found some weird looking mushrooms. Someone might be interested in these.'
        } else {
            console.log('adding poop')
            avatar.changeStats([{ type: 'add item', value: 'poop'}, {type: 'day', value: 1}])
            introText = 'You found some poop. You put it in your pocket. Might come in handy.'
        }
        showOptions = false
    }

</script>


<div class="container">
    <div class="header-container">
       <h3>The Park</h3> 
    </div>

    <div class="flexbox">
        <div class="intro-container">
            <AnimatedText text={introText} /> 
        </div>
        {#if showOptions}
            <div class="options-container">
                <ScenarioOption text="INT: Forage" eventHandler={() => forageHandler()}/>
            </div>           
        {/if}        
    </div>
</div>



<style>
    .header-container {
        height: 10rem;
        font-family: 'PS2P';
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        margin: 0 auto;
    }
    .flexbox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 2rem;
    }
    h3 {
        font-size: 1.25rem;
    }
    .intro-container, .options-container {
        width: 40%;
        text-align: left;
    }

</style>