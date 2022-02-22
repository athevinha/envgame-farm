import { RpgSprite, RpgSpriteHooks, RpgSpriteLogic } from '@rpgjs/client'
import { RpgGui } from '@rpgjs/client'
export const sprite: RpgSpriteHooks = {
    onMove(sprite: RpgSprite) {
        RpgGui.hide('ai')
        RpgGui.hide('rem')
        RpgGui.hide('farm')
    }
}
// export const spriteLogic: RpgSpriteLogic = {
// otherPlayersCollision(sprite: RpgSprite) {
// RpgGui.hide('ai')
// RpgGui.hide('rem')
// RpgGui.hide('farm')
    // }
// }