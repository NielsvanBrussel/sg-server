<script>
    import { avatar } from "../../stores";
    export let item
    export let description
    export let price
    export let changeIntroText
    export let locked
 

    const buyItem = () => {
        avatar.changeStats([{ type: 'add item', value: item.id}, { type: 'money', value: -price}])
        changeIntroText(`You bought ${item.name}.`)
    }


</script>


<div class="flexbox shopitem-container">
    <div class="img-container flexbox">
        <img class="item-img" src={item.img} alt={`${item.name}`} title={`${item.name}`}>  
    </div>
    <div class="text-container">
        {#if locked}
            <div class="flexbox">
                <h3>{item.name}</h3>
                <div class="button-container">
                    <button class="inactive-button-nav">buy</button>
                </div>
                <h3 class="locked-text">locked</h3>    
            </div>
            <h4>${price}</h4>
            <p>{description}</p>       
        {:else}
            <div class="flexbox">
                <h3>{item.name}</h3>
                <div class="button-container">
                    {#if $avatar.money >= price}
                    <button class="button-nav active" on:click={() => buyItem()}>buy</button> 
                    {:else}
                        <button class="inactive-button-nav">buy</button>
                    {/if}
                </div>    
            </div>
            <h4>${price}</h4>
            <p>{description}</p>        
        {/if}
    </div>
</div>







<style>

.shopitem-container {
    margin: 1rem 0rem 4rem 0rem;
    border-bottom: #F48C06 5px solid;
    padding-bottom: 0.5rem;
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
h4 {
    color: green;
}
p {
    margin: 0.1rem;
    padding: 0;
}
.text-container {
    display: flex;
    flex-direction: column;
    height: 7rem;
    justify-content: space-around;
}
.item-img {
    display: block;
    height: 6rem;
}

.button-nav {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2rem auto;
    border: none;
    color: #F48C06;
    background-color: #CD173F;
    box-shadow: 2px 2px 0px 2px #91173F;
    -webkit-box-shadow: 2px 2px 0px 2px #91173F;
    font-family: "PS2P";
    font-size: 0.75rem;
}

.inactive-button-nav {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2rem auto;
    border: none;
    color: #5e5f73;
    background-color: #3d3d48;
    box-shadow: 2px 2px 0px 2px #0e2214;
    -webkit-box-shadow: 2px 2px 0px 2px #0e2214;
    font-family: "PS2P";
    font-size: 0.75rem;
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