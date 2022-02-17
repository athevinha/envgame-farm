import { RpgEvent, EventData, RpgPlayer, EventMode, Direction } from '@rpgjs/server'
export function FarmEvent(options): object {

    const { name, text, gain } = options
    console.log("?")
    let farm = 0
    @EventData({
        name,
        mode: EventMode.Scenario,
        hitbox: {
            width: 32,
            height: 32
        }
    })
    class FarmEventClass extends RpgEvent {
        onInit(player: RpgPlayer) 
        {
            this.resfresh(player)
            this.setGraphic('farm')
        }
        async onAction(player: RpgPlayer) {
            // if (player.getVariable(name)) {
            //     return
            // }
            // if (player.getDirection() != Direction.Up) {
            //     return
            // }
            // await player.showText(text) 
            player.addItem(gain.item)
            player.setVariable(name, true)
            this.resfresh(player)
        }
        private resfresh(player) {
            console.log(this)
            let FD = {
                Center: "Center",
                ...Direction
            } 
            this. = FD
            // player.speed = 10
            if (player.getVariable(name)) {
                // farm++ 
                this.direction++
            }
            else{
                this.direction = 0
                // this.changeDirection(Direction.Down) 
            }
        }
    }
    return FarmEventClass
}