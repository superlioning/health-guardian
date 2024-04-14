import { gql } from '@apollo/client';

// Mutation to add a new user
export const ADD_USER = gql`
  mutation AddUser($roleId: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(roleId: $roleId, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      roleId
      firstName
      lastName
      email
    }
  }
`;

// Mutation to update an existing user
export const UPDATE_USER = gql`
  mutation UpdateUser($_id: String!, $roleId: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    updateUser(_id: $_id, roleId: $roleId, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      roleId
      firstName
      lastName
      email
    }
  }
`;

// Mutation to delete an existing user
export const DELETE_USER = gql`
  mutation DeleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
      roleId
      firstName
      lastName
      email
    }
  }
`;

// Mutation for user login
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      roleId
      firstName
      lastName
      email
    }
  }
`;

// mutation to add patient data record
export const ADD_PATIENTDATA = gql`
  mutation AddPatientData($patientId: String!, $fullName: String!, $date: String!, $bodyTemp: String!, $heartRate: String!, $bloodPressure: String!, $respiratoryRate: String!) {
    addPatientData(patientId: $patientId, fullName: $fullName, date: $date, bodyTemp: $bodyTemp, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
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

//mutation to update patient data record
export const UPDATE_PATIENTDATA = gql`
  mutation UpdatePatientData($_id: String!,$patientId: String!, $fullName: String!, $date: String!, $bodyTemp: String!, $heartRate: String!, $bloodPressure: String!, $respiratoryRate: String!) {
    updatePatientData(_id: $_id, patientId: $patientId, fullName: $fullName, date: $date, bodyTemp: $bodyTemp, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
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
// mutation to delete patient data record
export const DELETE_PATIENTDATA = gql`
  mutation DeletePatientData($_id: String!) {
    deletePatientData(_id: $_id) {
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
