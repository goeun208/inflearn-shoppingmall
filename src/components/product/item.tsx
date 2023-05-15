import { Product } from "../../types"

const ProductItem = ({ category, description, image, price, rating, title }:Product) => {
    return  (
    <li>
        <p>{category}</p>
        <p>{title}</p>
        <p>{description}</p>
        <img src={image} />
        <span>${price}</span>
        <span>{rating.rate}</span>
    </li>
    );
}

export default ProductItem