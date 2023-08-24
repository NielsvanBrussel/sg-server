<script>
    import imageSelect from "../utility/inventoryImageSelect";
    export let data
    const image = imageSelect(data.name)
</script>

<div class="container">
    <img class="item-img" src={image} alt="item" title={`${data.name}: ${data.amount}`}>
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
