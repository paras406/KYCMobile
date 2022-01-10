import {
    gql,
} from "@apollo/client";

const GET_KYC = gql`
  query Get {
      me {
         id
         name
         email
         aadharCardBack
         aadharCardFront
         panCard
         kycStatus
         phoneNumber
         countryCode
      }
  }
`;

export {
    GET_KYC,
};