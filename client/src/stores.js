import { writable, derived } from 'svelte/store';

export const authenticated = writable(false);
export const menuActive = writable(true);
export const newGame = writable(true);
export const achievements = writable([]);
export const activeScenario = writable({name: "", component: null})
export const playerPosition = writable(-135000)



function createAvatar() {
	const { subscribe, set, update } = writable(
        {
            name: null,
			stats: {
				strength: null,
				stamina: null,
				intellect: null,
				maxHitpoints: null,
				currentHitpoints: null,
				intimidation: null,
			},
			day: 1,
			money: 20,
			items: [],
			unlocks: {
				hospitalVisits: 0,
				missingKidney: false,
				billy: false,
				growingWeed: false,
				hoboArena: false,
				organTrade: false,
				sewers: false,
			},
			date_created: null
        }
    );

	return {
		subscribe,
        set: (value) => set(value),
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
                         
                            // check the quantity of the item and lower it if it is more than 1, remove it otherwise
                            const newItems = prevValue.items.map(item => item.name === data[i].value ? item.amount > 2 ?{...item, amount: item.amount - 1} : null : item)
                    
                            return { ...prevValue, items: newItems }
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
                            if (newAmount >= 7) {
                                newAmount = 1
                            }

                            return { ...prevValue, day: newAmount }
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

                    case 'intimidation':
                        update((prevValue) => {
                          
                            const newAmount = prevValue.stats.intimidation + data[i].value

                            return { ...prevValue, stats: {...prevValue.stats, intimidation: newAmount } }
                        })
                        break;

                    case 'currentHitpoints':
                        update((prevValue) => {
                       
                            const newAmount = prevValue.stats.currentHitpoints + data[i].value

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