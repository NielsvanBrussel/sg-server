<script>
  import AuthMenu from './components/AuthMenu.svelte';
  import { authenticated, menuActive, achievements } from './stores.js';
  import { onMount } from 'svelte';
  import refreshToken from './utility/refreshToken';
  import { Circle } from 'svelte-loading-spinners';
  import GameMenu from './components/GameMenu/GameMenu.svelte';
  import Game from './components/Game.svelte';
  import axios from 'axios';
  

  let authenticatedValue
  let loading = true
  let refreshCheck = true


  authenticated.subscribe((value) => {
		authenticatedValue = value;
	});


  const getAchievements = async () => {
    const JWT = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'token': JWT,
            'Accept' : 'application/json',
        },
        withCredentials: true
    }

    try {
        const res = await axios.get('/api/achievement', config)
        refreshCheck = true
        achievements.set(res.data)
        return true
    } catch (err) {
   
        if (err.response.data === 'accesstoken expired') {
            const res = await refreshToken()
           
            if (res && refreshCheck) {
                refreshCheck = false
                const res = await getAchievements()
                return res
            } else {
                return false
            }
        } else {
            return false
        }
    }
  }



  onMount(async () => {
    
    // try and get achievements from saved user (cookie & localstorage)
    const res = await getAchievements()


    // if response is negative show authentication menu, else show gamemenu
    if (res) {
      authenticated.set(true)
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
        {#if $menuActive}
          <GameMenu />
        {:else}
          <Game />
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
