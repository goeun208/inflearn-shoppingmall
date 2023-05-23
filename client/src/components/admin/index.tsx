import { useInfiniteQuery } from "react-query"
import { graphqlFetcher, QueryKeys } from "../../queryClient"
import GET_PRODUCTS, { PRODUCTS } from "../../graphql/products"
import { useState, useRef, useEffect } from "react"
import useIntersection from "../../components/hooks/useIntersection"
import AddForm from "../../components/admin/addForm"
import AdminList from "./list"

const Admin = () => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const fetchMoreRef = useRef<HTMLDivElement>(null)
    const intersecting = useIntersection(fetchMoreRef)

    const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PRODUCTS>(
        [QueryKeys.PRODUCTS, 'admin'],
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

    const startEdit = (index: number) => () => setEditingIndex(index)
    const doneEdit = () => setEditingIndex(null)

    return (
        <div>
            <AddForm />
            <AdminList list={data?.pages || []} editingIndex={editingIndex} startEdit={startEdit} doneEdit={doneEdit} />
            <div ref={fetchMoreRef} />
        </div>
    )
}

export default Admin