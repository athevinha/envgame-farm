import { RpgSceneMapHooks, RpgSceneMap } from "@rpgjs/client";
import { RpgGui } from '@rpgjs/client'
export const sceneMap: RpgSceneMapHooks = {
  onAfterLoading(scene: RpgSceneMap) {
    scene.valuesChange.subscribe((obj) => {
      // if (RpgGui.exists('rem')) {
      //   RpgGui.hide('ai')
      // }
      // if (RpgGui.exists('rem')) {
      //   RpgGui.hide('rem')
      // }
    })
  },
};