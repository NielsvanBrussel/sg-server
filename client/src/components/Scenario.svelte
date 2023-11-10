<script>
    // default scenario container: title, avatar gif, text container, leave button

	import { activeScenario, avatar } from '../stores.js';
    import dwayne from '../assets/img/dwayne.gif'
	import rupert from '../assets/img/rupert.gif'
	import gareth from '../assets/img/gareth.gif'
    import Combat from './combat/Combat.svelte';
    import { onMount } from 'svelte';
    import AnimatedText from './core/AnimatedText.svelte';
    import TextButton from './core/TextButton.svelte';

    let combatMode = 0


    const setCombatMode = (value) => {
        combatMode = value
    }

    let introText

    const avatarGif = () => {
        switch ($avatar.name) {
            case 'King Dwayne':
                return dwayne
            case 'Loopy Rupert':
                return rupert
            case 'Greasy Gareth':
                return gareth
            default:
                return dwayne
        }
    }


    onMount(async () => {
        introText = $activeScenario.introText
	});

    
    const changeIntroText = (value) => {
        introText = value
    }

</script>


<div class="scenario-container">
    <div class="scenario-container-top flexbox">
        <div class="filler"></div>
        <div class="header-container">
            <h3>{$activeScenario.name}</h3> 
        </div>
    </div>
    <div class="scenario-container-bottom flexbox">
        {#if combatMode === 1}
            <Combat  setCombatMode={setCombatMode} enemies={$activeScenario.enemies}/>
        {:else}
            <div class="scenario-content-left">
                <div class="image-container img-bottom">
                    <img src={avatarGif()} alt="avatar" class="character-img">
                </div>
                <div class="button-container">
                    <TextButton text="leave" eventHandler={() => activeScenario.reset()}/>
                </div>
            </div>
            <div class="scenario-content-right">
                <div class="scenario-messagebox">
                    <div class="scenario-messagebox-outer content-box">
                        <div class="scenario-messagebox-inner">
                            <AnimatedText text={introText}/>
                        </div>
                    </div>
                </div>
                <div class="options-container-outer content-box">
                    <div class="options-container-inner">
                        <svelte:component this={$activeScenario.component} setCombatMode={setCombatMode} combatMode={combatMode} changeIntroText={changeIntroText}/> 
                    </div>
                </div>
            </div> 
        {/if}
    </div>
</div>



<style>

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    img {
        animation: forwards fade-in 3s;
    }

    .scenario-container{
        height: 100%;
        width: 100%;
    }
    .filler {
        width: 20rem;
        height: 11rem;
        
    }
    .header-container {
        font-family: 'PS2P';
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        width: calc(100% - 20rem);
        height: 11rem;
        overflow: hidden;
        border-left: solid #F51743 6px;
    }
    .scenario-container-top {
        border-bottom: solid #F51743 6px;
    }
    .scenario-container-bottom {
        width: 100%;
        height: calc(90vh - 11rem);
    }
    .flexbox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    h3 {
        font-size: 2rem;
        background: -webkit-linear-gradient(#F48C06, #87173E);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .scenario-content-left {
        width: 20rem;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }
    .image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: solid #F51743 6px;
        min-height: 20rem;
    }
    .character-img {
        width: 100%;
        display: block;
    }
    .button-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: calc(100% - 12px - 44vh);
    }
    .scenario-content-right {
        border-left: solid #F51743 6px;
        width: calc(100% - 20rem);
    }

    .scenario-messagebox {
        width: calc(100% - 2vh);
        padding-right: 2vh;
        border-bottom: solid #F51743 6px;
    }
    .scenario-messagebox-outer {
        height: 22vh;
        overflow: auto;
        width: 100%;
    }
    .options-container-outer {
        max-width: 100%;
        height: calc(100% - 6px - 20vh - 4vh);
        overflow: auto;
        margin: 2vh;
        width: calc(100% - 4vh);
    }
    .scenario-messagebox-inner {
        margin: 3vh;
        text-align: left;
        width: calc(100% - 6vh);
    }


    .options-container-inner {
        margin: 0vh 2vh;
        text-align: left;
        width: calc(100% - 4vh);
    }

    .content-box {
        scrollbar-color: #F51743 #F48C06;
		scrollbar-width: thin;
		scroll-padding: 2rem;
    }
    .content-box::-webkit-scrollbar {
		width: 0.6rem;
		background: transparent;
		border-radius: 2rem;
		margin-bottom: 0.5rem;  
  	}
	.content-box::-webkit-scrollbar-track {
		background-color: #F48C06 ;
		color: transparent;
		margin: 2rem 0rem 2rem 0rem;
		border-radius: 2rem;
	}
  	.content-box::-webkit-scrollbar-thumb {
		background: #F51743;
		border-radius: 2rem;
  	}

</style>