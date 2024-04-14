import { gql } from '@apollo/client';

// Query to find one user by ID
export const GET_USER_BY_ID = gql`
  query User($_id: String!) {
    user(_id: $_id) {
      _id
      roleId
      firstName
      lastName
      email
      password
    }
  }
`;

// Query to find one user by Email
export const GET_USER_BY_EMAIL = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      roleId
      firstName
      lastName
      email
      password
    }
  }
`;

// Query to find all users
export const GET_USERS = gql`
  query Users{
    users {
      _id
      roleId
      firstName
      lastName
      email
      password
    }
  }
`;

// Query to find all users by role ID
export const GET_USERS_BY_ROLE_ID = gql`
  query UsersByRoleId($roleId: String!) {
    usersByRoleId(roleId: $roleId) {
      _id
      roleId
      firstName
      lastName
      email
      password
    }
  }
`;

// Query to find one patient's data by ID
export const GET_ONE_DATA_BY_ID = gql`
  query OneDataRecord($_id: String!) {
    oneDataRecord(_id: $_id) {
      _id
      patientId
      fullName
      date
      bodyTemp
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

// Query to find all records of a single patient by patient id
export const GET_RECORDS_BY_PATIENT_ID = gql`
  query OnePatientsData($patientId: String!) {
    onePatientsData(patientId: $patientId) {
      _id
      patientId
      fullName
      date
      bodyTemp
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

// Query to find all records
export const GET_RECORDS = gql`
  query Records{
    allDataRecords {
      _id
      patientId
      fullName
      date
      bodyTemp
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;