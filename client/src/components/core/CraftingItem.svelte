<script>
    import { avatar, achievements } from "../../stores";
  import achievementsData from "../../utility/achievements";
    import inventoryItems from "../../utility/inventoryItems";
    export let item
    export let description
    export let ingredients
    export let changeIntroText
    export let locked


    let craftable = true


    const checkAchievement = () => {
		if (!$achievements.cook) {
			achievements.unlockAchievement(achievementsData.cook)
		}
	}
 

    const craftItem = () => {
        for (let i = 0; i < ingredients.length; i++) {
            avatar.changeStats([{ type: 'remove item', value: ingredients[i].id}])
        }
        if (item.name === inventoryItems.cocaine || item.name === inventoryItems.pills) {
            checkAchievement()
        }
        avatar.changeStats([{ type: 'add item', value: item.id}])
        changeIntroText(`You craft ${item.name}.`)
    }

    const checkIngredient = () => {
        for (let i = 0; i < ingredients.length; i++) {
            const available = $avatar.items.some(item => item.name === ingredients[i].id)
            if (!available && craftable) {
                craftable = false
            }
            ingredients[i] = {...ingredients[i], available: available}
        }
    }

    checkIngredient()


</script>


<div class="flexbox shopitem-container">
    <div class="img-container flexbox">
        <img class="item-img" src={item.img} alt={`${item.name}`} title={`${item.name}`}>  
    </div>
    <div class="text-container">
        {#if locked}
            <div class="flexbox header">
                <h3>{item.name}</h3>
                <div class="button-container">
                    <button class="inactive-button-nav">craft</button>
                </div>
                <h3 class="locked-text">locked</h3>    
            </div>
            <p>{description}</p>       
            <div class="ingredient-container flexbox">
                <h4>requires:</h4>
                {#each ingredients as ingredient, i}
                    <div class="img-container flexbox">
                        <img class="ingredient-img" src={ingredient.img} alt={`${ingredient.name}`} title={`${ingredient.name}`}>  
                    </div>
                {/each}
            </div>
        {:else}
            <div class="flexbox header">
                <h3>{item.name}</h3>
                <div class="button-container">
                    {#if craftable}
                        <button class="button-nav active" on:click={() => craftItem()}>craft</button> 
                    {:else}
                        <button class="inactive-button-nav">craft</button>
                    {/if}
                </div>    
            </div>
            <p>{description}</p>        
            <div class="ingredient-container flexbox">
                <h4>requires:</h4>
                {#each ingredients as ingredient, i}
                    {#if ingredient.available}
                        <div class="img-container flexbox">
                            <img class="ingredient-img" src={ingredient.img} alt={`${ingredient.name}`} title={`${ingredient.name}`}>  
                        </div>
                    {:else}
                        <div class="img-container flexbox">
                            <img class="ingredient-img colourless" src={ingredient.img} alt={`${ingredient.name}`} title={`${ingredient.name}`}>  
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>







<style>

.shopitem-container {
    margin: 1rem 0rem 4rem 0rem;
    border-bottom: #F48C06 5px solid;
    padding-bottom: 1rem;
}

.flexbox {
    display: flex;
    flex-direction: row;   
    justify-content: left;
    align-items: center;
    gap: 2vw;
}
h3, h4 {
    font-family: "PS2P";
    margin: auto 0;
    padding: 0; 
}
.locked-text {
    color: red;
}
p {
    margin: 0.1rem;
    padding: 0;
}
.text-container {
    display: flex;
    flex-direction: column;
    height: 10rem;
    justify-content: space-around;
}

.header {
    height: 2rem;
}
.item-img {
    display: block;
    height: 6rem;
}

.colourless {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}

.ingredient-img {
    display: block;
    height: 2rem;
}

.button-nav, .inactive-button-nav {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2rem auto;
    border: none;  
    font-family: "PS2P";
    font-size: 0.75rem;  
}

.button-nav {
    color: #F48C06;
    background-color: #CD173F;
    box-shadow: 2px 2px 0px 2px #91173F;
    -webkit-box-shadow: 2px 2px 0px 2px #91173F;

}

.inactive-button-nav {
    color: #5e5f73;
    background-color: #3d3d48;
    box-shadow: 2px 2px 0px 2px #0e2214;
    -webkit-box-shadow: 2px 2px 0px 2px #0e2214;
    cursor: default;
}

.button-nav:hover {
    scale: 1.02;
}
button:focus-visible {
    outline: none !important;
}
.button-nav:active{
    -webkit-box-shadow: 2px 2px 0px 2px #91173F inset;
    box-shadow: 2px 2px 0px 2px #91173F inset;
    scale: 1.02;
    border: none;
}

</style>