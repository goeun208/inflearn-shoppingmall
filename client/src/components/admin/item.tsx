import { Link } from "react-router-dom";
import { DELETE_PRODUCT, MutableProduct, PRODUCT, UPDATE_PRODUCT } from "../../graphql/products";
import { useMutation } from "react-query";
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient";
import { SyntheticEvent } from "react";
import arrToObj from "../../util/arrToObj";

const AdminItem = ({ id, imageUrl, price, title, description, createdAt, isEditing, startEdit, doneEdit }: PRODUCT & {
    isEditing: boolean;
    startEdit: () => void;
    doneEdit: () => void;
}) => {

    const queryClient = getClient()
    const { mutate: updateProduct } = useMutation(
        ({ title, imageUrl, price, description }: MutableProduct) =>
            graphqlFetcher(UPDATE_PRODUCT, { id, title, imageUrl, price, description }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
                    exact: false,
                    refetchInactive: true,
                })
                doneEdit()
            }
        })

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const formData = arrToObj([...new FormData(e.target as HTMLFormElement)])
        formData.price = Number(formData.price)
        updateProduct(formData as MutableProduct)
    }

    const { mutate: deleteProduct } = useMutation(
        ({ id }: { id: string }) =>
            graphqlFetcher(DELETE_PRODUCT, { id }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
                    exact: false,
                    refetchInactive: true,
                })
                doneEdit()
            }
        })

    const deleteItem = () => {
        deleteProduct({id})
    }

    if (isEditing)
        return (
            <li className="product-item">
                <form onSubmit={handleSubmit}>
                    <div><label>
                        상품명: <input name="title" type="text" required defaultValue={title} />
                    </label></div>
                    <div><label>
                        이미지URL: <input name="imageUrl" type="text" required defaultValue={imageUrl} />
                    </label></div>
                    <div><label>
                        상품가격: <input name="price" type="number" required min="1000" defaultValue={price} />
                    </label></div>
                    <div><label>
                        상세: <textarea name="description" defaultValue={description} />
                    </label></div>
                    <button type="submit">저장</button>
                </form>
            </li>
        )

    return (
        <li className="product-item">
            <Link to={`/products/${id}`}>
                <p className="product-item__title">{title}</p>
                <img className="product-item__image" src={imageUrl} />
                <span className="product-item__price">{price}원</span>
            </Link>
            {!createdAt && <span>삭제된 상품</span>}
            <button className="product-item__add-cart" onClick={startEdit}>수정</button>
            <button className="product-item__delete-cart" onClick={deleteItem}>삭제</button>
        </li>
    );
}

export default AdminItem