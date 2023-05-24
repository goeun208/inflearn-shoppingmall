import { SyntheticEvent } from "react"
import { useMutation } from "react-query";
import { ADD_PRODUCT, MutableProduct } from "../../graphql/products";
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient";
import arrToObj from "../../util/arrToObj";

const AddForm = () => {
    const queryClient = getClient()
    const { mutate: addProduct } = useMutation(
        ({ title, imageUrl, price, description }: MutableProduct) => graphqlFetcher
        (ADD_PRODUCT, { title, imageUrl, price, description }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
                    exact: false,
                    refetchInactive: true
                })
            },
        },
    )

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const formData = arrToObj([...new FormData(e.target as HTMLFormElement)])
        formData.price = Number(formData.price)
        addProduct(formData as MutableProduct)
    }
    return (
        <form onSubmit={handleSubmit} className="admin-item">
            <div className="admin-item__box">
                <label>상품명: <input name="title" type="text" required /></label>
                <label>이미지URL: <input name="imageUrl" type="text" required /></label>
                <label>상품가격: <input name="price" type="number" required min="1000" /></label>
                <label>상세: <textarea name="description" /></label>
            </div>
            
            <button type="submit">등록</button>
        </form>
    )
}

export default AddForm