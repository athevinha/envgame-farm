import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'
import { Fertillizer } from '../database/items/fertillizer';
import { Water } from '../database/items/water';
import { Mineral } from '../database/items/mineral';
import { UpStage4 } from '../database/items/upStage4';
@EventData({
    name: 'Data Structure',
    hitbox: {
        width: 32,
        height: 16
    }
})
export class Villager4Event extends RpgEvent {
    onInit() {
        this.speed = 2
        this.frequency = 300
        this.setGraphic('male17')
        this.infiniteMoveRoute([Move.tileRandom()])
    }
    async onAction(player: RpgPlayer) {
        const gui = await player.gui('structure')
        gui.open()
    }
}