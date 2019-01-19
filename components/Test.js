import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

const POSTS_PER_PAGE = 10

function PostList ({
  data: { loading, error, hello }
}) {
  if (error) return <ErrorMessage message={error.message} />
  if (hello) {
    return (
      <section>{hello}</section>
    )
  }
  return <div>Loading</div>
}

export const allPosts = gql`
  {
    hello
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allPosts, {
  props: ({ data }) => ({
    data
  })
})(PostList)
