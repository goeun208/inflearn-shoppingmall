import { PRODUCT } from "../../graphql/products"

const ItemData = ({imageUrl, price, title}: Pick<PRODUCT, 'imageUrl' | 'price' | 'title'> ) => (
    <>
        <img className="cart-item__image" src={imageUrl} />
        <p className="car-item__price">{price}</p>
        <p className="cart-item__title">{title}</p>
    </>
)

export default ItemData