import { CARTType } from "../../graphql/cart"
import CartItem from "./item"

const CartList = ({items}: {items: CARTType[]}) => {
    console.log('llllllllllist!!!', items)
    return (
        <ul>
            {items.map(item => <CartItem {...item} key={item.id} />)}
        </ul>
    )
}

export default CartList