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

const UPDATE_KYC = gql`
mutation UPDATE_KYC($kycStatus: KycStatus!, $aadharCardBack: String!, $aadharCardFront: String!, $panCard: String!) {
    updateMicroSeller(data: { kycStatus: $kycStatus, aadharCardBack: $aadharCardBack, aadharCardFront: $aadharCardFront, panCard: $panCard }){
        id
    }
  }
`;

export {
    GET_KYC,
    UPDATE_KYC,
};