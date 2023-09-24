<script>
  import AuthMenu from './components/AuthMenu.svelte';
  import { authenticated, menuActive } from './stores.js';
  import { onMount } from 'svelte';
  import refreshToken from './utility/refreshToken';
  import { Circle } from 'svelte-loading-spinners';
  import GameMenu from './components/GameMenu/GameMenu.svelte';
  import Game from './components/Game.svelte';
  

  let authenticatedValue
  let loading = true
  let old

  authenticated.subscribe((value) => {
		authenticatedValue = value;
	});


  // for (let index = 1; index < 30; index++) {
  //   const threshhold = (1500 * index) - (2 * (index ** 2)) - (6 * (index **2)) + (0.2 * index ** 4)
  //   const difference = threshhold - old
  //   console.log(difference)
  //   old = threshhold
  // }

  onMount(async () => {
		const res = await refreshToken()
    if (res) {
      authenticated.set(true)
    } else {
      
    }
    loading = false
	});

</script>

<main class="main">

  {#if loading}
    <div class="spinner-container">
      <Circle size="40" color="#FF3E00" unit="px" duration="1s" /> 
    </div>
  {:else}
    {#if !authenticatedValue}
      <AuthMenu />
    {:else}
      <div class="main-container">
        {#if !$menuActive}
          <Game />
        {:else}
          <GameMenu />
        {/if}
      </div>  
    {/if}
  {/if}


</main>

<style>
  .main {
    width: 90vw;
    height: 90vh;
    margin: 0 auto;
    border-radius: 3rem;
    border: #F51743 solid 5px;
    overflow: hidden;
  }
  .main-container {
    position: relative;
  }
  .spinner-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
