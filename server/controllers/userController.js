const User = require('../models/userModel')
const PatientData = require('../models/patientDataModel')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')


/**
 * Implenent GraphQL to design user controller
 * Define a UserType for user model
 * Define a PatientDataType for patientData model
 * Define a RootQueryType to query users database and patientDatas database
 * Define a RootMutationType to perform mutations on users and patientData 
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

//PatientDataType with data fields
const PatientDataType = new GraphQLObjectType({
    name: 'PatientDataType',
    description: 'This represents a patient data.',
    fields: () => ({
        _id: {type: GraphQLNonNull(GraphQLString)},
        patientId: {type: GraphQLNonNull(GraphQLString)},
        fullName: {type: GraphQLNonNull(GraphQLString)},
        date: {type: GraphQLNonNull(GraphQLString)},
        bodyTemp: {type: GraphQLNonNull(GraphQLString)},
        heartRate: {type: GraphQLNonNull(GraphQLString)},
        bloodPressure: {type: GraphQLNonNull(GraphQLString)},
        respiratoryRate: {type: GraphQLNonNull(GraphQLString)}
    })
})




// RootQueryType with seven query methods
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

        // Find all users based on roleId
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

        //find a single record of patient data via record id
        oneDataRecord: {
            type: PatientDataType,
            description: 'A single record of patient data.', 
            args: {
                _id: {type: GraphQLString}
            },
            resolve: async(parent, args) => {
                try{
                    let data = await PatientData.findById(args._id)
                    return data;
                } catch (error) {
                    throw new Error('Failed to fetch patient data record by id');
                }
            }
        },
        //find all data of a particular petient by their patient id
        onePatientsData: {
            type: new GraphQLList(PatientDataType),
            description: 'All data records of a single patient.',
            args: {
                patientId: {type: GraphQLString}
            },
            resolve: async(parent, args) => {
                try{
                    const data = await PatientData.find({patientId: args.patientId})
                    return data;
                } catch (error) {
                    throw new Error('Failed to fetch records of a single patient by their full name.');
                }
                
            }
        },
        //find all data records
        allDataRecords: {
            type: new GraphQLList(PatientDataType),
            description: 'List of all patient data records',
            resolve: async () => {
                try{
                    const data = await PatientData.find();
                    return data;
                } catch (error) {
                    throw new Error('Failed to fetch all records of patient data.');
                }
            }
        }
    })
})

// RootMutationType with seven mutation methods
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

        //add a record of patient data
        addPatientData: {
            type: PatientDataType,
            description: 'Add a new record of patient data.',
            args: {
                patientId: {type: GraphQLNonNull(GraphQLString)},
                fullName: {type: GraphQLNonNull(GraphQLString)},
                date: {type: GraphQLNonNull(GraphQLString)},
                bodyTemp: {type: GraphQLNonNull(GraphQLString)},
                heartRate: {type: GraphQLNonNull(GraphQLString)},
                bloodPressure: {type: GraphQLNonNull(GraphQLString)},
                respiratoryRate: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args) => {
                try{
                    const data = new PatientData({
                        patientId: args.patientId,
                        fullName: args.fullName,
                        date: args.date,
                        bodyTemp: args.bodyTemp,
                        heartRate: args.heartRate,
                        bloodPressure: args.bloodPressure,
                        respiratoryRate: args.respiratoryRate
                    });
    
                    const newData = await data.save();
                    return newData;
                } catch (error) {
                    throw new Error('Failed to add patient data record.');
                }
            }
        },
        //update a record of patient data via id
        updatePatientData: {
            type: PatientDataType,
            description: 'Update a record of patient data',
            args: {
                _id: {type: GraphQLNonNull(GraphQLString)},
                patientId: {type: GraphQLNonNull(GraphQLString)},
                fullName: {type: GraphQLNonNull(GraphQLString)},
                date: {type: GraphQLNonNull(GraphQLString)},
                bodyTemp: {type: GraphQLNonNull(GraphQLString)},
                heartRate: {type: GraphQLNonNull(GraphQLString)},
                bloodPressure: {type: GraphQLNonNull(GraphQLString)},
                respiratoryRate: {type: GraphQLNonNull(GraphQLString)}
                
            },
            resolve: async (parent, args) => {
                try{
                    const updateData = await PatientData.findByIdAndUpdate(args._id, 
                        {patientId: args.patientId,
                        fullName: args.fullName,
                        date: args.date,
                        bodyTemp: args.bodyTemp,
                        heartRate: args.heartRate,
                        bloodPressure: args.bloodPressure,
                        respiratoryRate: args.respiratoryRate
                        }, {new: true});
                    return updateData;
                } catch (error) {
                    throw new Error('Failed to update patient data record.');
                }
            }
        },
        //delete a record of patient data via id
        deletePatientData: {
            type: PatientDataType,
            description: 'Delete a record of patient data',
            args: {
                _id: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve: async(parent, {name}) => {
                try{
                    const deleteData = await PatientData.findOneAndDelete(args._id);
                    return deleteData;
                } catch (error) {
                    throw new Error('Failed to delete patient data record.');
                }
            }
        }
    })
})

// Export RootQueryType and RootMutationType  
module.exports = { RootQueryType, RootMutationType };