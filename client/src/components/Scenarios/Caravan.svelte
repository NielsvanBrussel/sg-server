<script>
    import { activeScenario, armoredCar, avatar } from "../../stores";
    import inventoryItems from "../../utility/inventoryItems";
    import CraftingItem from "../core/CraftingItem.svelte";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText
  
    let showOptions = true
    let options = 0

    const getDayStringFormat = (day) => {
            switch (day) {
                case 1:
                    return "monday"
                case 2:
                    return "tuesday"
                case 3:
                    return "wednesday"
                case 4:
                    return "thursday"
                case 5:
                    return "friday"
                case 6:
                    return "saturday"
                case 7:
                    return "sunday"
                default:
                    return "monday"
            }
    }



    const questHandler = () => {

        // check if event isn't already active

        if ($armoredCar.day) {
            changeIntroText(`You better finish the job you are on first before I give you another! The transport will be moving on ${getDayStringFormat($armoredCar.day)} and will stop at ${$armoredCar.type !== "prisoner" ? $armoredCar.location === "map_1"? "the gas station" : "Wacky's" : "the police station"}.`)
        } else {
            if ($avatar.unlocks.transportRobbery === 0) {
                changeIntroText("One of my cousins recently got arrested for disorderly conduct and public intoxication. He'll be moved to prison by armored transport on tuesday. Do you think you're able to get him out? I'd be greatly indebted to you.")
            } else {
                changeIntroText("I've got another tip on an armored transport, job is yours if you want it for $200.")
            }            
            showOptions = false
            setTimeout(() => {
                showOptions = true
                options = 1 
            }, 2000);
        }

    }


    const initiateRobberyHandler = () => {

        if ($avatar.unlocks.transportRobbery === 0) {
            changeIntroText("Much appreciated! They're moving him on tuesday from the police station. Which will probably be your only time to strike.")
            armoredCar.set({ day: 2, location: "map_1", type: "prisoner" })
        } else {

            // remove $200
            avatar.changeStats([{ type: 'money', value: -200 }])

            // rng the event (location, type and day)
            const location = Math.random()
            const type =  Math.random() > 0.5 ? "money" : "weapons"
            const day = Math.floor(Math.random() * (7 - 1) + 1)
            

            if (location > 0.5) {
                armoredCar.set({ day: day, location: "map_1", type: type })
                changeIntroText(`The next armored transport will be carrying ${type} and will be moving on ${getDayStringFormat(day)}. My intel says that they are planning to fill up their tank at the gas station in Ramshaven Town. Good luck! `) 
            } else {
                armoredCar.set({ day: day, location: "map_2", type: type })
                changeIntroText(`The next armored transport will be carrying ${type} and will be moving on ${getDayStringFormat()}. My intel says that they are planning to stop at Wacky's for lunch in Ramshaven Countryside. Good luck! `)  
            }
        }
        options = 0
        showOptions = false
    }

    const buyTrailerHandler = () => {
        avatar.changeStats([{type: 'money', value: -7000}])
        changeIntroText("You bought the trailer. Now you just need to set up the interior. The school in town probably has some nice science lab equipment you could borrow.")
        avatar.set({...$avatar, unlocks: {...$avatar.unlocks, methLab: 1}}) 
        showOptions = false  
    }

    const setupTrailerHandler = () => {

        if($avatar.unlocks.methLab === 2) {
            changeIntroText("You move the equipment you stole from the school into your trailer and set it up. You now have your very own chemical lab.")
            avatar.changeStats([{type: 'day', value: 1}])
            setTimeout(() => {
            avatar.set({...$avatar, unlocks: {...$avatar.unlocks, methLab: 3}})  
            }, 3000);            
        } else {
            changeIntroText("You just need to set up the interior of the trailer. The school in town probably has some nice science lab equipment you could borrow.")
            showOptions = false
        }

    }

    const enterTrailerHandler = () => {
        changeIntroText("You enter your trailer.")
        options = 2
    }


    const skipday = () => {
        avatar.changeStats([{type: 'day', value: 1}, {type: 'money', value: 5000}])
        if ($avatar.unlocks.transportRobbery === 0) {
           avatar.set({...$avatar, unlocks: {...$avatar.unlocks, transportRobbery: 1}}) 
        }
    }

</script>

{#if showOptions}
    <div class="options-container">
      
            {#if options === 0}
                <ScenarioOption text="Ask for work." eventHandler={() => questHandler()}/>
                <ScenarioOption text="skipday" eventHandler={() => skipday()} />
                    {#if $avatar.unlocks.methLab === 0 && $avatar.unlocks.transportRobbery === 1 && $avatar.money >= 7000}
                        <ScenarioOption text="Buy a trailer (7000$)." eventHandler={() => buyTrailerHandler()} />
                    {/if}
                    {#if $avatar.unlocks.methLab === 1}
                        <ScenarioOption text="Set up your drug lab." eventHandler={() => setupTrailerHandler()} />
                    {/if}
                    {#if $avatar.unlocks.methLab === 3}
                        <ScenarioOption text="Enter your trailer." eventHandler={() => enterTrailerHandler()} />
                    {/if}
            {/if}
            {#if options === 1}
                    {#if $avatar.unlocks.transportRobbery === 0 || $avatar.money >= 200}
                        <ScenarioOption text="I'll get right on it." eventHandler={() => initiateRobberyHandler()} />
                    {/if}
                    <ScenarioOption text="Maybe another time." eventHandler={() => activeScenario.reset()} />
            {/if}
            {#if options === 2}
                        <!-- crafting options go here -->
                        <CraftingItem 
                            item={inventoryItems.pills}
                            ingredients={[inventoryItems.antifreeze, inventoryItems.shroom, ]}
                            changeIntroText={changeIntroText}
                            description="Amphetamines. For people who want to get cranked up."
                            locked={false}  

                        />
                        <CraftingItem 
                            item={inventoryItems.cocaine}
                            ingredients={[inventoryItems.weed, inventoryItems.gas, ]}
                            changeIntroText={changeIntroText}
                            description="Cocaine. One of the classic drugs. Very widely used."
                            locked={false}  

                        />
                        <CraftingItem 
                            item={inventoryItems.syringe_poisoned}
                            ingredients={[inventoryItems.frog, inventoryItems.syringe]}
                            changeIntroText={changeIntroText}
                            description="A deadly syringe you can use in combat. Weakens the target."
                            locked={false}  
                        />
                        <CraftingItem 
                            item={inventoryItems.knife_poisoned}
                            ingredients={[inventoryItems.frog, inventoryItems.knife]}
                            changeIntroText={changeIntroText}
                            description="Knife upgrade. Weakens the target. Single use only."
                            locked={false}  
                        />
                        <CraftingItem 
                            item={inventoryItems.molotov}
                            ingredients={[inventoryItems.gas, inventoryItems.sprute]}
                            changeIntroText={changeIntroText}
                            description="Cheap way of setting things on fire."
                            locked={false}  
                        />

            {/if}
        
    </div>           
{/if}        


<style>
    .options-container {
        width: 100%;
        text-align: left;
    }
</style>