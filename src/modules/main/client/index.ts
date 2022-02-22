import { RpgModule, RpgClient } from '@rpgjs/client'
import { MedievalTilesets } from './maps/medieval'
import Characters from './characters'
import { Images } from './images'
import { Musics, Sounds } from './sounds'
import { Animations } from './animations'
import ai from './gui/ai.vue'
import rem from './gui/rem.vue'
import farm from './gui/farm.vue'
import { RpgSceneMapHooks, RpgSceneMap } from "@rpgjs/client";
import { sceneMap } from './hooks/scene'
import { sprite } from './hooks/sprite'
@RpgModule<RpgClient>({
    spritesheets: [
        MedievalTilesets,
        ...Characters,
        Images,
        Animations,
    ],
    sounds: [
        Musics,
        Sounds
    ],
    gui: [
        ai,
        rem,
        farm
    ],
    scenes: {
        map: sceneMap

    },
    engine: {
        onConnected(engine: RpgClientEngine, socket: any) {
            console.log("ádadasdas")
            socket.on('event', (arg) => {
                console.log(arg.farm)
                alert('hi')
                localStorage.setItem("farm", arg.farm)
            })
        }
    },
    sprite
})
export default class RpgClientEngine { }