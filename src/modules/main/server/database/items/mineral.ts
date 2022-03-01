import { Item } from '@rpgjs/database'

@Item({
    name: 'Mineral',
    description: 'Use to make tree from stage 2 -> stage 3',
    price: 1000,
    consumable: false
})
export class Mineral { }