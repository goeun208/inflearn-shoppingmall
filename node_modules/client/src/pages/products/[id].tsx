import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { QueryKeys, graphqlFetcher } from "../../queryClient"
import ProductDetail from "../../components/product/datail"
import { GET_PRODUCT, PRODUCT } from "../../graphql/products"

const ProductDetailPage = () => {
    const { id } = useParams()

    const { data } = useQuery<{ product: PRODUCT}>([QueryKeys.PRODUCTS, id], () =>
        graphqlFetcher<{ product: PRODUCT}>(GET_PRODUCT, { id }))

    if (!data) return null;

    return (
        <div>
            <h2>상품상세</h2>
            <ProductDetail item={data.product} />
        </div>
    )
}

export default ProductDetailPage