import { CARTType } from "../../graphql/cart"

const CartItem = ({id, imageUrl, price, title, amount}: CARTType) => (
    <li>
        {id} {imageUrl} {price} {title} {amount}
    </li>
)

export default CartItem