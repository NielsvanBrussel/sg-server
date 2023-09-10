import Supermarket from '../Scenarios/Supermarket.svelte';
import Hospital from '../Scenarios/Hospital.svelte';
import Gym from '../Scenarios/Gym.svelte';
import CrackHouse from './CrackHouse.svelte';
import Bridge from '../Scenarios/Bridge.svelte';
import GasStation from '../Scenarios/GasStation.svelte';
import PoliceStation from '../Scenarios/PoliceStation.svelte';
import StorageMain from '../Scenarios/StorageMain.svelte';
import School from '../Scenarios/School.svelte';
import Park from '../Scenarios/Park.svelte';
import Sewers from './Sewers.svelte';
import ArmyBase from './ArmyBase.svelte';
import { enemies } from '../combat/enemies';
import FastfoodRestaurant from './FastfoodRestaurant.svelte';
import Forest from './Forest.svelte';


export const locations_map1 = [
    {
        min: 430,
        max: 480,
        name: 'Ramshaven Countryside',
        enemies: null,
        component: null,
        introText: ""
    },
    {
        min: 655,
        max: 705,
        name: "Tools 'n Stuff",
        enemies: null,
        component: Supermarket,
        introText: "Welcome to Tools 'n Stuff. How may we help you?"
    },
    {
        min: 780,
        max: 830,
        name: 'Gym',
        enemies: null,
        component: Forest,
        introText: "",
    },
    {
        min: 835,
        max: 885,
        name: 'Crack House',
        enemies: enemies.crackhouse,
        component: CrackHouse,
        introText: "You enter the filthy house. You enter the filthy house.You enter the filthy house.You enter the filthy house.You enter the filthy house. You enter the filthy house. You enter the filthy house. You enter the filthy house. You enter the filthy house. You enter the filthy house. You enter the filthy house. You enter the filthy house. You enter the filthy house.",
    },
    {
        min: 590,
        max: 640,
        name: 'Bridge',
        enemies: enemies.bridge,
        component: Bridge,
        introText: ""
    },
    {
        min: 502,
        max: 552,
        name: 'Hospital',
        enemies: null,
        component: Hospital,
        introText: ""
    },    
    {
        min: 370,
        max: 420,
        name: 'Gas station',
        enemies: null,
        component: GasStation,
        introText: ""
    },
    {
        min: 290,
        max: 340,
        name: 'Police station',
        enemies: null,
        component: PoliceStation,
        introText: ""
    },
    {
        min: 100,
        max: 150,
        name: 'Storage',
        enemies: null,
        component: StorageMain,
        introText: ""
    },
    {
        min: 185,
        max: 235,
        name: 'School',
        enemies: null,
        component: School,
        introText: ""
    },
    {
        min: 5,
        max: 55,
        name: 'Park',
        enemies: null,
        component: Park,
        introText: "You arrive at the park. The center of nature and recreation in town. Trees, rocks, a duck pond and a playground. What would you like to do?"
    },
]

export const locations_map2 = [
    {
        min: 423,
        max: 473,
        name: 'Ramshaven Town',
        enemies: null,
        component: null,
        introText: ""
    },
    {
        min: 512,
        max: 562,
        name: "Wacky's",
        enemies: null,
        component: FastfoodRestaurant,
        introText: "Welcome to Wacky's. Can I take your order please?"
    },
    {
        min: 707,
        max: 757,
        name: 'Fort Harper',
        enemies: enemies.armyBase,
        component: ArmyBase,
        introText: ""
    },
    {
        min: 38,
        max: 88,
        name: 'Pikey camp',
        enemies: null,
        component: Sewers,
        introText: ""
    },
    {
        min: 152,
        max: 202,
        name: 'Red Creek Forest',
        enemies: null,
        component: Forest,
        introText: "You enter the forest. The smell of pine trees and wet grass relaxes you. At the same time however you have a feeling that something is watching you from the shadows."
    },
    {
        min: 300,
        max: 350,
        name: 'Sundown Motel',
        enemies: null,
        component: Sewers,
        introText: ""
    },
    // {
    //     min: 620,
    //     max: 670,
    //     name: 'Sewers',
    //     component: Sewers,
    //     introText: ""
    // },

]

