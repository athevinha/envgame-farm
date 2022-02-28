import { RpgEvent, EventData, RpgPlayer, EventMode, Direction } from '@rpgjs/server'
export function FarmEvent(options): object {

    const { name, text, gain } = options
    const var_name = 'stt_' + name;
    @EventData({
        name,
        mode: EventMode.Scenario,
        hitbox: {
            width: 32,
            height: 32
        },
    })
    class FarmEventClass extends RpgEvent {
        onInit(player: RpgPlayer) {
            player.setVariable(var_name, 0)
            this.direction++;
            this.resfresh(player)
            this.setGraphic('farm')
        }
        async onAction(player: RpgPlayer) {
            const gui = await player.gui('farm')
            // player.showAnimation('farm', 'default')
            player.addItem(gain.item)
            this.resfresh(player)
            player.setVariable(name, true)
            gui.open()
            player.emit('event', { farm: player.getVariable(var_name), local: var_name })
        }
        private resfresh(player) {
            if (player!.getVariable(name)) {
                let farm = player.getVariable(var_name)
                farm++
                player.setVariable(var_name, farm)
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
    return FarmEventClass
}