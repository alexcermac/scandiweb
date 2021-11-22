import { gql } from '@apollo/client'

export const LOAD_CATEGORIES = gql`
    query {
        categories {
            name
        }
    }
`

export const LOAD_ALL_PRODUCTS = gql`
    query {
        category {
          products {
            id
            category
            name
            gallery
            inStock
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices{
              amount
              currency
            }
            brand
          }
        }
    }
`

export const LOAD_PRODUCTS = gql`
    query ($category: CategoryInput!){
        category (input: $category){
          products {
            id
            category
            name
            gallery
            inStock
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices{
              amount
              currency
            }
            brand
          }
        }
    }
`

export const LOAD_PRODUCT_DETAILS = gql`
    query ($id: String!) {
        product (id: $id){
            id
            name
            inStock
            gallery
            description
            category
            attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
            }
            prices {
                currency
                amount
            }
            brand
        }
    }
`


export const LOAD_CURRENCIES = gql`
    query {
      currencies
    }
`