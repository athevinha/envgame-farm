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

        if (player.getItem(Fertillizer) && player.getItem(Water) && player.getItem(Mineral) && player.getItem(UpStage4)) {
            const gui = await player.gui('structure')
            gui.open()
        }
        else {
            await player.showText("You lack the element that makes the tree grow! When your tree grows to stage 4 then you can talk with me ")
        }
        // if (!player.getVariable('ASK_BROTHER')) {
        //     await player.showText('I think you should talk to my brother, he\'s in the northwestern part of the village.', {
        //         talkWith: this
        //     })
        //     return
        // }
        // if (player.getVariable('GAIN_GOLD')) {
        //     await player.showText('Were you able to buy the dungeon key?', {
        //         talkWith: this
        //     })
        //     return
        // }
        // const choice = await player.showChoices('My brother wants the key to the dungeon. To buy it, you must have gold. Do you want it?', [
        //     { value: true, text: 'Yes' },
        //     { value: false, text: 'No' }
        // ], {
        //     talkWith: this
        // })
        // if (choice && choice.value) {
        //     await player.showText('Here is 1000 Gold then!', {
        //         talkWith: this
        //     })
        //     player.gold += 1000
        //     player.setVariable('GAIN_GOLD', true)
        // }
        // else {
        //     await player.showText('Too bad for you!', {
        //         talkWith: this
        //     })
        // }
    }
}