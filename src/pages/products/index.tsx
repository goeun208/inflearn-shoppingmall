import { useQuery } from "react-query"
import { graphqlFetcher, QueryKeys } from "../../queryClient"
import GET_PRODUCTS, { PRODUCTS } from "../../graphql/products"
import ProductList from "../../components/product/list"

const ProductListPage = () => {
    const { data } = useQuery<PRODUCTS>(QueryKeys.PRODUCTS, () =>
        graphqlFetcher<PRODUCTS>(GET_PRODUCTS))

    return (
        <div>
            <h2>상품목록</h2>
            <ProductList list={data?.products || []} />
        </div>
    )
}

export default ProductListPage