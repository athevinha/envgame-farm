import { RpgMap, MapData } from '@rpgjs/server'
import { NpcEvent } from '../events/npc'
import { ShopEvent } from '../events/shop'
import { Villager1Event } from '../events/ev1';
import { Villager4Event } from '../events/ev4';
import { ChestEvent } from '../events/machine';
import { FarmEvent } from '../events/farm';
import { Potion } from '../database/items/potion';
import { } from '../database/items/water';
import { TreeEvent } from '../events/tree';
let events: object[]
events = [
    Villager1Event,
    Villager4Event,
    NpcEvent({
        name: 'AI Prediction',
        text: 'I find this city very quiet!',
        graphic: 'female13',
        type: "ai"
        // moveRandom: true
    }),
    NpcEvent({
        name: 'REM',
        text: 'It is beautiful today!',
        graphic: 'female19',
        type: "rem"
        // moveRandom: true
    }),
    ShopEvent,
    ChestEvent({
        name: 'machine',
        text: 'You got a potion!',
        gain: {
            item: Potion
        }
    }),
    // TreeEvent({
    //     name: 'tree',
    //     text: 'here is farmádas',
    //     gain: {
    //         item: Potion
    //     }
    NpcEvent({
        name: 'Water',
        text: 'You got a water!',
        graphic: 'male4_1',

    }),
    NpcEvent({
        name: "Fertillizer",
        text: 'You got a fertillizer!',
        graphic: 'male17',
    }),
];
// render muti farm 
let farms: string[]
farms = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
events = events.concat(farms.map((farm: string) => {
    return FarmEvent({
        name: "farm-" + farm,
        text: 'here is farm',
        gain: {
            item: Potion
        }
    })
}));
// render muti tree
let trees: string[]
trees = ["1", "2", "3", "4", "5"]
events = events.concat(trees.map((tree: string) => {
    return TreeEvent({
        name: "tree-" + tree,
        text: 'here is tree',
        gain: {
            item: Potion
        }
    })
}));
// console.log(events)
@MapData({
    id: 'medieval',
    file: require('./tmx/samplemap.tmx'),
    name: 'Town',
    events: events,
    sounds: ['town']
})
export class SampleMap extends RpgMap {
}