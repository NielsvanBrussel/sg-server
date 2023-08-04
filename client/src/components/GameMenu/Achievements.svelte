<script>
    import axios from "axios";
    import { avatar } from '../../stores.js';
    import refreshToken from "../../utility/refreshToken.js";
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    import { Circle } from 'svelte-loading-spinners';

    let refreshCheck = true
    let avatarValue
    let loading = false

    avatar.subscribe((value) => {
        avatarValue = value;
    });


    const test = async () => {

        try {


            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                },
            }
            const res = await axios.post('/api/auth/login', { name: 'username', password: 'password' }, config)
            if (res) {
                console.log(res)
            }

        } catch (error) {
            if (error.response.data === 'accesstoken expired') {
                const res = await refreshToken()
                if (res && refreshCheck) {
                    test()
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
        <div>
            <button on:click={() => test()}> Empty </button>
        </div>
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