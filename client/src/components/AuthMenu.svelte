<script>
    import { authenticated, achievements } from '../stores.js';
    import { Circle } from 'svelte-loading-spinners';
    import axios from 'axios'
    import { IconAlertTriangle } from '@tabler/icons-svelte'; 
    import MenuBackground from './MenuBackground.svelte';

    let activeMenu = 0
    let username
    let password
    let loading = false
    let errorActive = false
    let errorMessage = ""


    // reset the values when user changes tab
    $: activeMenu, errorActive = false;
    $: activeMenu, username = "";
    $: activeMenu, password = "";


    // create an errormessage lasting 3s
    const createError = (message) => {
        errorActive = true
        errorMessage = message
        setTimeout(() => {
            errorMessage = ""
            errorActive = false
        }, 3000);
    }


    const login = async () => {

        loading = true
        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                }
            }
            
            const res = await axios.post('/api/auth/login', { name: username, password: password }, config)
            if (res.status === 201) {
                // store token in localstorage && achievements in svelte store
                localStorage.setItem('token', res.data.accessToken)
                achievements.set(res.data.achievements)
                authenticated.update((value) => !value)
            }
        } catch (error) {
            createError(error.response.data)
            setTimeout(() => {
               loading = false 
            }, 200);
            
        }
    }

    const signup = async () => {
        
        loading = true
        try {
            const res = await axios.post('/api/user', { name: username, password: password })
            if (res.status === 201) {
                loading = false
                createError(res.data)
                setTimeout(() => {
                    activeMenu = 1
                }, 3000);
            }
        } catch (error) {
            createError(error.response.data)
            setTimeout(() => {
               loading = false 
            }, 200);
        }
        
    }


    // go from first input to second input if the user presses enter
    const changeFocus = ({e, name}) => {
        if (e.key === 'Enter') {
            document.getElementById(name).focus()
        }
    }

    // go from second input to button action if the user presses enter
    const onEnter = ({e, action}) => {
        if (e.key === 'Enter') {
            if (username && password) {
                if (action === 'signup') {
                    signup()
                } else {
                    login()
                }                
            }
        }
    }

</script>

<MenuBackground />
<div class="container__outer">
    <div class="container__inner">
        {#if activeMenu === 0}
            <div class="flex-column">
                <h2>Welcome</h2>
                <div class="spinner-container"></div>
                <div class="button-container">
                    <button on:click={() => activeMenu = 1}> Log in </button>
                    <button on:click={() => activeMenu = 2}> Sign up </button>            
                </div>
            </div>

        <!-- +++++++++++++++++++ LOGIN +++++++++++++++++++++++++ -->

        {:else if activeMenu === 1}
            <div class="flex-column">
                <h2>Login</h2>
                {#if loading}
                    <div class="spinner-container">
                        <Circle size="40" color="#FF3E00" unit="px" duration="1s" />                       
                    </div>
                {:else}
                    <div class="spinner-container">
                        {#if errorActive}
                            <div class="error-container">
                                <IconAlertTriangle size={26} color={"red"}/>
                                <p>{errorMessage}</p>                            
                            </div>
                        {/if}
                    </div>
                    <div class="input-container">
                       <input autofocus placeholder="Username" bind:value={username} on:keypress={(e) => changeFocus({e: e, name: "A"})} type="text">
                       <input placeholder="Password" id="A" type="password" bind:value={password} on:keypress={(e) => onEnter({e: e, action: "login"})}>            
                   </div>
                   <div class="button-container">
                       <button on:click={() => login()}> log in </button>
                       <button on:click={() => activeMenu = 0}> back </button>            
                   </div>               
                {/if}
            </div>
            
        <!-- +++++++++++++++++++ SIGNUP +++++++++++++++++++++++++ -->

        {:else}
            <div class="flex-column">
                <h2>Signup</h2>
                {#if loading}
                    <div class="spinner-container">
                        <Circle size="40" color="#FF3E00" unit="px" duration="1s" /> 
                    </div>
                {:else}
                    <div class="spinner-container">
                        {#if errorActive}
                            <div class="error-container">
                                <IconAlertTriangle size={26} color={"red"}/>
                                <p>{errorMessage}</p>                            
                            </div>
                        {/if}
                    </div>
                    <div class="input-container">
                        <input autofocus placeholder="Username" bind:value={username} on:keypress={(e) => changeFocus({e: e, name: "B"})} type="text">
                        <input placeholder="Password" id="B" type="password" bind:value={password}  on:keypress={(e) => onEnter({e: e, action: "signup"})}>            
                    </div>
                    <div class="button-container">
                        <button on:click={() => signup()}> sign up </button>
                        <button on:click={() => activeMenu = 0}> back </button>            
                    </div>
                {/if}
            </div>
        {/if}    
    </div>
</div>


<style>
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    height: 100%;
    animation: fade-in linear 1s forwards;
  }
  .input-container, .button-container {
    display: flex;
    flex-direction: column;
    margin: 1rem 0rem;
    gap: 0.5rem;
  }
  input {
    padding: 0.5rem;
    font-size: 1.1rem;
    border-radius: 5px;
    border-color: #F51743;
    background-color: #03071E;
    color: #F48C06;
    font-family: 'Bungee-Regular';
  }  
    input:focus {
        border-color: #F48C06;
        outline: #F48C06;
    }
    input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #F48C06;
        opacity: 0.8; /* Firefox */
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #F48C06;
        opacity: 0.5; /* Firefox */
    }

    input::-ms-input-placeholder { /* Microsoft Edge */
        color: #F48C06;
        opacity: 0.5; /* Firefox */
    }
  button {
    height: 3rem;
    width: 100%;
    padding: 0.5rem 0.5rem;
    background-origin: content-box;
    font-family: 'Bungee-Spice';
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h2 {
    font-size: 3rem;
    margin: 0;
  }
  .container__outer {
    position: absolute;
    z-index: 2;
    width: 30vw;
    min-width: 18rem;
    max-width: 30rem;
    height: 26rem;
    border: #F51743 solid 5px;
    border-radius: 1rem;
    background-image: linear-gradient(to bottom right, #19173D, #87173E);
    top: 50%;
    left: 50%;
    font-family: 'Bungee-Spice';
    transform: translate(-50%, -50%);
    overflow: hidden;
    padding: 2rem 0rem;
  }
  .container__inner {
    width: 80%;
    margin: 0rem auto;
    height: 100%;
  }
  .spinner-container {
    margin: 0rem auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .error-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    border: red solid 2px;
    padding: 0rem 2rem;
    background-color: #03071E;
    border-radius: 5px;
  }
</style>

