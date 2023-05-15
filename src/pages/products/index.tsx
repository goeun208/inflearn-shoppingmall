import { useQuery } from "react-query"
import { fetcher, QueryKeys } from "../../queryClient"
import { Product } from "../../types"
import ProductItem from "../../components/product/item"
const ProductList = () => {
    const { data }:any = useQuery<Product[]>(QueryKeys.PRODUCTS, () => fetcher({
        method: 'GET',
        path: '/products',
    }))

    return (
        <div>
            <ul>
               {data?.map((product:Product) => {
                    <ProductItem {...product} key={product.id} />
               })}
            </ul>
        </div>
    )
}

export default ProductList