import {
    gql,
} from "@apollo/client";

const SEND_OTP = gql`
  mutation SEND_OTP($countryCode: String!, $phoneNumber: String!) {
    sendOtpForRegistration(data: { countryCode: $countryCode, phoneNumber: $phoneNumber }){
        id
        verified
    }
  }
`;

const VERIFY_OTP = gql`
  query VERIFY_OTP($id: ID!, $otp: String!) {
    verifyOtp(
      where: { id: $id } 
      otp: $otp
    ){
        id
        countryCode
        phoneNumber
        verified
    }
  }
`;

export {
    SEND_OTP,
    VERIFY_OTP,
};