import { RpgModule, RpgServer, RpgPlayer, RpgServerEngine } from '@rpgjs/server'
import { SampleMap } from './maps/samplemap'
import { MapZ } from './maps/mapz'
import { CaveMap } from './maps/cave';
import databaseList from './database'
import { UpStage4 } from './database/items/upStage4';
import { UpStage5 } from './database/items/upStage5';
let serverEngine
@RpgModule<RpgServer>({
    maps: [
        SampleMap,
        MapZ,
        CaveMap,
    ],
    database: databaseList,
    player: {
        onConnected(player: RpgPlayer) {
            // yxtdf2
            player.on('gui.stage5', (e) => {
                player.addItem(UpStage5)
                player.showText("Your tree is ready to grow up!")
                console.log('upStage5')
            })
            player.on('gui.stage4', (e) => {
                player.addItem(UpStage4)
                player.showText("Your tree is ready to grow up!")
                console.log('upStage4')
            })
            player.setHitbox(20, 16)
            player.setGraphic('male1_2')
            if (!serverEngine.globalConfig.startMap) {
                player.changeMap('medieval')
            }
            player.setActor(databaseList.Hero)
        },
        onDisconnected(player: RpgPlayer) {
            // const json = player.save()
            // localStorage.setItem("player", json)
        },
    },
    engine: {
        onStart(engine: RpgServerEngine) {
            serverEngine = engine
        }
    }
})
export default class RpgServerModule { }