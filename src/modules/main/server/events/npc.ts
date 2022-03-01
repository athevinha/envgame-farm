import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'
import { Fertillizer } from '../database/items/fertillizer';
import { Water } from '../database/items/water';
import { Mineral } from '../database/items/mineral';

export function NpcEvent(options: {
    text: string | string[],
    name: string,
    graphic: string,
    type?: string
    moveRandom?: boolean,
    frequency?: number,
    speed?: number,
    gain?: object,
}): object {
    @EventData({
        name: options.name,
        hitbox: {
            width: 32,
            height: 16
        }
    })

    class NpcEvent extends RpgEvent {
        onInit() {
            this.speed = options.speed || 1
            this.frequency = options.frequency || 200
            this.setGraphic(options.graphic)
            if (options.moveRandom) this.infiniteMoveRoute([Move.tileRandom()])
        }
        async onChanges(player: RpgPlayer) {
            //  await player.callMainMenu()
            player.setVariable('FARM', 0)
        }
        async onAction(player: RpgPlayer) {
            if (options.type) {
                const gui = await player.gui(options.type)
                gui.on('accept', () => {
                    player.allRecovery()
                })
                gui.open()
            }
            else if (options.name == "Water") {
                if (player.hasItem(Water)) {
                    await player.showText('Your already have water, Let`s pour water on the tree!')
                }
                else {
                    player.addItem(Water);
                    await player.showText('Your got water, Let`s pour water on the tree!')
                }
            }
            else if (options.name == "Fertillizer") {
                if (player.hasItem(Fertillizer)) {
                    await player.showText('Your already have fertillizer, Let`s fertilize the tree!')
                }
                else {
                    if (player.hasItem(Water)) {
                        player.addItem(Fertillizer);
                        await player.showText('Your got fertillizer, Let`s fertilize the tree!')
                    }
                    else {
                        await player.showText('Your need water first!')
                    }
                }

            }
        }
    }
    return NpcEvent
}