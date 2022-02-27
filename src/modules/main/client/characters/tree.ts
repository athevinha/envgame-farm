import { Spritesheet, Animation, Direction, ISpriteCharacter } from '@rpgjs/client'
import { RpgSprite, RpgSpriteHooks } from '@rpgjs/client'

const frameX = (direction) => {
    direction;
    // var x: number = +localStorage.farm;
    return 2
}
const frameY = (direction) => {
    direction;
    // var y: number = +localStorage.farm;
    // y = 0;
    // if (y === 0) { // disease
    //     return 3
    // }
    // else if (y === 1) {
    // }
    return 3
}

@Spritesheet({
    id: 'tree',
    image: require('./assets/farm.png'),
    width: 192,
    height: 128,
    framesHeight: 4,
    framesWidth: 6,
    textures: {
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
export class Tree { }