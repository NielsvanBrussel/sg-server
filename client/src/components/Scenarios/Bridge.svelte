<script>
  import TextButton from "../core/TextButton.svelte";
  import { avatar } from "../../stores";


    const changeMoney = (amount) => {

        const newAmount = $avatar.money + amount
        avatar.set({ ...$avatar, money: newAmount })

    }

    const changeCurrentHP = (amount) => {

        const newAmount = $avatar.stats.currentHitpoints + amount
        avatar.set({ ...$avatar, stats: {...$avatar.stats, currentHitpoints: newAmount } })

    }


</script>


<div class="container">
    <div>
        <p>
            bridge   
        </p>
         
    </div>
    <div class="container">
      <TextButton text='free money' eventHandler={() => avatar.changeStats([{ type: 'money', value: 30}, { type: 'currentHitpoints', value: -1}, {type: 'day', value: 1}])}/>  
    </div>
    <!-- <div class="container">
        <TextButton text='lose hp' eventHandler={() => changeCurrentHP(-1)}/>  
    </div> -->
</div>



<style>
    .container {
        position: relative;
        margin: 3rem 3rem 3rem 3rem;
    }

</style>