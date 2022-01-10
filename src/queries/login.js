import {
    gql,
} from "@apollo/client";

const AUTHENTICATE = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }){
        user{
            id
            name
            email
            phoneNumber
        }
        token
    }
  }
`;

export {
    AUTHENTICATE,
};