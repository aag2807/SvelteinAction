import {action} from '@storybook/addon-actions'
import Item from '../components/Item.svelte';
import '../../public/global.css';


export default {title: 'Item'}

const getOptions = packed => ({
    Component:Item,
    props: {
        categoryID: 1,
        dnd: {},
        item: {id:2, name:'ssocks', packed}
    },
    on: {delete: action('item delete dispatched')}
})

export const unpacked = () => getOptions(false)
export const packed = () => getOptions(true)
