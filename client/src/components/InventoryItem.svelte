<script>
    import inventoryItems from "../utility/inventoryItems";
    export let data
    const image = inventoryItems[data.name].img
</script>

<div class="container">
    <img class="item-img" src={image} alt="item" title={`${inventoryItems[data.name].name}: ${data.amount}`}>
    <div class="text-amount">{data.amount}</div>
</div>

<style>
    .container {
        position: relative;
        text-align: center;
        box-shadow: 3px 3px 2px 2px black;
    }
    img {
        height: 3rem;
    }
    .text-amount {
        position: absolute;
        bottom: -5px;
        right: -10px;
        color: white;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 2px;
        border-radius: 2rem;
    }
</style>
