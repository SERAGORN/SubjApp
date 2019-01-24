import gql from "graphql-tag";
export default class LocalStore {
    constructor() {

    }

    localOne() {
        let obj = gql`
        query {
            currentSubject @client {
                count
                name
            }
        }`
        return obj
    }
}