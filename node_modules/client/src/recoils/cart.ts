import { atom, selectorFamily } from "recoil";
import { CARTType } from "../graphql/cart";

export const checkedCartState = atom<CARTType[]>({
    key: 'cartState',
    default: []
})