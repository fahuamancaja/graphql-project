const graphql = require('graphql');
var _ = require('lodash');

//dummy data
var userData = [
    {id: '1', name: 'Bond', age: 35, profession: 'dancer'},
    {id: '13', name: 'Anna', age: 26, profession: 'boxer'},
    {id: '211', name: 'Bella', age: 16, profession: 'gymnast'},
    {id: '19', name: 'Gina', age: 26, profession: 'instructor'},
    {id: '150', name: 'Georgina', age: 36, profession: 'singer'},
]

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '1'},
    {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts', userId: '1'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '19'},
    {id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '211'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '1'}
]

var postData = [
    {id: '1', comment: 'Building a Mind', userId: '1'},
    {id: '2', comment: 'Graphql is amazing', userId: '1'},
    {id: '3', comment: 'How to chnge the world', userId: '19'},
    {id: '4', comment: 'How to chnge the world', userId: '211'},
    {id: '5', comment: 'How to chnge the world', userId: '1'}
]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, {userId: parent.id})
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {userId: parent.id})
            }
        }
    })

});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post Description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Descriptions',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(userData, {id: args.id})
                //We resolve with data
                //get and return data from a datasource
            }
        },
        hobby: {
            type: HobbyType,
            args: {id: {type:GraphQLID}},

            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id})
            }
        },
        post: {
            type: PostType,
            args: {id: {type:GraphQLID}},
        
            resolve(parent, args) {
                return _.find(postData, {id: args.id})
            }
        }
    }
});

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID}
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },

            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                //id: {type: GraphQLID}
                comment: {type: GraphQLString},
                userId: {type: GraphQLID}
            },

            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }
                return post;
            }
        },

        createHobby: {
            type: HobbyType,
            args: {
                //id: {type: GraphQLID}
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },

            resolve(parent, args) {
                let post = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return post;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})