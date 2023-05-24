import { gql } from 'graphql-tag'
import { PRODUCT } from './products'

export type CART = {
  cart: CARTType[]
} 

export type CARTType = {
  amount: number
  id: string
  product: PRODUCT
}

export const GET_CART = gql`
    query GET_CART {
      cart {
          id
          amount
          product {
            id
            imageUrl
            price
            title
            description
            createdAt
          }
      }
    
}
`

export const ADD_CART = gql`
    mutation ADD_CART($id: ID!) {
      addCart(productId: $id) {
        id
        amount
        product {
          id
          imageUrl
          price
          title
          description
          createdAt
        }
      }
    }
`
export const UPDATE_CART = gql`
mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(cartId: $id, amount: $amount) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`

export const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!){
    deleteCart(cartId: $id) 
  }
`



