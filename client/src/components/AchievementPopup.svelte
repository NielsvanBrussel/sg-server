<script>
    import { avatar, activeScenario, achievementPopup } from '../stores.js';
    import starIcon from '../assets/img/star.png'

    let showAchievement = false
    let init = true


    const flashAchievement = () => {
        if (!init) {
            showAchievement = true
            setTimeout(() => {
                showAchievement = false
            }, 8000);            
        } else {
            init = false
        }
    }

    $: $achievementPopup, flashAchievement()
</script>

{#if showAchievement}
    <div class="achievement-container-outer">
        <div class="achievement-container-inner">
            <div class="image-container">
                <img src={starIcon} alt="star" class="character-img">
            </div>
            <div class="text-container">
                <h2 class="achievement-title">{$achievementPopup.title}</h2>
                <h5 class="achievement-description">{$achievementPopup.description}</h5>
            </div>
        </div>
    </div>    
{/if}



<style>

    @keyframes expand {
        0%   {max-width: 0;}
        100% {max-width: 40rem;}
    }

    @keyframes shrink {
        0%   {max-width: 40rem;}
        100% {max-width: 0;
        display: none;}
    }

    .achievement-container-outer {
        position: absolute;
        top: 1rem;
        right: 3vw;
        background-image: linear-gradient(to bottom right, #19173D, #87173E);
        padding: 1rem;
        border: #F48C06 solid 3px;
        border-radius: 1rem;
        color: #F48C06;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-height: 5rem;
        animation-name: expand, shrink;
        animation-fill-mode: forwards;
        animation-duration: 1.5s;
        animation-delay: 0s, 6s;
        animation-timing-function: ease-in;
        overflow: hidden;
        z-index: 9;
    }
    .achievement-container-inner {
        display: flex;
        flex-direction: row;
        justify-content: left;
        gap: 2vw;
    }
    .achievement-title {
        font-family: 'Bungee-Spice';
    }
    .text-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5rem;
    }
    h2, h5 {
        padding: 0;
        margin: 0;
        white-space: nowrap;
    }
</style>