<script>
  import { avatar } from "../stores";
  import inventoryItems from "../utility/inventoryItems";
  import TextButton from "./core/TextButton.svelte";

  export let toggleMessage

  let showLevel = false

  setTimeout(() => {
    showLevel = true
    avatar.changeStats([{type: 'add item', value: inventoryItems.token.id}])
  }, 2200);
  
</script>


<div class="message-container-outer">
    

    <div class="message-container-inner">
        <div class="scroll-container">
            <h1>Level up!</h1>
            <h3>You are now level</h3>
            <div class="level-container">
                {#if showLevel}
                    <h1 class="new level-header">{$avatar.level}</h1>
                {:else}
                    <h1 class="old level-header">{$avatar.level - 1}</h1>
                {/if}
            </div>
            <div class="reward-container">
                <h3>You receive</h3>
                <div class="container">
                    <img class="item-img" src={inventoryItems.token.img} alt="item" title={inventoryItems.token.name}>
                </div>
                <h5>Spend this at the vending machine at the Hospital to level up one of your attributes</h5>
                <div class="button-container">
                    <TextButton text="close" eventHandler={() => toggleMessage()} />
                </div>            
            </div>
        </div>
    </div>
</div>


<style>

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fade-out{
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .message-container-outer {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 11;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .message-container-inner {
        background-image: linear-gradient(to bottom right, #19173D, #87173E);
        border: #F48C06 5px solid;
        width: 45%;
        height: 80%;
        margin: auto;
        padding: 0rem 1rem;
        border-radius: 2rem;
        
    }
    .scroll-container {
        height: 100%;
        width: 100%;
        margin: 0rem 0rem;
        overflow: auto;
        scrollbar-color: #F51743 #F48C06;
		scrollbar-width: thin;
		scroll-padding: 2rem;
    }
    h1 {
        font-family: 'Bungee-Spice';
    }

    .level-header {
        font-size: 6rem;
    }

    .button-container {
        margin: 1rem 0rem;
    }

    .old {
        animation: fade-out forwards 2s;
    }

    .new {
        animation: fade-in forwards 2s;
    }

    .level-container {
        margin: 2rem;
        height: 7rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .reward-container {
        opacity: 0;
        animation: fade-in forwards 2s;
    }

    img {
        height: 6rem;
        box-shadow: 3px 3px 2px 2px black;
    }


    .scroll-container::-webkit-scrollbar {
		width: 0.6rem;
		background: transparent;
		border-radius: 2rem;
		margin-bottom: 0.5rem;  
  	}
	.scroll-container::-webkit-scrollbar-track {
		background-color: #F48C06 ;
		color: transparent;
		margin: 2rem 0rem 6rem 0rem;
		border-radius: 2rem;
	}
  	.scroll-container::-webkit-scrollbar-thumb {
		background: #F51743;
		border-radius: 2rem;
  	}
</style>