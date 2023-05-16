import { gql } from 'graphql-tag'
export type CARTType = {
    amount: number
    id: string
    imageUrl: string
    price: number
    title: string
    createdAt: string
}

export const ADD_CART = gql`
    mutation ADD_CART($id: string) {
        id
        imageUrl
        price
        title
        createdAt
    }
`


export const GET_CART = gql`
    query GET_CART {
    id
    imageUrl
    price
    title
    createdAt
}
`