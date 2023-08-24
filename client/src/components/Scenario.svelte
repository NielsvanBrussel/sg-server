<script>
	import { activeScenario } from '../stores.js';
  	import TextButton from './core/TextButton.svelte';
    import AnimatedText from './core/AnimatedText.svelte';
    import { onMount } from 'svelte';

    let introText

    onMount(async () => {
        introText = $activeScenario.introText
	});

	const leaveScenario = () => {
		activeScenario.set({
			name: "",
			component: null,
            introText: ""
        })
	}

    const changeIntroText = (value) => {
        introText = value
    }

</script>


<div class="scenario-container">
    <div class="container">
        <div class="header-container">
           <h3>{$activeScenario.name}</h3> 
        </div>
    
        <div class="flexbox">
            <div class="intro-container">
                <AnimatedText text={introText} /> 
            </div>
            <svelte:component this={$activeScenario.component} changeIntroText={changeIntroText}/>        
        </div>
    </div>
    
    <div class="button-container">
        <TextButton text='leave' eventHandler={() => leaveScenario()}/>
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
    .intro-container {
        width: 40%;
        text-align: left;
    }
</style>