import { Spritesheet, Animation, Direction, ISpriteCharacter } from '@rpgjs/client'
import { RpgSprite, RpgSpriteHooks } from '@rpgjs/client'

const frameX = (direction) => {
    direction;
    // const username = localStorage.farm as string | undefined;
    let farm_name = localStorage.getItem('farm')
    // if (localStorage.getItem('isStage5')) {
    //     localStorage.setItem(farm_name!, "5")
    // }
    var x: number = +localStorage.getItem(farm_name!)!;
    return x
}
const frameY = (direction) => {
    direction;
    let farm_name = localStorage.getItem('farm')
    var x: number = +localStorage.getItem(farm_name!)!;
    var y: number = +localStorage.farm;
    if (x === 3 || x === 4) return 3
    else return 0
    // if (y === 0) { // disease
    //     return 3
    // }
    // else if (y === 1) {
    //     return 0
    // }

}

@Spritesheet({
    id: 'farm',
    image: require('./assets/farm.png'),
    width: 192,
    height: 128,
    framesHeight: 4,
    framesWidth: 6,
    textures: {
        // default: {
        //     animations: (hi) =>
        //         [
        //             [{ time: 100, frameX: frameX(hi), frameY: 0 }]
        //         ]
        // },
        [Animation.Stand]: {
            animations: (direction) =>
                [
                    [
                        { time: 0, frameX: frameX(direction), frameY: frameY(direction) },
                    ]
                ]
        }
    }
})
export class Farm { }
// export class Farm implements ISpriteCharacter {
//     onCharacterStand(sprite: RpgSprite) {
//         sprite.animation.play(Animation.Stand, ['hello'])
//     }
// }
