<script>
  import AuthMenu from './components/AuthMenu.svelte';
  import { authenticated } from './stores.js';
  import { onMount } from 'svelte';
  import refreshToken from './utility/refreshToken';
  import { Circle } from 'svelte-loading-spinners';
  import GameMenu from './components/GameMenu/GameMenu.svelte';

  let authenticatedValue
  let loading = true

  authenticated.subscribe((value) => {
		authenticatedValue = value;
	});

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
      <GameMenu />
    {/if}
  {/if}


</main>

<style>
  .main {
    width: 90vw;
    margin: 0 auto;
    border-radius: 3rem;
    border: #F51743 solid 5px;
    overflow: hidden;
  }
</style>
