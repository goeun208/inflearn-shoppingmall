import ProductItem from "./item"
import { PRODUCT } from "../../graphql/products"

const ProductList = ({list}: {list: PRODUCT[]}) => (
    <ul className="products">
        {list.map(product => (
            <ProductItem {...product} key={product.id} />
        ))}
    </ul>
)

export default ProductList