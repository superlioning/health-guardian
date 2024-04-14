const User = require('../models/userModel')
const PatientData = require('../models/patientDataModel');
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

// Define a GraphQL ObjectType for PatientData
const PatientDataType = new GraphQLObjectType({
    name: 'PatientData',
    description: 'This represents patient health data',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        patientId: { type: GraphQLNonNull(GraphQLString) },
        fullName: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        bodyTemp: { type: GraphQLNonNull(GraphQLString) },
        heartRate: { type: GraphQLNonNull(GraphQLString) },
        bloodPressure: { type: GraphQLNonNull(GraphQLString) },
        respiratoryRate: { type: GraphQLNonNull(GraphQLString) }
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
        // Find all patient health data
        patientDatas: {
            type: new GraphQLList(PatientDataType),
            description: 'List of all patient health data',
            resolve: async () => {
                try {
                    const patientDatas = await PatientData.find();
                    return patientDatas;
                } catch (error) {
                    throw new Error('Failed to fetch patient health data');
                }
            }
        },
        // Find patient health data by patientId
        patientDataByPatientId: {
            type: new GraphQLList(PatientDataType),
            description: 'List of patient health data by patient ID',
            args: {
                patientId: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, { patientId }) => {
                try {
                    const patientDatas = await PatientData.find({ patientId });
                    return patientDatas;
                } catch (error) {
                    throw new Error('Failed to fetch patient health data');
                }
            }
        }
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
         // Add patient health data
         addPatientData: {
            type: PatientDataType,
            description: 'Add patient health data',
            args: {
                patientId: { type: GraphQLNonNull(GraphQLString) },
                fullName: { type: GraphQLNonNull(GraphQLString) },
                date: { type: GraphQLNonNull(GraphQLString) },
                bodyTemp: { type: GraphQLNonNull(GraphQLString) },
                heartRate: { type: GraphQLNonNull(GraphQLString) },
                bloodPressure: { type: GraphQLNonNull(GraphQLString) },
                respiratoryRate: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => {
                try {
                    const newPatientData = await PatientData.create(args);
                    return newPatientData;
                } catch (error) {
                    throw new Error('Failed to add patient health data');
                }
            }
        },
        // Update patient health data by _id
        updatePatientData: {
            type: PatientDataType,
            description: 'Update patient health data',
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) },
                patientId: { type: GraphQLNonNull(GraphQLString) },
                fullName: { type: GraphQLNonNull(GraphQLString) },
                date: { type: GraphQLNonNull(GraphQLString) },
                bodyTemp: { type: GraphQLNonNull(GraphQLString) },
                heartRate: { type: GraphQLNonNull(GraphQLString) },
                bloodPressure: { type: GraphQLNonNull(GraphQLString) },
                respiratoryRate: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => {
                try {
                    const updatedPatientData = await PatientData.findByIdAndUpdate(args._id, args, { new: true });
                    if (!updatedPatientData) {
                        throw new Error('Patient data not found');
                    }
                    return updatedPatientData;
                } catch (error) {
                    throw new Error('Failed to update patient health data');
                }
            }
        },
        // Delete patient health data by _id
        deletePatientData: {
            type: PatientDataType,
            description: 'Delete patient health data',
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, { _id }) => {
                try {
                    const deletedPatientData = await PatientData.findByIdAndDelete(_id);
                    if (!deletedPatientData) {
                        throw new Error('Patient data not found');
                    }
                    return deletedPatientData;
                } catch (error) {
                    throw new Error('Failed to delete patient health data');
                }
            }
        }
    })
})

// Export RootQueryType and RootMutationType  
module.exports = { RootQueryType, RootMutationType };