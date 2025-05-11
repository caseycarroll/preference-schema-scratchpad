import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers as PreferenceResolvers } from './preferences.js';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
type ExplicitPreference {
    leafCat: Int
    value: String
}

enum GenderStyle {
    MEN
    WOMEN
    ALL
}

interface FocusCategoryGroup {
    categoryId: Int
    categoryIds: [Int]
    name: String
}

type FashionFocusCategoryGroup implements FocusCategoryGroup {
    categoryId: Int
    categoryIds: [Int]
    name: String
    gender: GenderStyle
    type: String
}

type ElectronicsFocusCategoryGroup implements FocusCategoryGroup {
    categoryId: Int
    categoryIds: [Int]
    name: String
    type: String
    portable: Boolean
}

interface FocusCategoryPreference {
    value: String
    focusCategoryGroup: FocusCategoryGroup
}

type FashionFocusCategoryPreference implements FocusCategoryPreference {
    value: String
    descriptor: String
    focusCategoryGroup: FocusCategoryGroup
}

type ElectronicsFocusCategoryPreference implements FocusCategoryPreference {
    value: String
    focusCategoryGroup: FocusCategoryGroup
}

type Query {
    preferences: [ExplicitPreference]
    fashionCategories: [FashionFocusCategoryGroup]
    fashionPreferences: [FashionFocusCategoryPreference]
    electronicsPreferences: [ElectronicsFocusCategoryPreference]
    allFocusCategoryPreferences: [FocusCategoryPreference]}
`;


const resolvers = {
  ...PreferenceResolvers
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);