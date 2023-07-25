<script>
    import axios from "axios";
    import { avatar } from '../../stores.js';
    import refreshToken from "../../utility/refreshToken.js";
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    import { Circle } from 'svelte-loading-spinners';

    let refreshCheck = true
    let avatarValue
    let savegames = new Array(5)
    let loading = true

    avatar.subscribe((value) => {
        avatarValue = value;
    });

    onMount(async () => {
       getSavegames()
	});



	const saveGame = async () => {

        try {

            const JWT = localStorage.getItem('token')

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': JWT,
                    'Accept' : 'application/json',
                },
                withCredentials: true
            }

            const res = await axios.post('https://svelte-game-server-4erv.onrender.com/api/savegame/', { savegame: avatarValue },  config)
            if (res) {
                getSavegames()
            }

        } catch (error) {
            if (error.response.data === 'accesstoken expired') {
                const res = await refreshToken()
                if (res && refreshCheck) {
                    saveGame()
                }
            }
        }
	}

    const updateSavegame = async (savegame) => {

        try {

            const JWT = localStorage.getItem('token')

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': JWT,
                    'Accept' : 'application/json',
                },
                withCredentials: true
            }

            const res = await axios.put('https://svelte-game-server-4erv.onrender.com/api/savegame/', { data: avatarValue, savegame: savegame },  config)
            if (res) {
                getSavegames()
            }

        } catch (error) {
            if (error.response.data === 'accesstoken expired') {
                const res = await refreshToken()
                if (res && refreshCheck) {
                    updateSavegame()
                }
            }
        }
    }


    const getSavegames = async () => {

        try {

            const JWT = localStorage.getItem('token')

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': JWT,
                    'Accept' : 'application/json',
                },
                withCredentials: true
            }

            const res = await axios.get('https://svelte-game-server-4erv.onrender.com/api/savegame/', config)
            if (res) {
                // populate the array with data (empty object if no data available)
                for (var i = 0; i < savegames.length; i++) {
                    if (res.data.savegames.length > i) {
                        savegames[i] = res.data.savegames[i];
                    } else {
                        savegames[i] = {_id: uuidv4()}
                    }
                }
                console.log(savegames)
                loading = false
            }

        } catch (error) {
            console.log(error)
            if (error.response.data === 'accesstoken expired') {
                console.log("allo")
                const res = await refreshToken()
                if (res && refreshCheck) {
                    getSavegames()
                }
            }
        }
    }
    
</script>

{#if loading}
    <div class="spinner-container">
        <Circle size="40" color="#FF3E00" unit="px" duration="1s" />                       
    </div>
{:else}
    <div class="flex-column">
        {#each savegames as savegame, i}
            {#if savegame.user}
                <div>
                    <button on:click={() => updateSavegame(savegame)}>{i + 1}. &nbsp; {savegame.date_active.substring(0,10)} - {savegame.date_active.substring(11,16)} </button>
                </div>
            {:else}
                <div>
                    <button on:click={() => saveGame()}> Empty </button>
                </div>
            {/if}
        {/each}
    </div>
{/if}



<style>
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

  .spinner-container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  button {
    height: 3rem;
    padding: 0.5rem 0.5rem;
    background-origin: content-box;
    font-family: 'Bungee-Spice';
    font-size: 1.5rem;
    width: 100%;
    animation: fade-in linear 1s forwards;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    gap: 0.5rem;
  }
</style>