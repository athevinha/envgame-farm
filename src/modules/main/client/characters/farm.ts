import { Spritesheet, Animation, Direction, ISpriteCharacter } from '@rpgjs/client'
import { RpgSprite, RpgSpriteHooks } from '@rpgjs/client'

const frameX = (direction) => {
    direction;
    // const username = localStorage.farm as string | undefined;
    var x: number = +localStorage.farm;
    console.log('return value', x)
    return x
}
const frameY = (direction) => {
    direction;
    // const username = localStorage.farm as string | undefined;
    var y: number = +localStorage.farm;
    y = 0;
    if (y === 0) { // disease
        return 3
    }
    else if (y === 1) {
        return 0
    }
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
