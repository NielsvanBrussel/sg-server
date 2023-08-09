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


const locationsArray = [
    {
        min: 502,
        max: 552,
        name: 'Hospital',
        component: Hospital
    },
    {
        min: 655,
        max: 705,
        name: 'Supermarket',
        component: Supermarket
    },
    {
        min: 780,
        max: 830,
        name: 'Gym',
        component: Gym
    },
    {
        min: 835,
        max: 885,
        name: 'Children of the Golden Tree',
        component: Sect
    },
    {
        min: 590,
        max: 640,
        name: 'Bridge',
        component: Bridge
    },
    {
        min: 370,
        max: 420,
        name: 'Gas station',
        component: GasStation
    },
    {
        min: 290,
        max: 340,
        name: 'Police station',
        component: PoliceStation
    },
    {
        min: 100,
        max: 150,
        name: 'Storage',
        component: StorageMain
    },
    {
        min: 185,
        max: 235,
        name: 'School',
        component: School
    },
    {
        min: 5,
        max: 55,
        name: 'Park',
        component: Park
    },
]

export default locationsArray