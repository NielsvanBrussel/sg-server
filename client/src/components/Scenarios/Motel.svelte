<script>
    import { avatar, activeScenario } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import ScenarioOption from "../core/ScenarioOption.svelte";
    import { onMount } from 'svelte';
    import { enemies } from "../combat/enemies";

    export let setCombatMode
    export let combatMode
    export let changeIntroText

    let enemytype = 0
    let options = 0
    
    
    const enemiesArray = [
        {name: 0, enemies: null},
        {name: 0, enemies: null},
        {name: 0, enemies: null},
        {name: 1, enemies: enemies.flasher},
        {name: 2, enemies: enemies.junkies},
        $avatar.unlocks.cult > 1 ? 
            {name: 3, enemies: enemies.informant} 
        : 
            {name: 0, enemies: null}
    ]

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(enemiesArray)

    
    let showOptions = true

    
    onMount(async () => {
        if(combatMode === 2) {
            postCombatHandler()
        }
	});

    const postCombatHandler = () => {
        showOptions = false
        switch ($activeScenario.enemies[0].name) {
            case "Naked Old Guy":
                changeIntroText("You clearly picked the wrong room. For some reason the guy didn't have anything valuable on him either.")
                break;

            case "FBI Agent":
                changeIntroText("You disposed of the informant. Rudy will be pleased. Better get out of here before backup arrives.")
                avatar.set({...$avatar, unlocks: {...$avatar.unlocks, cult: 3}}) 
                break;

            case "Tweaker":
                changeIntroText("After getting rid of the junkies and the dealer you search the room and find their stash hidden away in the bathroom.")
                avatar.changeStats([{type: 'add item', value: inventoryItems.cocaine.id}])
                break;
        
            default:
                break;
        }
    }
   
    const combatHandler = (value) => {
        showOptions = false
        if (enemiesArray[value].name === 0) {
            changeIntroText("You break into the room but it's empty.")
            setTimeout(() => {
                showOptions = true
            }, 3000);
        } else {
            if (enemiesArray[value].name === 1) {
                changeIntroText("You break into the room and there's a half naked man inside staring at you.")
                enemytype = 1
            }
            if (enemiesArray[value].name === 2) {
                changeIntroText("When you break into the room you stumble on an ongoing drug transaction.")
                enemytype = 2
            }
            if (enemiesArray[value].name === 3) {
                changeIntroText("You break down the door and the room is filled with FBI agents and the informant the Cult is looking for.")
                enemytype = 3
            }
            activeScenario.set({...$activeScenario, enemies: enemiesArray[value].enemies})
            avatar.changeStats([{type: 'day', value: 1}])
            setTimeout(() => {
                setCombatMode(1)
            }, 3000);
            
        }
    }

    const officeHandler = () => {
        showOptions = false
        options = 2
        changeIntroText("A small scruffy man is sitting behind the desk at the motel office.")
        setTimeout(() => {
            showOptions = true  
        }, 3000);
    }

    const rentHandler = () => {
        showOptions = false
        changeIntroText("You sleep through the night and when you wake up the next morning you feel revitalised.")
        avatar.changeStats([{type: 'day', value: 1}, {type: 'money', value: -60}, {type: 'hitpoints', value: 999}])
    }

    const infoHandler = (value) => {
        showOptions = false
        options = 0
        let index
        let room
        if(value === "dealer") {
            index = enemiesArray.findIndex(item => item.name === 2)
        } else {
            index = enemiesArray.findIndex(item => item.name === 3)
        }
        if (index > 2) {
            room = `1${index - 2}`
        } else {
            room = `0${index + 1}`
        }
        changeIntroText(`He tells you that the room you are looking for is ${room}.`)
        avatar.changeStats([{type: 'money', value: -100}])
        setTimeout(() => {
            showOptions = true
        }, 3000);

    }


</script>

    <div class="options-container">
        {#if showOptions}
            {#if options === 0}
                <ScenarioOption text="COMBAT: Raid a room (MEDIUM)" eventHandler={() => options = 1} />              
                <ScenarioOption text="Go see the owner at his office" eventHandler={() => officeHandler()} />
            {:else if options === 1}
                <ScenarioOption text="Room 01" eventHandler={() => combatHandler(0)}/>
                <ScenarioOption text="Room 02" eventHandler={() => combatHandler(1)}/>
                <ScenarioOption text="Room 03" eventHandler={() => combatHandler(2)}/>
                <ScenarioOption text="Room 11" eventHandler={() => combatHandler(3)}/>
                <ScenarioOption text="Room 12" eventHandler={() => combatHandler(4)}/>
                <ScenarioOption text="Room 13" eventHandler={() => combatHandler(5)}/>
            {:else if options === 2} 
                <ScenarioOption text="Rent a room for $60 (heal to full)" eventHandler={() => rentHandler()}/>
                <ScenarioOption text="Pass him $100 and ask him if there are any drug dealers at the motel" eventHandler={() => infoHandler("dealer")}/>
                {#if $avatar.unlocks.cult > 1}
                    <ScenarioOption text="Pass $100 and ask him in what room the informant is located" eventHandler={() => infoHandler("informant")}/>
                {/if}
                
            {/if}
        {/if}  
    </div>

<style>

.options-container {
        width: 100%;
        text-align: left;
        margin-bottom: 2rem;
    }

</style>