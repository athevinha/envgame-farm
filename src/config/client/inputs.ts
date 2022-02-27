import { Input, Control } from '@rpgjs/client'
import { RpgGui } from '@rpgjs/client'
export const inputs = {
    [Control.Up]: {
        repeat: true,
        bind: Input.Up
    },
    [Control.Down]: {
        repeat: true,
        bind: Input.Down
    },
    [Control.Right]: {
        repeat: true,
        bind: Input.Right
    },
    [Control.Left]: {
        repeat: true,
        bind: Input.Left
    },
    [Control.Action]: {
        bind: [Input.Space, Input.Enter]
    },
    mycustom2: {
        bind: Input.Escape,
        method({ actionName }) {
            RpgGui.hide('ai')
            RpgGui.hide('rem')
            RpgGui.hide('farm')
            RpgGui.hide('structure')
            RpgGui.hide('tree')
        }
    }

}