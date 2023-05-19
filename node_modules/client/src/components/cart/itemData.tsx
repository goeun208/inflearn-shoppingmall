import { CARTType } from "../../graphql/cart"

const ItemData = ({imageUrl, price, title}: Pick<CARTType, 'imageUrl' | 'price' | 'title'> ) => (
    <>
        <img className="cart-item__image" src={imageUrl} />
        <p className="car-item__price">{price}</p>
        <p className="cart-item__title">{title}</p>
    </>
)

export default ItemData