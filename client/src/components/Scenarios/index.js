import Supermarket from '../Scenarios/Supermarket.svelte';
import Hospital from '../Scenarios/Hospital.svelte';
import Gym from '../Scenarios/Gym.svelte';
import Sect from '../Scenarios/Sect.svelte';
import Bridge from '../Scenarios/Bridge.svelte';
import GasStation from '../Scenarios/GasStation.svelte';
import PoliceStation from '../Scenarios/PoliceStation.svelte';
import StorageMain from '../Scenarios/StorageMain.svelte';
import School from '../Scenarios/School.svelte';
import Park from '../Scenarios/Park.svelte';
import BotanicalGardens from './BotanicalGardens.svelte';
import Sewers from './Sewers.svelte';


export const locations_map1 = [
    {
        min: 655,
        max: 705,
        name: 'Supermarket',
        component: Supermarket,
        introText: ""
    },
    {
        min: 717,
        max: 767,
        name: 'Botanical Gardens',
        component: BotanicalGardens,
        introText: ""
    },
    {
        min: 780,
        max: 830,
        name: 'Gym',
        component: Gym,
        introText: ""
    },
    {
        min: 835,
        max: 885,
        name: 'Children of the Golden Tree',
        component: Sect,
        introText: ""
    },
    {
        min: 590,
        max: 640,
        name: 'Bridge',
        component: Bridge,
        introText: ""
    },
    {
        min: 502,
        max: 552,
        name: 'Hospital',
        component: Hospital,
        introText: ""
    },    
    {
        min: 430,
        max: 480,
        name: 'other map',
        component: null,
        introText: ""
    },
    {
        min: 370,
        max: 420,
        name: 'Gas station',
        component: GasStation,
        introText: ""
    },
    {
        min: 290,
        max: 340,
        name: 'Police station',
        component: PoliceStation,
        introText: ""
    },
    {
        min: 100,
        max: 150,
        name: 'Storage',
        component: StorageMain,
        introText: ""
    },
    {
        min: 185,
        max: 235,
        name: 'School',
        component: School,
        introText: ""
    },
    {
        min: 5,
        max: 55,
        name: 'Park',
        component: Park,
        introText: "You arrive at the park. The center of nature and recreation in town. Trees, rocks, a duck pond and a playground. What would you like to do?"
    },
]

export const locations_map2 = [
    {
        min: 655,
        max: 705,
        name: 'idk',
        component: Supermarket,
        introText: ""
    },
    {
        min: 300,
        max: 450,
        name: 'Sewers',
        component: Sewers,
        introText: ""
    },
    {
        min: 430,
        max: 480,
        name: 'other map',
        component: null,
        introText: ""
    },
]

