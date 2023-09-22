import inventoryItems from "../../utility/inventoryItems"
import soldier_png from "../../assets/img/enemies/soldier.png"
import commando_png from "../../assets/img/enemies/commando.png"
import colonel_png from "../../assets/img/enemies/colonel.png"
import tweaker_png from '../../assets/img/enemies/tweaker.png'
import tweaker_nude_png from '../../assets/img/enemies/tweaker_nude.png'
import dealer_png from '../../assets/img/enemies/dealer.png'
import hobo_1_png from '../../assets/img/enemies/hobo-1.png'
import hobo_2_png from '../../assets/img/enemies/hobo-2.png'
import hobo_3_png from '../../assets/img/enemies/hobo-3.png'
import cop_png from '../../assets/img/enemies/cop.png'
import swat_png from '../../assets/img/enemies/swat.png'
import wolf_png from '../../assets/img/enemies/wolf.png'
import bear_png from '../../assets/img/enemies/bear.png'
import bambi_png from '../../assets/img/enemies/bambi.png'
import surgeon_png from '../../assets/img/enemies/surgeon.png'
import nurse_png from '../../assets/img/enemies/nurse.png'
import hippie_png from '../../assets/img/enemies/hippie.png'
import fbi_png from '../../assets/img/enemies/fbi.png'
import cult_1_png from '../../assets/img/enemies/cult-1.png'
import flasher_png from '../../assets/img/enemies/flasher.png'

export const enemies = {
    junkies: [
        {
            name: "Tweaker",
            currentStamina: 10,
            maxStamina: 10,
            attackStamina: 4,
            attackDamage: [3, 5],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.syringe_poisoned.id 
            },
            img: tweaker_nude_png,
        },
        {
            name: "Frenzying Tweaker",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 0.9,
                item: inventoryItems.syringe_poisoned.id 
            },
            img: tweaker_png
        },
        {
            name: "Meth Dealer",
            currentStamina: 10,
            maxStamina: 10,
            attackStamina: 6,
            attackDamage: [10, 14],
            currentHitpoints: 60,
            maxHitpoints: 60,
            drop: {
                chance: 0.9,
                item: inventoryItems.knife.id 
            },
            img: dealer_png
        },
    ],
    flasher: [
        {
            name: "Naked Old Guy",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: flasher_png,
        }
    ],
    informant: [
        {
            name: "FBI Agent",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: fbi_png,
        },
        {
            name: "FBI Agent",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: fbi_png,
        },
        {
            name: "Cult Member",
            currentStamina: 10,
            maxStamina: 10,
            attackStamina: 6,
            attackDamage: [10, 14],
            currentHitpoints: 60,
            maxHitpoints: 60,
            drop: {
                chance: 0.9,
                item: inventoryItems.knife.id 
            },
            img: cult_1_png
        },
    ],
    armyBase: [
        {
            name: "Soldier",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 0.9,
                item: inventoryItems.pistol.id
            },
            img: soldier_png,
        },
        {
            name: "Colonel",
            currentStamina: 10,
            maxStamina: 10,
            attackStamina: 6,
            attackDamage: [10, 14],
            currentHitpoints: 60,
            maxHitpoints: 60,
            drop: {
                chance: 0.9,
                item: inventoryItems.shotgun.id
            },
            img: colonel_png,
        },
        {
            name: "Commando",
            currentStamina: 10,
            maxStamina: 10,
            attackStamina: 6,
            attackDamage: [10, 14],
            currentHitpoints: 60,
            maxHitpoints: 60,
            drop: {
                chance: 0.9,
                item: inventoryItems.shotgun.id
            },
            img: commando_png,
        },
    ],
    hoboArena: [
        {
            name: "Confused Hobo",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: hobo_1_png,
        },
        {
            name: "Clueless Hobo",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: hobo_2_png,
        },
        {
            name: "Drunk Hobo",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: hobo_3_png,
        },
    ],
    police: [
        {
            name: "Police Officer",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: cop_png,
        },
        {
            name: "SWAT",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: swat_png,
        },
        {
            name: "FBI Agent",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: fbi_png,
        },
    ],
    forest: [
        {
            name: "Bambi",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 0,
                item: inventoryItems.deermeat.id
            },
            img: bambi_png,
        },
        {
            name: "Wolf",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 0,
                item: inventoryItems.wolfmeat.id
            },
            img: wolf_png,
        },
        {
            name: "Bear",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 0,
                item: inventoryItems.bearmeat.id
            },
            img: bear_png,
        },
        {
            name: "Hippie",
            currentStamina: 1,
            maxStamina: 1,
            attackStamina: 10,
            attackDamage: [0, 0],
            currentHitpoints: 25,
            maxHitpoints: 25,
            drop: {
                chance: 0,
                item: inventoryItems.seeds.id
            },
            img: hippie_png,
        },
        {
            name: "Yeti",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: surgeon_png,
        },
    ],
    school: [
        {
            name: "Security Guard",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: cop_png,
        },
        {
            name: "Security Guard",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: cop_png,
        },
    ],
    warehouse: [
        {
            name: "Nurse",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: nurse_png,
        },
        {
            name: "Surgeon",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: surgeon_png,
        },
    ],
    armoredTransport: [
        {
            name: "Armored Transport Guard",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: swat_png,
        },
        {
            name: "Armored Transport Driver",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: cop_png,
        },
        {
            name: "Armored Transport Guard",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.pistol.id
            },
            img: swat_png,
        },
    ],
    bridge: [
        {
            name: "Confused Hobo",
            currentStamina: 12,
            maxStamina: 12,
            attackStamina: 4,
            attackDamage: [1, 4],
            currentHitpoints: 10,
            maxHitpoints: 10,
            drop: {
                chance: 1,
                item: inventoryItems.turd.id
            },
            img: hobo_1_png,
        }
    ],
}