import ProductItem from "./item"
import { PRODUCT } from "../../graphql/products"

const ProductList = ({
    list
}: {
    list: { 
        products: PRODUCT[]
    }[] 
}) => (
    <ul className="products">
        {list.map(page => page.products.map(product => 
            <ProductItem {...product} key={product.id} />
        ))}
    </ul>
)

export default ProductList