import { RpgEvent, EventData, RpgPlayer, EventMode, Direction } from '@rpgjs/server'
import { Fertillizer } from '../database/items/fertillizer';
import { Water } from '../database/items/water';
import { Mineral } from '../database/items/mineral';
import { UpStage4 } from '../database/items/upStage4';
import { UpStage5 } from '../database/items/upStage5';
export function FarmEvent(options): object {

    const { name, text, gain } = options
    const var_name = 'stt_' + name;
    const first_stage = 4;
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
            if (player.getVariable(var_name))
                player.setVariable(var_name, first_stage)
            this.setGraphic('farm')
            this.direction++;
            this.resfresh(player)
        }
        async onAction(player: RpgPlayer) {
            this.resfresh(player)
            player.setVariable(name, true)
        }
        private async resfresh(player) {
            if (player!.getVariable(name)) {
                let farm = player.getVariable(var_name)
                if (farm === 0 && player.hasItem(Water)) {
                    farm = 1
                    await player.showText("Your tree grows to stage 1!")
                }
                else if (farm === 1 && player.hasItem(Fertillizer)) {
                    farm = 2
                    await player.showText("Your tree grows to stage 2!")
                }
                else if (farm === 2 && player.hasItem(Mineral)) {
                    farm = 3
                    await player.showText("Your tree grows to stage 3!")
                }
                else if (farm === 3) {
                    // player.addItem(UpStage4)
                    if (player.hasItem(UpStage4)) {
                        farm = 4
                        player.removeItem(UpStage4, 5)
                        await player.showText("Your tree grows to stage 4!")
                    }
                    else {
                        await player.showText("Your tree is disease, use AI model to predict and cures the disease for tree!")
                        const gui = await player.gui('farm')
                        await gui.open({ farm_val: var_name })
                    }

                }
                else if (farm === 4) {
                    if (player.hasItem(UpStage5)) {
                        farm = 5
                        await player.showText("Your tree grows to stage 5!")
                    }
                    else {
                        await player.showText("Your tree is badly damaged because of too many diseases, find ways to take care of the tree with REM!")
                    }
                }
                else if (farm === 5) {
                    await player.showText("Congratulations on being able to harvest green plants")
                    farm = 0
                }
                else {
                    await player.showText("You lack the element that makes the tree grow!")
                    // farm++
                }
                player.setVariable(var_name, farm)
                player.emit('set_local_store', { farm: farm, local: var_name })
                this.direction++;
                if (this.direction >= 3) {
                    this.direction = 0
                }
            }
            else {
                this.direction = 0
                player.emit('set_local_store', { farm: first_stage, local: var_name })
                player.setVariable(var_name, first_stage)
            }
        }
    }
    return FarmEventClass
}