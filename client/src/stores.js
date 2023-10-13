import { writable } from 'svelte/store';
import { locations_map1, locations_map2 } from './components/Scenarios';
import updateAchievement from './utility/updateAchievement';
import achievementsData from './utility/achievements';

export const authenticated = writable(false);
export const menuActive = writable(true);
export const newGame = writable(true);
export const playerPosition = writable(-135000)
export const armoredCar = writable({ day: null, location: "", type: "" })
export const achievementPopup = writable({ id: null, title: null, description: null })


function selectActiveScenario() {
    const { subscribe, set, update } = writable(
        {
            name: "",
            component: null,
            introText: "",
            enemies: [],
        }
    )

    return {
        subscribe,
        set: (value) => set(value),
        reset: () => set(
            {
                name: "",
                component: null,
                introText: "",
                enemies: [],
            }
        )
    }
}
export const activeScenario = selectActiveScenario()



function selectMap() {
    const { subscribe, set, update } = writable(
        {
            name: "map_1",
            locationsArray: locations_map1
        }
    )

    return {
        subscribe,
        set: (value) => set(value),
        select: (value) => {
            if (value === "map_1") {
                set({
                    name: value,
                    locationsArray: locations_map1
                })        
            } else if (value === "map_2") {
                set({
                    name: value,
                    locationsArray: locations_map2
                })    
            }
        }        
    }
}
export const map = selectMap()



function initAchievements() {
    const { subscribe, set, update } = writable(
        {
            firstTimePlaying: false,
            billyTheKid: false,
            gladiator: false,
            cook: false,
            maxLevel: false,
            pigsTruffle: false,
        }
    )

    return {
        subscribe,
        set: (value) => set(value),
        unlockAchievement: (value) => {

            update((prevValue) => {
                // update the object
                const updatedAchievements = { ...prevValue, [value.id]: true }
                
                // update it in the database
                updateAchievement(value.id)
                .then((res) => {
                    if (res) {
                        // set the value for the popup to trigger
                        achievementPopup.set(value)  
                        return updatedAchievements                      
                    } else {
                        return { ...prevValue }
                    } 
                })
                .catch((err) => {
                    throw err
                })

                return updatedAchievements
            })
        }        
    }
}
export const achievements = initAchievements()



