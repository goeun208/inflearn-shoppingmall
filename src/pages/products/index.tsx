import { useQuery } from "react-query"
import { graphqlFetcher, QueryKeys } from "../../queryClient"
import ProductItem from "../../components/product/item"
import GET_PRODUCTS, { PRODUCTS } from "../../graphql/products"

const ProductList = () => {
    const { data } = useQuery<PRODUCTS>(QueryKeys.PRODUCTS, () =>
        graphqlFetcher<PRODUCTS>(GET_PRODUCTS))

    return (
        <div>
            <h2>상품목록</h2>
            <ul className="products">
                {data?.products?.map(product => (
                    <ProductItem {...product} key={product.id} />
                ))}
            </ul>
        </div>
    )
}

export default ProductList