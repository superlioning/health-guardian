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