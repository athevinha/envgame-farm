import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'
import { Fertillizer } from '../database/items/fertillizer';
import { Water } from '../database/items/water';
import { Mineral } from '../database/items/mineral';

@EventData({
    name: 'Village Chief',
    hitbox: {
        width: 32,
        height: 16
    }
})
export class Villager1Event extends RpgEvent {
    onInit() {
        this.setGraphic('male12')
    }
    async onAction(player: RpgPlayer) {
        // if (player.getVariable("ISPLAY")) {
        //     await player.showText("Well come to FES, Farm Education Simulator -- @Envgame")
        // }
        // else {
        if (player.hasItem(Fertillizer) && player.hasItem(Water) && !player.hasItem(Mineral)) {
            player.addItem(Mineral)
            await player.showText("Your got mineral, let provide minerals for plants!")
        }
        else if (!player.hasItem(Fertillizer) && !player.hasItem(Water)) {
            await player.showText("You lack fertilizer and water. Once you have it, come see me for minerals!")
        }
        else if (player.hasItem(Water)) {
            await player.showText("You already have minerals, let provide minerals for plants!")
        }

        // }

    }
}