import { Spritesheet, Animation, Direction, RpgSprite,RpgSpriteHooks } from '@rpgjs/client'

const frameX = (direction) => {
    
    return {
        [Direction.Down]: 0,
        [Direction.Left]: 1,
        [Direction.Right]: 2, 
        [Direction.Up]: 3,
        ["center"]: 4,
        // [Direction.Center]: 4,
    }[direction]
}

@Spritesheet({
    id: 'farm',
    image: require('./assets/farm.png'),
    width: 192,
    height: 128,
    framesHeight: 4,
    framesWidth: 6,
    textures: {
        [Animation.Stand]: {
            animations: direction => 
            [
                [
                     {time: 0, frameX: frameX(direction) , frameY: 1},
                ]
            ]
        }
    }
})
export class Farm  { }