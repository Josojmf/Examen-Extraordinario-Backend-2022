import { gql } from "apollo-server";

export const typeDefs = gql`

 type PressHouse  {
    Name: String
    Web: String
    Country: String
    Books: [Book]
}

 type Author {
    Name: String
    Lang: String
    Books: [Book]
}

 type Book  {
    Title: String
    Author: Author
    PressHouse: PressHouse
    Year: Int
}


type Query{
    books: [Book]
    authors: [Author]
    presshouses: [PressHouse]
    book(id:ID!):Book
    author(id:ID!):Author
    presshouse(id:ID!):PressHouse
    
}

type Mutation{
    addPressHouse(Name:String!,Web:String!,Country:String!):PressHouse!
    addAuthor(Name:String!,Lang:String!):Author!
    addBook(Title:String!,Author:String!,PressHouse:String!,Year:Int!):Book!
    deletePressHouse(id:ID!):String!
    deleteBook(id:ID!):String!
    deleteAuthor(id:ID! ):String!
}

`
