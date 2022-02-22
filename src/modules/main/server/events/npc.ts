import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'


export function NpcEvent(options: {
    text: string | string[],
    name: string,
    graphic: string,
    type?: string
    moveRandom?: boolean,
    frequency?: number,
    speed?: number,
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
            // await player.callMainMenu()
            if (options.type) {
                const gui = await player.gui(options.type)
                gui.on('accept', () => {
                    player.allRecovery()
                })
                gui.open()
            }

            // let text = options.text
            // if (typeof text == 'string') text = [text]
            // for (let msg of text) {
            //     await player.showText(msg, {
            //         talkWith: this
            //     })
            // }
        }
    }
    return NpcEvent
}