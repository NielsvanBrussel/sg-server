<script>
  import TextButton from "../core/TextButton.svelte";
  import { avatar } from "../../stores";





</script>


<div class="container">
    <div>
        <p>
            bridge   
        </p>
         
    </div>
    <div class="container">
      <TextButton text='get poop' eventHandler={() => avatar.changeStats([{ type: 'add item', value: 'poop'}])}/>  
    </div>
    <div class="container">
        <TextButton text='get golden poop' eventHandler={() => avatar.changeStats([{ type: 'add item', value: 'gold poop'}])}/>  
    </div>

    <div class="container">
        <TextButton text='remove golden poop' eventHandler={() => avatar.changeStats([{ type: 'remove item', value: 'gold poop'}])}/>  
    </div>
</div>



<style>
    .container {
        position: relative;
        margin: 3rem 3rem 3rem 3rem;
    }

</style>