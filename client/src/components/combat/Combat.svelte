<script>
    import { avatar } from '../../stores';
    import ScenarioOption from '../core/ScenarioOption.svelte';
    import { weapons } from './weapons';
    import inventoryItems from '../../utility/inventoryItems';
    import AnimatedText from '../core/AnimatedText.svelte';

    import poisonImg from '../../assets/img/poison.png'
    import bleedImg from '../../assets/img/bleed.png'
    import tempEnemy from '../../assets/img/enemies/hobo-1.png'
    import emptyEnemy from '../../assets/img/enemies/empty.png'
    import bloodImg from '../../assets/img/enemies/blood.png'
    import energyGif from '../../assets/img/energy.gif'
    import healthGif from '../../assets/img/hitpoints.gif'
    import damagePng from '../../assets/img/damage.png'
  

    export let setCombatMode
    export let enemies
    

    const enemiesCopy = structuredClone(enemies)
    
    let combatRound = 0
    let healOption = true
    let attacking
    let finishedCombat = false
    let enemy = enemiesCopy[combatRound]
    let enemyDead = false
    let introText = `You are now fighting ${enemy.name}!`

    const changeIntroText = (value) => {
        introText = value
    }
    

    // check if player owns oil
    $: oil = $avatar.items.some(item => item.name === inventoryItems.oil.id)

    // check if player owns nail
    $: nail = $avatar.items.some(item => item.name === inventoryItems.nail.id)
   

    // player stats

    // for every rank of stamina increase attackpoints by 1 with a base of 10
    const maxStamina = Math.floor(10 + $avatar.stats.stamina)
    let currentStamina = maxStamina

    // deal 3% more damage for each rank of strength
    const strModifier = ($avatar.stats.strength * 0.03) + 1
    // deal 3% more damage for each rank of intellect
    const intModifier = ($avatar.stats.intellect * 0.03) + 1

    // enemy stats
    let poison = 0
    let bleed = 0


    // go to the next enemy (if possible)

    const nextRound = () => {
        enemyDead = false
        combatRound ++
        if (combatRound < enemies.length) {
            finishedCombat = false
            currentStamina = maxStamina
            enemy = enemiesCopy[combatRound]
            changeIntroText(`You are now fighting ${enemy.name}!`)
        } else {
            enemy.img = emptyEnemy
            // code if player finished last round
            setCombatMode(2)
        }
    }


    // determine if player gets a drop when enemy dies
    const checkDrop = () => {

        enemyDead = true
        healOption = true

        avatar.changeStats([{type: 'experience', value: 50}])

        const getsDrop = (Math.random() + ($avatar.stats.luck * 0.02)) >= enemy.drop.chance ? true : false
        
        if (getsDrop) {
            changeIntroText(`${enemy.name} dies and drops ${inventoryItems[enemy.drop.item].name}!`)                    
            avatar.changeStats([{ type: 'add item', value: enemy.drop.item}])
        } else {
            changeIntroText(`${enemy.name} dies!`)
        }

        poison = 0
        bleed = 0
        setTimeout(() => {
            finishedCombat = true
            attacking = false
        }, 3000)
    }


    // player attacking

    const playerAttack = (weapon) => {

        attacking = true
        healOption = false

        const modifier = weapon.strength ? strModifier : intModifier

        const damage = Math.floor(Math.random() * (weapons[weapon].damage[1] - weapons[weapon].damage[0]) + weapons[weapon].damage[0] * modifier)

        if (enemy.currentHitpoints - damage < 0) {
            enemy.currentHitpoints = 0
        } else {
            enemy.currentHitpoints -= damage
            bleed += weapons[weapon].bleedDamage
            enemy.currentStamina -= weapons[weapon].staminaDamage
            poison += weapons[weapon].poison
        }
        currentStamina -= weapons[weapon].stamina


        if (
            weapon === "shotgun" || 
            weapon === "knife_poisoned" || 
            weapon === "rifle" || 
            weapon === "pistol" || 
            weapon === "syringe_poisoned" || 
            weapon === "molotov"
        ) {
            avatar.changeStats([{ type: 'remove item', value: `${weapon}`}])
        } else if (weapon === "chainsaw") {
            avatar.changeStats([{ type: 'remove item', value: 'oil'}])
        } else if (weapon === "nailgun") {
            avatar.changeStats([{ type: 'remove item', value: 'nail'}])
        }

        changeIntroText(`You deal ${damage} damage with your ${weapons[weapon].name}!`)


        setTimeout(() => {
            changeIntroText("")
            if (enemy.currentHitpoints < 1) {
                checkDrop()
            } else {
               attacking = false 
            }
        }, 3000)
    }

    // enemy attacking

    const endTurn = () => {

        attacking = true
        healOption = true
        let numberOfAttacks = Math.floor(enemy.currentStamina / enemy.attackStamina)

        const reset = () => {                    
            // end enemy turn
            changeIntroText("")
            if (poison !== 0) {
                poison --
            }
            if (bleed !== 0) {
                bleed --
            }
            enemy.currentStamina = enemy.maxStamina
            attacking = false
            currentStamina = maxStamina
        }
        

        const enemyAttack = () => {
            if (numberOfAttacks > 0) {

                // calculate the damage on current hit
                const damage = poison > 0 ? 
                    Math.floor((Math.random() * (enemy.attackDamage[1] - enemy.attackDamage[0]) + enemy.attackDamage[0]) * 0.8) 
                    :
                    Math.floor(Math.random() * (enemy.attackDamage[1] - enemy.attackDamage[0]) + enemy.attackDamage[0])

                // reduce enemy stamina for displaying its stamina bar
                enemy.currentStamina -= enemy.attackStamina

                // avatar.changeStats([{ type: 'currentHitpoints', value: damage}])
                changeIntroText(`${enemy.name} deals ${damage} damage!`)
                numberOfAttacks -- 

                // damage taken from bleeding (bleed hits on every enemy attack)
                const dmg = enemy.currentHitpoints - bleed
                if (dmg < 0) {
                    enemy.currentHitpoints = 0
                } else {
                    enemy.currentHitpoints = dmg
                }
 
                    // wait 3.5seconds before making enemy attack again (to display message)
                    setTimeout(() => {
                        if (enemy.currentHitpoints < 1) {
                            checkDrop()
                        } else {
                            if (numberOfAttacks > 0) {
                                changeIntroText("")
                            }
                            setTimeout(() => {
                                enemyAttack()
                            }, 1000)
                        }
                    }, 3500);
                
            } else {
                reset()
            }
        }
        if (numberOfAttacks === 0) {
            changeIntroText(`${enemy.name} is unable to attack!`)
            setTimeout(() => {
                reset()
            }, 3500);
        } else {
           enemyAttack()  
        }
        
    }

    const playerHeal = (item) => {
        changeIntroText(`You consume the ${item.name}. It heals for ${item.healing}.`)
        avatar.changeStats([{ type: 'currentHitpoints', value: item.healing}, { type: 'remove item', value: item.id }])
        setTimeout(() => {
            endTurn()  
        }, 3500);
    }
