import { gql } from 'graphql-tag'

export type PRODUCT = {
    id: string
    imageUrl: string
    price: number
    title: string
    description: string
    createdAt: number
}

export type PRODUCTS = {
    products: PRODUCT[]
}

const GET_PRODUCTS = gql`
    query GET_PRODUCTS($cursor: ID, $showDeleted: Boolean) {
        products(cursor: $cursor, showDeleted: $showDeleted) {
            id
            imageUrl
            price
            title
            description
            createdAt
        }
    }
`

export const GET_PRODUCT = gql`
    query GET_PRODUCT($id: ID!) {
        product(id: $id) {
            id
            imageUrl
            price
            title
            description
            createdAt
        }
    }
`

export default GET_PRODUCTS