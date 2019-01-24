import gql from 'graphql-tag'

export default gql`
    mutation updateSubject($index: String!, $value: String!) {
        updateSubject(index: $index, value: $value) @client {
            name
            count
        }
    }
`