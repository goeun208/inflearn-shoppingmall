import { useQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../queryClient"
import { CARTType, GET_CART } from "../../graphql/cart"
import CartList from "../../components/cart"
import { useEffect } from "react"

const Cart = () => {

    const { data } = useQuery<CARTType[]>(QueryKeys.CART, () => graphqlFetcher<CARTType[]>(GET_CART))
    
    if(!data) return <div>장바구니가 비었어요</div>
    
    const cartItems = Object.values(data) as CARTType[]

    return <CartList items={cartItems} />
}

export default Cart