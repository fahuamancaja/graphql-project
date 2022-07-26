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
    {id: '1', title: 'Programming', description: 'Using computers to make the world a better place'},
    {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donuts'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water'},
    {id: '4', title: 'Fencing', description: 'A hobby for fency people'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world'}
]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })

});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby Description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
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
        }
    }
});



module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})