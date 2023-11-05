import Supermarket from '../Scenarios/Supermarket.svelte';
import Hospital from '../Scenarios/Hospital.svelte';
import Cult from './Cult.svelte';
import Bridge from '../Scenarios/Bridge.svelte';
import GasStation from '../Scenarios/GasStation.svelte';
import PoliceStation from '../Scenarios/PoliceStation.svelte';
import Warehouse from './Warehouse.svelte';
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
import Arena from './Arena.svelte';
import Bank from './Bank.svelte';
import Payphone from './Payphone.svelte';
import Hole from './Hole.svelte';
import Partyvan from './Partyvan.svelte';


// data file with all locations:
// min & max = position
// scenario component linked to the location
// enemies linked to the scenario
// introtext displayed at start of scenario


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
        name: 'JP & co Banking & Insurance',
        enemies: null,
        component: Bank,
        introText: "",
    },
    {
        min: 717,
        max: 767,
        name: 'Botanical Gardens',
        component: BotanicalGardens,
        enemies: null,
        introText: "Ramshaven Botanical Gardens. Home of some of the rarest plants in the world. A gardener approaches you and welcomes you."
    },
    {
        min: 835,
        max: 885,
        name: 'Children of the Golden Flower',
        enemies: enemies.Cult,
        component: Cult,
        introText: 'You stand before a massive door with a golden plaque with the words "Children of the Golden Sun". You ring the doorbell and a woman in a white gown opens.',
    },
    {
        min: 590,
        max: 640,
        name: 'Bridge',
        enemies: enemies.bridge,
        component: Bridge,
        introText: "As you pass under the bridge you see large encampments of tents where hobos are strolling around. In the back there's a big circus tent, surrounded by a big fence and an even bigger gate."
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
        component: Warehouse,
        introText: ""
    },
    {
        min: 185,
        max: 235,
        name: 'School',
        enemies: enemies.school,
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

export const locations_nomap = [
    {
        min: null,
        max: null,
        name: 'Hobo Arena',
        enemies: enemies.hoboArena,
        component: Arena,
        introText: "The loud cheering and chanting of a huge crowd welcomes you as you enter the tent. Hundreds of peoples eyes are all fixated at the center, where bloodied men are busy fighting eachother in a cage. You notice the fat man who gave you the key near the entrance. Once again he approaches you and asks if you are ready."
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
        min: 587,
        max: 637,
        name: "Phone Booth",
        enemies: null,
        component: Payphone,
        introText: "Welcome to Wacky's. Can I take your order please?"
    },
    {
        min: 842,
        max: 892,
        name: 'Hole',
        enemies: null,
        component: Hole,
        introText: "xfgjxfgjfgj"
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
        introText: "fxgjxgfj"
    },
    {
        min: 225,
        max: 275,
        name: 'Party Van',
        enemies: null,
        component: Partyvan,
        introText: "fxgjxgfj"
    }

]

