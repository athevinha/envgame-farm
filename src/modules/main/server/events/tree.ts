import { RpgEvent, EventData, RpgPlayer, EventMode, Direction } from '@rpgjs/server'
export function TreeEvent(options): object {

    const { name, text, gain } = options
    @EventData({
        name,
        mode: EventMode.Scenario,
        hitbox: {
            width: 32,
            height: 32
        }
    })
    class TreeEventClass extends RpgEvent {
        onInit(player: RpgPlayer) {
            player.setVariable('farm', 0)
            // this.resfresh(player)
            this.setGraphic('tree')
        }
        async onAction(player: RpgPlayer) {
            const gui = await player.gui('tree')
            // player.showAnimation('farm', 'default')
            gui.open()
        }

    }
    return TreeEventClass
}