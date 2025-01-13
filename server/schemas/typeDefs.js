const typeDefs = `
  # Book type definition
  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  # User type definition
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  # Auth type for authentication
  type Auth {
    token: ID!
    user: User
  }

  # Input type for saving books
  input BookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

  # Query type
  type Query {
    me: User
  }

  # Mutation type
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs; 