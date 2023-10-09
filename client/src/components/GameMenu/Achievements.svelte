<script>
    import { achievements } from "../../stores";
    import starIcon from '../../assets/img/star.png'
    import achievementsData from "../../utility/achievements";

</script>



<div class="achievements-container">
    {#each Object.entries($achievements) as [id, value] }
        <div class="achievement-container-outer">
            <div class={value? "achievement-container-inner" : "achievement-container-inner locked"}>
                <div class="image-container">
                    <img src={starIcon} alt="star" class="achievement-img">
                </div>
                <div class="text-container">
                    <h3 class="achievement-title">{value? achievementsData[id].title : "????"}</h3>
                    <h6 class="achievement-description">{achievementsData[id].description}</h6>
                </div>
            </div>
        </div>
    {/each}
</div>



<style>

    .achievements-container {
        height: 80%;
        /* 0.6rem scrolbar width, 1vw padding by lowering the childrens width by 1vw */
        width: calc(100% + 0.6rem + 1vw);
        overflow: auto;
    }
    .achievements-container::-webkit-scrollbar {
		width: 0.6rem;
		background: transparent;
		border-radius: 2rem;
		margin-bottom: 0.5rem;  
  	}
    .achievements-container::-webkit-scrollbar-track {
		background-color: #F48C06 ;
		color: transparent;
		margin: 1rem 0rem;
		border-radius: 2rem;
	}
    .achievements-container::-webkit-scrollbar-thumb {
		background: #F51743;
		border-radius: 2rem;
  	}
    .achievement-container-outer {
        background-image: linear-gradient(to bottom right, #19173D, #87173E);
        padding: 1rem;
        border: #F48C06 solid 3px;
        border-radius: 1rem;
        color: #F48C06;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 1rem 0rem;
        /* 6px for border 2rem for padding 1vw for scrollbar spacing */
        width: calc(100% - 2rem - 6px - 1vw);
    }
    .achievement-container-inner {
        display: flex;
        flex-direction: row;
        justify-content: left;
        gap: 2vw;
        overflow: hidden;
    }
    .locked {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }
    .achievement-title {
        font-family: 'Bungee-Spice';
    }
    .achievement-description {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    }
    .text-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0rem;
    }
    .image-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .achievement-img {
        height: 2.5rem;
    }
    h3, h6 {
        padding: 0;
        margin: 0;
        text-align: left;
    }
</style>