import { RpgModule, RpgClient } from '@rpgjs/client'
import { MedievalTilesets } from './maps/medieval'
import Characters from './characters'
import { Images } from './images'
import { Musics, Sounds } from './sounds'
import { Animations } from './animations'
import ai from './gui/ai.vue'
import rem from './gui/rem.vue'
import tree from './gui/tree.vue'
import farm from './gui/farm.vue'
import structure from './gui/structure.vue'
import machine from './gui/machine.vue'
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
        structure,
        ai,
        rem,
        farm,
        tree,
        machine
    ],
    scenes: {
        map: sceneMap
    },
    engine: {
        onConnected(engine: RpgClientEngine, socket: any) {
            socket.on('set_local_store', (arg) => {
                localStorage.setItem(arg.local, arg.farm)
                localStorage.setItem('farm', arg.local)
                console.log('local_client:', localStorage.getItem(arg.local))
            })
        }
    },
    sprite
})
export default class RpgClientEngine { }