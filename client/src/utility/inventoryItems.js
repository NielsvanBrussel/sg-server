import turd_png from '../assets/img/inv/turd.png'
import cocaine_png from '../assets/img/inv/cocaine.png'
import truffle_png from '../assets/img/inv/truffle.png'
import shroom_png from '../assets/img/inv/shroom.png'
import shotgun_png from '../assets/img/inv/shotgun.png'
import antifreeze_png from '../assets/img/inv/antifreeze.png'
import oil_png from '../assets/img/inv/oil.png'
import seeds_png from '../assets/img/inv/seeds.png'
import lolly_png from '../assets/img/inv/lolly.png'
import lolly_cocaine_png from '../assets/img/inv/lolly-cocaine.png'
import organs_png from '../assets/img/inv/organs.png'
import weed_png from '../assets/img/inv/weed.png'
import rifle_png from '../assets/img/inv/rifle.png'
import pistol_png from '../assets/img/inv/pistol.png'
import burger_basic_png from '../assets/img/inv/burger-basic.png'
import burger_super_png from '../assets/img/inv/burger-super.png'
import burger_mega_png from '../assets/img/inv/burger-mega.png'
import syringe_png from '../assets/img/inv/syringe.png'
import syringe_poisoned_png from '../assets/img/inv/syringe-poisoned.png'
import knife_png from '../assets/img/inv/knife.png'
import knife_poisoned_png from '../assets/img/inv/knife-poisoned.png'
import chainsaw_png from '../assets/img/inv/chainsaw.png'
import hammer_png from '../assets/img/inv/hammer.png'
import nailgun_png from '../assets/img/inv/nailgun.png'
import nail_png from '../assets/img/inv/nail.png'
import frog_png from '../assets/img/inv/frog.png'


// list of all items in the game


const inventoryItems = {
    burger_basic: {
        name: 'Wack',
        img: burger_basic_png,
        id: 'burger_basic',
        weapon: false,
    },
    burger_super: {
        name: 'Big Wack',
        img: burger_super_png,
        id: 'burger_super',
        weapon: false,
    },
    burger_mega: {
        name: 'Wack Royale',
        img: burger_mega_png,
        id: 'burger_mega',
        weapon: false,
    },
    pistol: {
        name: 'Glock',
        img: pistol_png,
        id: 'pistol',
        weapon: true,
    },
    shotgun: {
        name: 'Shotgun',
        img: shotgun_png,
        id: 'shotgun',
        weapon: true,
    },
    rifle: {
        name: 'M16 Assault Rifle',
        img: rifle_png,
        id: 'rifle',
        weapon: true,
    },
    nailgun: {
        name: 'Nailgun',
        img: nailgun_png,
        id: 'nailgun',
        weapon: true,
    },
    hammer: {
        name: 'Hammer',
        img: hammer_png,
        id: 'hammer',
        weapon: true,
    },
    chainsaw: {
        name: 'Chainsaw',
        img: chainsaw_png,
        id: 'chainsaw',
        weapon: true,
    },
    knife: {
        name: 'Knife',
        img: knife_png,
        id: 'knife',
        weapon: true,
    },
    knife_poisoned: {
        name: 'Poisoned Knife',
        img: knife_poisoned_png,
        id: 'knife_poisoned',
        weapon: true,
    },
    syringe: {
        name: 'Syringe',
        img: syringe_png,
        id: 'syringe',
        weapon: false,
    },
    syringe_poisoned: {
        name: 'Poisoned Syringe',
        img: syringe_poisoned_png,
        id: 'syringe_poisoned',
        weapon: true,
    },
    organs: {
        name: 'Organs',
        img: organs_png,
        id: 'organs',
        weapon: false,
    },
    seeds: {
        name: 'Bag of Seeds',
        img: seeds_png,
        id: 'seeds',
        weapon: false,
    },
    antifreeze: {
        name: 'Antifreeze',
        img: antifreeze_png,
        id: 'antifreeze',
        weapon: false,
    },
    oil: {
        name: 'Oil',
        img: oil_png,
        id: 'oil',
        weapon: false,
    },
    cocaine: {
        name: 'Cocaine',
        img: cocaine_png,
        id: 'cocaine',
        weapon: false,
    },
    weed: {
        name: 'Weed',
        img: weed_png,
        id: 'weed',
        weapon: false,
    },
    truffle: {
        name: 'Truffle',
        img: truffle_png,
        id: 'truffle',
        weapon: false,
    },
    turd: {
        name: 'Turd',
        img: turd_png,
        id: 'turd',
        weapon: false,
    },
    shroom: {
        name: 'Mushroom',
        img: shroom_png,
        id: 'shroom',
        weapon: false,
    },
    lolly: {
        name: 'Lolly',
        img: lolly_png,
        id: 'lolly',
        weapon: false,
    },
    lolly_cocaine: {
        name: 'Cocaine Infused Lolly',
        img: lolly_cocaine_png,
        id: 'lolly_cocaine',
        weapon: false,
    },
    nail: {
        name: 'Nails',
        img: nail_png,
        id: 'nail',
        weapon: false,
    },
    frog: {
        name: 'Poisonous Frog',
        img: frog_png,
        id: 'frog',
        weapon: false,
    },

}


export default inventoryItems