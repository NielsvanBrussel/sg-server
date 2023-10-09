import Supermarket from '../Scenarios/Supermarket.svelte';
import Hospital from '../Scenarios/Hospital.svelte';
import Gym from '../Scenarios/Gym.svelte';
import Cult from './Cult.svelte';
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
import BotanicalGardens from './BotanicalGardens.svelte';
import Caravan from './Caravan.svelte';
import Motel from './Motel.svelte';


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
        component: Gym,
        introText: "",
    },
    {
        min: 717,
        max: 767,
        name: 'Botanical Gardens',
        component: BotanicalGardens,
        enemies: null,
        introText: "Ramshaven Botanical Gardens. Home of some of the rarest plants in the world. A gardener comes at you and welcomes you."
    },
    {
        min: 835,
        max: 885,
        name: 'Children of the Golden Flower',
        enemies: enemies.Cult,
        component: Cult,
        introText: "You enter the filthy house. There's junk lying around everywhere and zombie like people crawling around.",
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
        enemies: enemies.hospital,
        component: Hospital,
        introText: ""
    },    
    {
        min: 370,
        max: 420,
        name: 'Gas station',
        enemies: enemies.armoredTransport,
        component: GasStation,
        introText: ""
    },
    {
        min: 290,
        max: 340,
        name: 'Police station',
        enemies: enemies.police,
        component: PoliceStation,
        introText: ""
    },
    {
        min: 100,
        max: 150,
        name: 'Warehouse',
        enemies: enemies.warehouse,
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
        enemies: enemies.flasher,
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
        enemies: enemies.armoredTransport,
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
        name: 'Trailer Park',
        enemies: null,
        component: Caravan,
        introText: "You make your way to the fanciest looking caravan. A big dark bearded man is sitting in front."
    },
    {
        min: 152,
        max: 202,
        name: 'Red Creek Forest',
        enemies: enemies.forest,
        component: Forest,
        introText: "You enter the forest. The smell of pine trees and wet grass relaxes you. At the same time however you have a feeling that something is watching you from the shadows."
    },
    {
        min: 300,
        max: 350,
        name: 'Sundown Motel',
        enemies: null,
        component: Motel,
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

