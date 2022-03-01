import { RpgSprite, RpgSpriteHooks, RpgSpriteLogic } from '@rpgjs/client'
import { RpgGui } from '@rpgjs/client'
declare module '@rpgjs/client' {
    export interface RpgSprite {
        textGraphic: PIXI.Text
    }
}
export const sprite: RpgSpriteHooks = {
    onInit(sprite: RpgSprite) {
        const style = new PIXI.TextStyle({
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "cursive"
        })
        const textGraphic = new PIXI.Text('', style)
        textGraphic.y = -25
        // textGraphic.x = +50
        textGraphic.anchor.set(0.5)
        sprite.textGraphic = textGraphic
        sprite.addChild(textGraphic)
    },
    onChanges(sprite: RpgSprite, data: any) {
        if (sprite.isCurrentPlayer && localStorage.getItem('isStage5')) {
            sprite.h = 5
        }
        if (data && data.name) {
            const name = data.name
            // To center the text...
            sprite.textGraphic.x = name.length + 12
            sprite.textGraphic.text = name
        }
    }
}
// }