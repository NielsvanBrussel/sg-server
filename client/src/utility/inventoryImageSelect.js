import turd_png from '../assets/img/inv/turd.png'
import cocaine_png from '../assets/img/inv/cocaine.png'
import truffle_png from '../assets/img/inv/truffle.png'
import shroom_png from '../assets/img/inv/shroom.png'
import shotgun_png from '../assets/img/inv/shotgun.png'
import antifreeze_png from '../assets/img/inv/antifreeze.png'
import oil_png from '../assets/img/inv/oil.png'
import seeds_png from '../assets/img/inv/seeds.png'
import lolly_png from '../assets/img/inv/lolly.png'
import organs_png from '../assets/img/inv/organs.png'
import weed_png from '../assets/img/inv/weed.png'



const imageSelect = (value) => {
    switch (value) {
        case 'shroom':
            return shroom_png
        
        case 'weed':
            return weed_png
         
        case 'cocaine':
            return cocaine_png
         
        case 'antifreeze':
            return antifreeze_png
         
        case 'organs':
            return organs_png
                         
        case 'oil':
            return oil_png
                             
        case 'lolly':
            return lolly_png

        case 'seeds':
            return seeds_png

        case 'shotgun':
            return shotgun_png

        case 'turd':
            return turd_png

        case 'truffle':
            return truffle_png
            
        default:
            return null
    }
}

export default imageSelect