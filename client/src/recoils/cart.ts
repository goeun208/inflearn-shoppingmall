import { atom } from "recoil";
import { CARTType } from "../graphql/cart";

export const checkedCartState = atom<CARTType[]>({
    key: 'cartState',
    default: []
})