function createAvatar() {
	const { subscribe, set, update } = writable(
        {
            name: null,
            level: null,
            experience: null,
			stats: {
				strength: null,
				stamina: null,
				intellect: null,
				maxHitpoints: null,
				currentHitpoints: null,
				luck: null,
			},
            buffs: {
                strengthBuff: 0,
                intellectBuff: 0,
                luckBuff: 0,
            },
			day: 1,
			money: 20,
			items: [],
			unlocks: {
				hospitalVisits: 0,
                transportRobbery: 0,
				missingKidney: false,
				billy: 0,
				growingWeed: 0,
				methLab: 0,
                cult: 0,
				organTrade: false,
				sewers: false,
                items: [],
			},
			date_created: null
        }
    );

	return {
		subscribe,
        set: (value) => set(value),
        reset: () => set({
            name: null,
            level: null,
            experience: null,
			stats: {
				strength: null,
				stamina: null,
				intellect: null,
				maxHitpoints: null,
				currentHitpoints: null,
				luck: null,
			},
            buffs: {
                strengthBuff: 0,
                intellectBuff: 0,
                luckBuff: 0,
            },
			day: 1,
			money: 20,
			items: [],
			unlocks: {
				hospitalVisits: 0,
				missingKidney: false,
                transportRobbery: 0,
				billy: 0,
				growingWeed: 0,
				methLab: 0,
                cult: 0,
				organTrade: false,
				sewers: false,
                items: [],
			},
			date_created: null
        }),
        changeStats: (data) => {


            // change stats depending on the array of data ( [{type, amount}, ...])
            for (let i = 0; i < data.length; i++) {
                switch (data[i].type) {

                    case 'add item':
                        update((prevValue) => {
                         
                            const items = prevValue.items

                            // check if user already has the item
                            const check = items.some(item => item.name === data[i].value)

                            let newItems
                            if (check) {
                                // increase the amount if user has the item already
                                newItems = items.map(item => item.name === data[i].value ? {...item, amount: item.amount + 1} : item)
                            } else {
                                // add the item if the user does not have the item
                                newItems = [...items, {name: data[i].value, amount: 1}]
                            }

                            return { ...prevValue, items: newItems }
                        })
                        break;

                    case 'remove item':
                        update((prevValue) => {

                            const filterFunction = (item) => {
                                if (item.name === data[i].value && item.amount === 1) {
                                    return false
                                }
                                return true
                            }
                            
                            // check the quantity of the item and lower it if it is more than 1, remove it otherwise
                            const newItems = prevValue.items
                                .filter(filterFunction)
                                .map(item => item.name === data[i].value && item.amount > 1 ?{...item, amount: item.amount - 1} : item)
 
                            return { ...prevValue, items: newItems }
                        })
                        break;

                    case 'experience':
                        update((prevValue) => {
                        
                            const newAmount = prevValue.experience + data[i].value
                            const threshhold = Math.floor((150 * prevValue.level) + ((prevValue.level + 5) ** 2) + (1.85 * prevValue.level ** 3))

                            if (newAmount >= threshhold && prevValue.level < 30) {
                                if (prevValue.level === 29) {
                                    achievements.unlockAchievement(achievementsData.maxLevel)
                                }
                                // code for levelup, max level is 30
                                return { ...prevValue, experience: newAmount, level: (prevValue.level + 1)}
                            } else {
                               return { ...prevValue, experience: newAmount } 
                            }
                            
                        })
                        break;

                    case 'money':
                        update((prevValue) => {
                        
                            const newAmount = prevValue.money + data[i].value
                            return { ...prevValue, money: newAmount }
                        })
                        break;

                    case 'day':
                        update((prevValue) => {
                         
                            let newAmount = prevValue.day + data[i].value

                            // reset back to monday after sunday
                            if (newAmount > 7) {
                                newAmount = 1
                            }

                            // decrease buffs by 1 if active
                            let strengthBuff = prevValue.buffs.strengthBuff
                            if (strengthBuff > 0) {
                                strengthBuff --
                            }
                            let intellectBuff = prevValue.buffs.intellectBuff
                            if (intellectBuff > 0) {
                                intellectBuff --
                            }
                            let luckBuff = prevValue.buffs.luckBuff
                            if (luckBuff > 0) {
                                luckBuff --
                            }

                            // increase values if this event is ongoing (billy dealing drugs @3+ and weed growing in gardens @1+)
                            let billy = prevValue.unlocks.billy 
                            if (prevValue.unlocks.billy > 3) {
                                billy ++
                            }
                            let weed = prevValue.unlocks.growingWeed
                            if (prevValue.unlocks.growingWeed > 1) {
                                weed ++
                            }

                            return { 
                                ...prevValue, 
                                day: newAmount, 
                                unlocks: {...prevValue.unlocks, billy: billy, growingWeed: weed}, 
                                buffs: {strengthBuff: strengthBuff, intellectBuff: intellectBuff, luckBuff: luckBuff} 
                            }
                        })
                        break;

                    case 'strength':
                        update((prevValue) => {
                          
                            const newAmount = prevValue.stats.strength + data[i].value

                            return { ...prevValue, stats: {...prevValue.stats, strength: newAmount } }
                        })
                        break;

                    case 'stamina':
                        update((prevValue) => {
                          
                            const newAmount = prevValue.stats.stamina + data[i].value

                            return { ...prevValue, stats: {...prevValue.stats, stamina: newAmount } }
                        })
                        break;

                    case 'intellect':
                        update((prevValue) => {
                         
                            const newAmount = prevValue.stats.intellect + data[i].value

                            return { ...prevValue, stats: {...prevValue.stats, intellect: newAmount } }
                        })
                        break;

                    case 'luck':
                        update((prevValue) => {
                          
                            const newAmount = prevValue.stats.luck + data[i].value

                            return { ...prevValue, stats: {...prevValue.stats, luck: newAmount } }
                        })
                        break;

                    case 'currentHitpoints':
                        update((prevValue) => {
                       
                           let newAmount = prevValue.stats.currentHitpoints + data[i].value
                            if (newAmount > prevValue.stats.maxHitpoints * 5) {
                                newAmount = prevValue.stats.maxHitpoints * 5
                            }

                            return { ...prevValue, stats: {...prevValue.stats, currentHitpoints: newAmount } }
                        })
                        break;

                    case 'maxHitpoints':
                        update((prevValue) => {
          
                            const newAmount = prevValue.stats.maxHitpoints + data[i].value

                            return { ...prevValue, stats: {...prevValue.stats, maxHitpoints: newAmount } }
                        })
                        break;
                
                    default:
                        break;
                }
                
            }

        }
	};
}
export const avatar = createAvatar()