<script>
  import TextButton from "../core/TextButton.svelte";
  import { avatar } from "../../stores";


//   $(document).ready(function () {

// var text = "example text";
// var i = 0;

// var consoleTyper = setInterval(function () {
//     if (i != text.length) {
//         i += 1;
//         $("#text").text(text.substr(0, i));
//     }
//     else
//     {
//      clearInterval(consoleTyper);   
//     }

//     console.log(i);
// }, 50);
// });





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