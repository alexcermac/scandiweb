import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
  from
} from "@apollo/client"
import { ApolloProvider } from 'react-apollo'
import { onError } from '@apollo/client/link/error'
import { Provider } from 'react-redux'
import store from './store'

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if(graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error: ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost:4000'
  })
])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);