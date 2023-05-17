import { useQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../queryClient"
import { CARTType, GET_CART } from "../../graphql/cart"
import CartList from "../../components/cart"
import { useEffect } from "react"

const Cart = () => {

    const { data } = useQuery<CARTType[]>(QueryKeys.CART, () => graphqlFetcher<CARTType[]>(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    }) // 장바구니가 비었을 경우 상품을 담고 다시 와도 초기에 불러온 빈 데이터를 나타내기 때문에 캐시를 도입한다
    
    const cartItems = Object.values(data || {}) as CARTType[]

    if(!cartItems.length) return <div>장바구니가 비었어요</div>

    return <CartList items={cartItems} />
}

export default Cart