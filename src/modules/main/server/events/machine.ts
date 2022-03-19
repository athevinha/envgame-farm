import { RpgEvent, EventData, RpgPlayer, EventMode, Direction } from '@rpgjs/server'

export function ChestEvent(options): object {

    const { name, text, gain } = options

    @EventData({
        name,
        mode: EventMode.Scenario,
        hitbox: {
            width: 32,
            height: 16
        }
    })
    class ChestEventClass extends RpgEvent {
        onInit(player: RpgPlayer) {
            this.resfresh(player)
            this.setGraphic('male4_1')
            // this.setGraphic('chest')
        }
        async onAction(player: RpgPlayer) {
            await player.gui('machine').open()

        }
        private resfresh(player) {
            if (player.getVariable(name)) {
                this.changeDirection(Direction.Up)
            }
            else {
                this.changeDirection(Direction.Down)
            }
        }
    }
    return ChestEventClass
}