import {
    gql,
} from "@apollo/client";

const GET_CATEGORIES = gql`
  query Get {
    categories{
      id
      name
      subCategories{
        id
        name
      }
    }
  }
`;

export {
  GET_CATEGORIES,
};