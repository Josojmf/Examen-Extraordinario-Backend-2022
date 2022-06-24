
import { ApolloError } from "apollo-server";
import { Db, ObjectId } from "mongodb";
import { Autor, Libro } from "../types";

export const Query = {
  books: async (parent: any, args: any, context: { client: Db }) => {
    return await context.client.collection("Books").find().toArray();
  },
  authors: async (parent: any, args: any, context: { client: Db }) => {
    return await context.client.collection("Authors").find().toArray();
  },
  presshouses: async (parent: any, args: any, context: { client: Db }) => {
    
    return await context.client.collection("Editoriales").find().toArray();
  },
  book: async (parent: any, args: { id: string }, context: { client: Db }) => {
    const valid_id = new ObjectId(args.id);
    const book =await context.client.collection("Books").findOne({ _id: valid_id });
    
    if(book){
      return await context.client.collection("Books").findOne({ _id: valid_id });
    }else{
      throw new ApolloError("NOT FOUND","NOT FOUND",{status:404})
    }
  },
  author: async (parent: any, args: { id: string }, context: { client: Db }) => {
    const valid_id = new ObjectId(args.id);
    const auth =await context.client.collection("Authors").findOne({ _id: valid_id });
    
    if(auth){
      return await context.client.collection("Authors").findOne({ _id: valid_id });
    }else{
      throw new ApolloError("NOT FOUND","NOT FOUND",{status:404})
    }
  },
  presshouse: async (parent: any, args: { id: string }, context: { client: Db }) => {
    const valid_id = new ObjectId(args.id);
    const eds =await context.client.collection("Editoriales").findOne({ _id: valid_id });
    
    if(eds){
      return await context.client.collection("Editoriales").findOne({ _id: valid_id });
    }else{
      throw new ApolloError("NOT FOUND","NOT FOUND",{status:404})
    }
  },
}
export const Author = {
  Books: async (parent: { Books: [string] }, args: any, context: { client: Db }) => {
    const books_per_auth = await context.client.collection("Books").find({ _id: {$in: parent.Books.map(b=>new ObjectId(b))} }).toArray()
    if (books_per_auth) {
      return books_per_auth.map(b=>({
        ...b
      }))
     
    }
  }

}
export const Book = {
  Author:async(parent:{Author:string},args:any,context:{client:Db})=>{
    const auth_book= await context.client.collection("Authors").findOne({ _id: new ObjectId(parent.Author)}) 
    return{
      ...auth_book,
    }
  },
  PressHouse:async(parent:{PressHouse:string},args:any,context:{client:Db})=>{
    const ph_book= await context.client.collection("Editoriales").findOne({ _id: new ObjectId(parent.PressHouse)})
    return{
      ...ph_book,
    }
  }

}

export const PressHouse = {
  Books: async (parent: { Books: [string] }, args: any, context: { client: Db }) => {
    const books_per_ph = await context.client.collection("Books").find({ _id: {$in: parent.Books.map(b=>new ObjectId(b))} }).toArray()
    if (books_per_ph) {
      return books_per_ph.map(b=>({
        ...b
      }))
     
    }
  }

}
