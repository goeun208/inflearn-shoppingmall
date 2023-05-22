import { useInfiniteQuery } from "react-query"
import { graphqlFetcher, QueryKeys } from "../../queryClient"
import GET_PRODUCTS, { PRODUCTS } from "../../graphql/products"
import ProductList from "../../components/product/list"
import { useRef, useEffect } from "react"
import useIntersection from "../../components/hooks/useIntersection"

const AdminPage = () => {
    const fetchMoreRef = useRef<HTMLDivElement>(null)
    const intersecting = useIntersection(fetchMoreRef)

    const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PRODUCTS>(
        [QueryKeys.PRODUCTS, true],
        ({pageParam = ''}) =>
        graphqlFetcher<PRODUCTS>(GET_PRODUCTS, { cursor: pageParam, showDeleted: true }),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.products.at(-1)?.id
            }
        }
    )

    useEffect(() => {
        if(!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return
        fetchNextPage()
    }, [intersecting])

    return (
        <div>
            <h2>상품목록</h2>
            <ProductList list={data?.pages || []} />
            <div ref={fetchMoreRef} />
        </div>
    )
}

export default AdminPage