<script>
    import axios from "axios";
    import { avatar } from '../../stores.js';
    import refreshToken from "../../utility/refreshToken.js";
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    import { Circle } from 'svelte-loading-spinners';

    let refreshCheck = true
    let avatarValue
    let savegames = new Array(3)
    let loading = true

    avatar.subscribe((value) => {
        avatarValue = value;
    });

    onMount(async () => {
       getSavegames()
	});



	const saveGame = async () => {

        loading = true

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

            const res = await axios.post('/api/savegame/', { savegame: avatarValue },  config)
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

        loading = true

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

            const res = await axios.put('/api/savegame/', { data: avatarValue, savegame: savegame },  config)
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

            const res = await axios.get('/api/savegame/', config)
            if (res) {
                // populate the array with data (empty object if no data available)
                for (var i = 0; i < savegames.length; i++) {
                    if (res.data.savegames.length > i) {
                        savegames[i] = res.data.savegames[i];
                    } else {
                        savegames[i] = {_id: uuidv4()}
                    }
                }
                loading = false
            }

        } catch (error) {
            if (error.response.data === 'accesstoken expired') {
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
                    <button on:click={() => updateSavegame(savegame)}>
                        <div class="savegame-content">
                            <div>
                                {i + 1}. &nbsp;
                            </div>
                            <div>
                                <div>
                                    {savegame.date_active.substring(0,10)} - {savegame.date_active.substring(11,16)} 
                                </div>
                                <div>
                                    {savegame.name} 
                                </div>
                                <div>
                                    Lvl. {savegame.level}
                                </div>
                            </div>
                        </div>
                    </button>
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
    height: 6rem;
    padding: 0.5rem 0.5rem;
    background-origin: content-box;
    font-family: 'Bungee-Spice';
    font-size: 1.5rem;
    width: 100%;
    animation: fade-in linear 1s forwards;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    gap: 0.5rem;
  }
  .savegame-content {
    text-align: left;
    font-size: 1.25rem;
    display: flex;
    justify-content: left;
    flex-direction: row;
  }
</style>