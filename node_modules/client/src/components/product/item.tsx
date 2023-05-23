import { Link } from "react-router-dom";
import { PRODUCT } from "../../graphql/products";
import { useMutation } from "react-query";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";

const ProductItem = ({ id, imageUrl, price, title }:PRODUCT) => {

    const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }))

    return  (
    <li className="product-item">
        <Link to={`/products/${id}`}>
            <p className="product-item__title">{title}</p>
            <img className="product-item__image" src={imageUrl} />
            <span className="product-item__price">{price}원</span>
        </Link>
            <button className="product-item__add-cart" onClick={() => addCart(id)}>담기</button>
    </li>
    );
}

export default ProductItem