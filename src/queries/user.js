import {
  gql,
} from "@apollo/client";

const GET_USERS = gql`
  query GetUsers($microSeller: ID!) {
    usersConnection(
      where: {
        microSeller: {
         id: $microSeller,
        }  
      }
      orderBy: createdAt_DESC, first:10
    ) {
        edges{
          node{
            id
            name
            email
            phoneNumber
            categories{
              id
              name
            }
            subCategories{
              id
              name
            }
            createdAt
          }
        }
        aggregate{
          count
        }
        pageInfo{
          hasNextPage
        }
      }
    }
`;

const ADD_USER = gql`
  mutation ADD_USER(
    $name: String!,
    $phoneNumber: String!,
    $countryCode: String!,
    $email: String!,
    $role: Role!,
    $microSeller: ID!,
    $categoryId: ID!,
    $subCategoryId: ID!,
    ) {
    addMicroSellerUser(data: { 
      name: $name,
      phoneNumber: $phoneNumber,
      countryCode: $countryCode,
      email: $email,
      role: $role,
      microSeller: $microSeller,
      categoryId: $categoryId,
      subCategoryId: $subCategoryId,
      }){
        id
    }
  }
`;

const DELETE_USER = gql`
mutation DELETE_USER($id: ID!)
 { deleteMicroSellerUser(where: $id){
      id
    }
 }
`;

const EDIT_USER = gql`
mutation EDIT_USER(
  $name: String!,
  $phoneNumber: String!,
  $countryCode: String!,
  $email: String!,
  $role: Role!,
  $id: ID!,
  $categoryId: ID!,
  $subCategoryId: ID!,
  ) {
  updateMicroSellerUser(
  where: $id,  
  data: { 
    name: $name,
    phoneNumber: $phoneNumber,
    countryCode: $countryCode,
    email: $email,
    role: $role,
    categoryId: $categoryId,
    subCategoryId: $subCategoryId,
    }){
      id
  }
}
`;

export {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
};