</script>



<div class="scenario-content-left">
    <div  class="enemy-container">
        <div class="enemy-container-top">
            <div class="image-container img-top">
                {#if enemyDead}
                    <img src={bloodImg} alt="avatar" class="blood-img">
                {/if}
                {#key enemy.img}
                  <img src={enemy.img? enemy.img : tempEnemy} alt="avatar" class="enemy-img">  
                {/key}
            </div>
            <div class="effects-container">
                {#if poison}
                    <div class="poison-container" title="poison">
                        <img class="effect-img" alt="poison" src={poisonImg} />
                        <p class="effect-stack-indicator">{poison}</p>
                    </div>
                {/if}
                {#if bleed}
                    <div class="bleed-container" title="bleed">
                        <img class="effect-img" alt="bleed" src={bleedImg} />
                        <p class="effect-stack-indicator">{bleed}</p>
                    </div>
                {/if}                    
            </div>
        </div>
        <div class="enemy-container-bottom">
            <div>
                <p class="enemy-info-text">{enemy.name}</p>
            </div>
            <div class="flexbox2">
                <div class="flexbox1">
                    <img class="enemy-info-img" title="hitpoints" alt="hitpoints" src={healthGif} />
                    <p class="enemy-info-text">{enemy.currentHitpoints}/{enemy.maxHitpoints}</p>
                </div>
                <div class="flexbox1">
                    <img class="enemy-info-img" alt="energy" title="energy" src={energyGif} />
                    <p class="enemy-info-text">{enemy.currentStamina}/{enemy.maxStamina}</p>
                </div>                
            </div>
            <div class="flexbox2">
                <div class="flexbox1">
                    <img class="enemy-info-img" alt="damage" title="damage" src={damagePng} />
                    <p class="enemy-info-text">{enemy.attackDamage[0]}-{enemy.attackDamage[1]} ({enemy.attackStamina}<img class="enemy-info-img-small" title="energy" alt="energy" src={energyGif} />)</p>
                </div>
            </div>  

        </div>            
    </div>
</div>
<div class="scenario-content-right">
    <div class="scenario-messagebox">
        <div class="scenario-messagebox-outer content-box">
            <div class="scenario-messagebox-inner">
                <AnimatedText text={introText}/>
            </div>
        </div>
    </div>
    <div class="options-container-outer content-box">
        <div class="options-container-inner">
            <div class="flexbox3">
                <img class="enemy-info-img" alt="energy" title="energy" src={energyGif} />
                <p class="enemy-info-text">{currentStamina}/{maxStamina}</p>
            </div>
            <div class="options content-box">
                    {#if finishedCombat}
                        <ScenarioOption 
                            unlocked={true} 
                            text="continue" 
                            eventHandler={() => nextRound()}
                        />
                        <ScenarioOption 
                            unlocked={true} 
                            text="run away" 
                            eventHandler={() => setCombatMode(0)}
                        />  
                    {:else if !attacking}
                        <ScenarioOption 
                            unlocked={currentStamina >= weapons.fist.stamina} 
                            text="attack with Fists" 
                            eventHandler={() => playerAttack("fist")}
                        /> 
                        {#each $avatar.items as item (item.name)}
                            {#if inventoryItems[item.name].weapon}
                                {#if item.name === inventoryItems.chainsaw.id}
                                    <ScenarioOption 
                                        unlocked={oil && currentStamina >= weapons[item.name].stamina} 
                                        text="attack with Chainsaw" 
                                        eventHandler={() => playerAttack(inventoryItems.chainsaw.id)}
                                    /> 
                                {:else if item.name === inventoryItems.nailgun.id}
                                    <ScenarioOption 
                                        unlocked={nail && currentStamina >= weapons[item.name].stamina} 
                                        text="attack with Nailgun" 
                                        eventHandler={() => playerAttack(inventoryItems.nailgun.id)}
                                    /> 
                                {:else}
                                    <ScenarioOption 
                                        unlocked={currentStamina >= weapons[item.name].stamina} 
                                        text={`attack with ${inventoryItems[item.name].name}`} 
                                        eventHandler={() => playerAttack(inventoryItems[item.name].id)}
                                    />     
                                {/if}
                            {/if}
                            {#if inventoryItems[item.name].healing}
                                <ScenarioOption 
                                    unlocked={healOption} 
                                    text={`consume ${inventoryItems[item.name].name}`} 
                                    eventHandler={() => playerHeal(inventoryItems[item.name])}
                                />  
                            {/if}
                        {/each}
                        <ScenarioOption 
                            unlocked={true} 
                            text="end turn" 
                            eventHandler={() => endTurn()}
                        />        
                    {/if}
            </div>   
            
        </div>
    </div>
</div>




<style>

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .blood-img, .enemy-img {
        animation: forwards fade-in 3s;
    }

    .enemy-container {
        width: 100%;
    }

    .flexbox1, .flexbox2 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .flexbox1 {
        gap: 5px;
    }
    .flexbox2 {
        gap: 2rem;
    }
    .flexbox3 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0;
        gap: 0.5rem;
        position: absolute;
        background-color: #03071E;
        padding: 0.5rem;
        border-radius: 10rem;
        bottom: 20px;
        border: #F48C06 solid 6px;
        width: auto;
        right: 12px;
        z-index: 2;
    }
    .options {
        padding-bottom: 3.5rem;
    }
    .enemy-info-img {
        height: 2rem;
    }
    .enemy-info-img-small {
        height: 1rem;
    }
    .enemy-info-text {
        margin: 0;
        padding: 0;
        font-family: 'PS2P'
    }
    .enemy-container-top {
        width: 100%;
        border-bottom: #CD173F solid 5px;
        position: relative;
    }
    .image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        min-height: calc(4*20rem/6);
    }
    .enemy-img {
        width: 100%;
        z-index: 1;
    }
    .blood-img {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
    }
    .enemy-container-bottom {
        width: 100%;
        margin: 0.5rem auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        align-items: center;
    }
    .effects-container {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 0.5rem;
        z-index: 2;
    }
    .bleed-container, .poison-container {
        padding: 0.5rem;
        border-radius: 2rem;
        height: 100%;
        width: 2rem;
        position: relative;
    }
    .poison-container {
        background-color: greenyellow;
    }
    .bleed-container {
        background-color: #4A0404;
    }
    .effect-stack-indicator {
        position: absolute;
        top: -10px;
        right: -5px;
        color: white;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 2px 5px;
        border-radius: 2rem;
        margin: 0;
    }
    .effect-img {
        height: 2rem;
        display: block;
    }
    .scenario-content-left {
        width: 20rem;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }
    .scenario-content-right {
        border-left: solid #F51743 6px;
        width: calc(100% - 20rem);
        position: relative;
    }

    .scenario-messagebox {
        width: calc(100% - 2vh);
        padding-right: 2vh;
        border-bottom: solid #F51743 6px;
    }
    .scenario-messagebox-outer {
        height: 22vh;
        overflow: auto;
        width: 100%;
    }
    .options-container-outer {
        max-width: 100%;
        height: calc(100% - 6px - 20vh - 4vh);
        overflow: auto;
        margin: 0vh 2vh;
        width: calc(100% - 4vh);
        
    }
    .scenario-messagebox-inner {
        margin: 3vh;
        text-align: left;
        width: calc(100% - 6vh);
    }
    .options-container-inner {
        margin: 2vh;
        text-align: left;
        width: calc(100% - 4vh);
    }
    .content-box::-webkit-scrollbar {
		width: 0.6rem;
		background: transparent;
		border-radius: 2rem;
		margin-bottom: 0.5rem;  
  	}
	.content-box::-webkit-scrollbar-track {
		background-color: #F48C06 ;
		color: transparent;
		margin: 2rem 0rem 5rem 0rem;
		border-radius: 2rem;
	}
  	.content-box::-webkit-scrollbar-thumb {
		background: #F51743;
		border-radius: 2rem;
  	}


</style>