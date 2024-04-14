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

// Mutation to add health data
export const ADD_HEALTH_DATA = gql`
  mutation AddHealthData(
    $patientId: String!,
    $fullName: String!,
    $date: String!,
    $bodyTemp: String!,
    $heartRate: String!,
    $bloodPressure: String!,
    $respiratoryRate: String!
  ) {
    addHealthData(
      patientId: $patientId,
      fullName: $fullName,
      date: $date,
      bodyTemp: $bodyTemp,
      heartRate: $heartRate,
      bloodPressure: $bloodPressure,
      respiratoryRate: $respiratoryRate
    ) {
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