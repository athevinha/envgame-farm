import { Item } from '@rpgjs/database'

@Item({
    name: 'Water',
    description: 'Use to make a tree from stage 1 -> stage 2',
    price: 1000,
    consumable: false
})
export class Water { }