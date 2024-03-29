import { useMutation } from "react-query"
import { CARTType, DELETE_CART, UPDATE_CART } from "../../graphql/cart"
import { QueryKeys, getClient, graphqlFetcher } from "../../queryClient"
import { forwardRef, ForwardedRef, SyntheticEvent } from "react"
import ItemData from "./itemData"

const CartItem = ({ id, imageUrl, price, title, amount }: CARTType, ref: ForwardedRef<HTMLInputElement>) => {

    const queryClient = getClient()
    const { mutate: updateCart } = useMutation(
        ({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
        {
            onMutate: async ({ id, amount }) => {
                await queryClient.cancelQueries(QueryKeys.CART)
                const prevCart = queryClient.getQueryData<{ [key: string]: CARTType }>(QueryKeys.CART)
                if (!prevCart?.[id]) return prevCart

                const newCart = {
                    ...(prevCart || {}),
                    [id]: { ...prevCart[id], amount },
                }
                queryClient.setQueryData(QueryKeys.CART, newCart)
                return prevCart
            },
            onSuccess: newValue => {
                const prevCart = queryClient.getQueryData<{ [key: string]: CARTType }>(QueryKeys.CART)
                const newCart = {
                    ...(prevCart || {}),
                    [id]: { ...(newValue as Object) },
                }
                queryClient.setQueryData(QueryKeys.CART, newCart)
            },
        },
    )

    const { mutate: deleteCart } = useMutation(({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.CART)
            }
        }
    )

    const handleUpdateAmount = (e: SyntheticEvent) => {
        const amount = Number((e.target as HTMLInputElement).value)
        if (amount < 1) return
        updateCart({ id, amount })
    }

    const handleDeleteItem = () => {
        deleteCart({ id })
    }

    return (
        <li className="cart-item">
            <input className="cart-item__checkbox" type="checkbox" name="select-item" ref={ref} />
            <ItemData imageUrl={imageUrl} price={price} title={title} />
            <input
                className="cart-item__amount"
                type="number"
                value={amount}
                min={1}
                onChange={handleUpdateAmount}
            />
            <button className="cart-item__button" type="button" onClick={handleDeleteItem}>
                삭제
            </button>
        </li>
    )
}

export default forwardRef(CartItem)