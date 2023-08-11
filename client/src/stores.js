import { writable, derived } from 'svelte/store';

export const authenticated = writable(false);
export const menuActive = writable(true);
export const newGame = writable(true);
export const activeScenario = writable({name: "", component: null})
export const playerPosition = writable(-135000)



function createAvatar() {
	const { subscribe, set, update } = writable();

	return {
		subscribe,
        set: (value) => set(value),
        changeStats: (data) => {


            // change stats depending on the array of data ( [{type, value}, ...])
            for (let i = 0; i < data.length; i++) {
                switch (data[i].type) {

                    case 'money':
                        update((prevValue) => {
                            console.log('changing money')
                            const newAmount = prevValue.money + data[i].value
                            return { ...prevValue, money: newAmount }
                        })
                        break;

                    case 'day':
                        update((prevValue) => {
                            console.log('changing day')
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
                            console.log('changing strength')
                            const newAmount = prevValue.stats.strength + data[i].value
                            return { ...prevValue, stats: {...prevValue.stats, strength: newAmount } }
                        })
                        break;

                    case 'stamina':
                        update((prevValue) => {
                            console.log('changing stamina')
                            const newAmount = prevValue.stats.stamina + data[i].value
                            return { ...prevValue, stats: {...prevValue.stats, stamina: newAmount } }
                        })
                        break;

                    case 'intellect':
                        update((prevValue) => {
                            console.log('changing intellect')
                            const newAmount = prevValue.stats.intellect + data[i].value
                            return { ...prevValue, stats: {...prevValue.stats, intellect: newAmount } }
                        })
                        break;

                    case 'intimidation':
                        update((prevValue) => {
                            console.log('changing intimidation')
                            const newAmount = prevValue.stats.intimidation + data[i].value
                            return { ...prevValue, stats: {...prevValue.stats, intimidation: newAmount } }
                        })
                        break;

                    case 'currentHitpoints':
                        update((prevValue) => {
                            console.log('changing currentHitpoints')
                            const newAmount = prevValue.stats.currentHitpoints + data[i].value
                            return { ...prevValue, stats: {...prevValue.stats, currentHitpoints: newAmount } }
                        })
                        break;

                    case 'maxHitpoints':
                        update((prevValue) => {
                            console.log('changing maxHitpoints')
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