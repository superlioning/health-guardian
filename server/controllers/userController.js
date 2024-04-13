const User = require('../models/userModel')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')


/**
 * Implenent GraphQL to design user controller
 * Define a UserType for user model
 * Define a RootQueryType to query users database
 * Define a RootMutationType to perform mutations on users  
 */


// UserType with data fields
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user who is either a nurse or a patient',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        roleId: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    })
})

// RootQueryType with three query methods
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({

        // Find one user by MongoDB default _id
        user: {
            type: UserType,
            description: 'A user by ID',
            args: {
                _id: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                try {
                    const user = await User.findById(args._id);
                    if (!user) {
                        throw new Error('User not found');
                    }
                    return user;
                } catch (error) {
                    throw new Error('Failed to fetch user');
                }
            }
        },

        // Find one user by email
        userByEmail: {
            type: UserType,
            description: 'A user by Email',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                try {
                    const user = await User.findOne({ email: args.email });
                    return user;
                } catch (error) {
                    throw new Error('Failed to fetch user');
                }
            }
        },

        // Find all users
        users: {
            type: new GraphQLList(UserType),
            description: 'List of All users',
            resolve: async () => {
                try {
                    const users = await User.find();
                    return users;
                } catch (error) {
                    throw new Error('Failed to fetch users');
                }
            }
        },

        // Fina all users based on roleId
        // '1' represents for nurse role and '2' represents for patient role
        usersByRoleId: {
            type: new GraphQLList(UserType),
            description: 'List of users by role ID (e.g., nurses or patients)',
            args: {
                roleId: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                try {
                    const users = await User.find({ roleId: args.roleId });
                    return users;
                } catch (error) {
                    throw new Error('Failed to fetch users by roleId');
                }
            }
        },
    })
})

// RootMutationType with three mutation methods
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({

        // Add a new user
        addUser: {
            type: UserType,
            description: 'Add a user',
            args: {
                roleId: { type: GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {
                    const existingUser = await User.findOne({
                      email: args.email,
                    });
                    if (existingUser) {
                      throw new Error("Email already exists");
                    }

                    const user = new User({
                        roleId: args.roleId,
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
                        password: args.password
                    });
                    const newUser = await user.save();
                    return newUser;
                } catch (error) {
                    throw new Error('Failed to add the user');
                }
            }
        },

        // For user login
        login: {
            type: UserType,
            description: 'Login a user',
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => {
                try {
                    const user = await User.login(args.email, args.password);
                    return user;
                } catch (error) {
                    throw new Error('Login failed: ' + error.message);
                }
            }
        },

        // Update an existing user by MongoDB default _id 
        updateUser: {
            type: UserType,
            description: 'Update a user',
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) },
                roleId: { type: GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {
                    const updatedUser = await User.findByIdAndUpdate(args._id,
                        {
                            roleId: args.roleId,
                            firstName: args.firstName,
                            lastName: args.lastName,
                            email: args.email,
                            password: args.password
                        },
                        { new: true });
                    if (!updatedUser) {
                        throw new Error('User not found');
                    }
                    return updatedUser;
                } catch (error) {
                    throw new Error('Failed to update the user');
                }
            }
        },

        // Delete an existing user by MongoDB default _id
        deleteUser: {
            type: UserType,
            description: 'Delete a user',
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {
                    const deletedUser = await User.findByIdAndDelete(args._id);
                    if (!deletedUser) {
                        throw new Error('User not found');
                    }
                    return deletedUser;
                } catch (error) {
                    throw new Error('Failed to delete the user');
                }
            }
        },
    })
})

// Export RootQueryType and RootMutationType  
module.exports = { RootQueryType, RootMutationType };