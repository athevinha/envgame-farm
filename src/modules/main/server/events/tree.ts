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
            this.resfresh(player)
            this.setGraphic('tree')
        }
        async onAction(player: RpgPlayer) {
            const gui = await player.gui('tree')
            // player.showAnimation('farm', 'default')
            gui.open()
        }
        private resfresh(player) {
            if (player!.getVariable(name)) {
                let farm = player.getVariable('farm')
                farm++
                player.setVariable('farm', farm)
                this.direction++;
                if (this.direction >= 3) {
                    this.direction = 0
                }
            }
            else {
                this.direction = 0
                player.emit('event', { farm: 0 })
                player.setVariable('farm', 0)
            }
        }
    }
    return TreeEventClass
}