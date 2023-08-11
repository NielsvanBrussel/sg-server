<script>
    import { authenticated, avatar, menuActive } from '../../stores.js';
    import { Circle } from 'svelte-loading-spinners';
    import axios from 'axios'
    import { IconMenu2 } from '@tabler/icons-svelte'; 
    import SaveGame from './SaveGame.svelte';
    import LoadGame from './LoadGame.svelte';
    import MenuBackground from '../MenuBackground.svelte';
    import Achievements from './Achievements.svelte';
    import Game from '../Game.svelte';

    let activeTab = 0
   
    const createGame = () => {

        // make a new game by creating a blank avatar and close the menu
        avatar.set({ 
            name: null,
            items: [],
            date_created: new Date()
        })
        console.log($avatar)
        menuActive.set(false)
    }

    const logout = async () => {

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                },
                withCredentials: true
            }

            const res = await axios.post('/api/auth/logout', config)
            if (res) {
                console.log('logout')
                localStorage.setItem('token', '')
                authenticated.set(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

</script>


<div class="main-container">
    {#if !$menuActive}
        <Game />
        <div class="button__menu__container">
            <button on:click={() => menuActive.set(true)}> 
                <IconMenu2 size={30} color={"grey"}/>
            </button>             
        </div>
    {:else}
        <MenuBackground />
        <div class="container__outer">
            <div class="container__inner">
                {#if activeTab === 0}
                    <div class="flex-column">
                        <div class="flex-column2"> 
                        {#if $avatar} 
                            <button 
                                id="newgame-button" 
                                class="menu-button" 
                                on:click={() => menuActive.set(false)}
                            > 
                                Back to game 
                            </button> 
                        {/if}
                            <button 
                                id="newgame-button" 
                                class="menu-button" 
                                on:click={() => createGame()}
                            >
                                New game 
                            </button>
                            <button 
                                id="loadgame-button" 
                                class="menu-button" 
                                on:click={() => activeTab = 1}
                            >
                                Load game 
                            </button>
                        {#if $avatar} 
                            <button
                                id="savegame-button" 
                                class="menu-button"  
                                on:click={() => activeTab = 2}
                            >
                                 Save game 
                            </button>
                        {/if} 
                            <button 
                                id="achievements-button" 
                                class="menu-button" 
                                on:click={() => activeTab = 3}
                            >
                                 Achievements 
                            </button> 
                        </div>
                            <button
                                id="logout-button" 
                                class="menu-button"  
                                on:click={() => logout()}
                            >
                                 Log out 
                            </button>             
                    </div>
    
                <!-- +++++++++++++++++++ LOAD GAME +++++++++++++++++++++++++ -->
    
                {:else if activeTab === 1}
                    <div class="flex-column">
                        <LoadGame />
                        <button class="menu-button"  on:click={() => activeTab = 0}> Back </button>
                    </div>         
                    
                <!-- +++++++++++++++++++ SAVE GAME +++++++++++++++++++++++++ -->
    
                {:else if activeTab === 2}
                    <div class="flex-column">
                        <SaveGame />
                        <button class="menu-button"  on:click={() => activeTab = 0}> Back </button>
                    </div>      
    
                <!-- +++++++++++++++++++ ACHIEVEMENTS +++++++++++++++++++++++++ -->
    
                {:else}
                    <div class="flex-column">
                        <Achievements />
                        <button class="menu-button"  on:click={() => activeTab = 0}> Back </button>
                    </div>
                {/if}    
            </div>
        </div>
    {/if} 
</div>




<style>
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .main-container {
        position: relative;
    }
    .container__outer {
        position: absolute;
        z-index: 2;
        width: 30vw;
        min-width: 18rem;
        max-width: 30rem;
        height: 28rem;
        border: #F51743 solid 5px;
        border-radius: 1rem;
        background-image: linear-gradient(to bottom right, #19173D, #87173E);
        top: 50%;
        left: 50%;
        font-family: 'Bungee-Spice';
        transform: translate(-50%, -50%);
        overflow: hidden;
        
    }
    .container__inner {
        width: 80%;
        margin: 2rem auto;
        height: 24rem;
    }
    .button__menu__container {
        position: absolute;
        right: 0;
        top: 0;
        margin: 2rem;
        z-index: 10;
    }
    .flex-column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 1rem 0rem;
        height: 100%;
    }
    .flex-column2 {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0rem;
        gap: 0.5rem;
        height: 100%;
    }
    .menu-button {
        height: 3rem;
        padding: 0.5rem 0.5rem;
        background-origin: content-box;
        font-family: 'Bungee-Spice';
        font-size: 1.5rem;
        animation: fade-in linear 1s forwards;
    }
</style>