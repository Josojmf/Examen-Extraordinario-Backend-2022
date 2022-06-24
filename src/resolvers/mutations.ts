import { ApolloError } from 'apollo-server-errors';
import { Db, ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
const brcypt = require("bcrypt");
import * as dotenv from "dotenv";

dotenv.config();

export const Mutation = {
    addPressHouse:async(parent:any,args:{Name:string,Web:string,Country:string},context:{client:Db})=>{
        const ph={
            Name:args.Name,
            Web:args.Web,
            Country:args.Country,
            Books:[]
        }
        const existing=await context.client.collection("Editoriales").findOne({Name:args.Name})
        if(existing){
            throw new ApolloError('PressHouse Name already taken','Book Name already taken',{status:442})
        }else{
            await context.client.collection("Editoriales").insertOne({Name:args.Name,Web:args.Web,Country:args.Country, Books:[]})
        return{
            ...ph
        }
        }
        

    },
    addAuthor:async(parent:any,args:{Name:string,Lang:string,Books:[string]},context:{client:Db})=>{
        const auth={
            Name:args.Name,
            Lang:args.Lang,
            Books:[]
        }
        const existing=await context.client.collection("Authors").findOne({Name:args.Name})
        if(existing){
            throw new ApolloError('Author Name already taken','Book Name already taken',{status:442})
        }
        await context.client.collection("Authors").insertOne({Name:args.Name,Lang:args.Lang, Books:[]})
        return{
            ...auth
        }

    },
    addBook:async(parent:any,args:{Title:string,Author:string,PressHouse:string,Year:number},context:{client:Db})=>{
        const book={
            Title:args.Title,
            Author:args.Author,
            PressHouse:args.PressHouse,
            Year:args.Year
        }
        const existing=await context.client.collection("Books").findOne({Title:args.Title})
        if(existing){
            throw new ApolloError('Book Name already taken','Book Name already taken',{status:442})
        }
        var bookIn=await context.client.collection("Books").insertOne({Title:args.Title,Author:args.Author, PressHouse:args.PressHouse,Year:args.Year})
        console.log(bookIn.insertedId)
        await context.client.collection("Authors").updateOne({_id:new ObjectId(args.Author)},{$push:{Books:bookIn.insertedId.toString()}})
        await context.client.collection("Editoriales").updateOne({_id:new ObjectId(args.PressHouse)},{$push:{Books:bookIn.insertedId.toString()}})
        return{
            ...book
        }

    },
    deleteBook:async(parent:any,args:{id:string},context:{client:Db})=>{

        const existing=await context.client.collection("Books").findOne({_id:new ObjectId(args.id)})
        if(existing){
            await context.client.collection("Books").deleteOne({_id:new ObjectId(args.id)})
            await context.client.collection("Authors").updateOne({ _id: new ObjectId(existing.Author)},{$pull:{Books:args.id}})
            console.log(new ObjectId(existing._id))
            await context.client.collection("Editoriales").updateOne({ _id: new ObjectId(existing.PressHouse)},{$pull:{Books:args.id}})
            
            return "Deleted!"
        }else{
            throw new ApolloError("Not found","Not Found",{status:404})
        }
    },
    deleteAuthor:async(parent:any,args:{id:string},context:{client:Db})=>{

        const existing=await context.client.collection("Authors").findOne({_id:new ObjectId(args.id)})
        if(existing){
            await context.client.collection("Authors").deleteOne({_id:new ObjectId(args.id)})
            
            return "Deleted!"
        }else{
            throw new ApolloError("Not found","Not Found",{status:404})
        }
    },
    deletePressHouse:async(parent:any,args:{id:string},context:{client:Db})=>{

        const existing=await context.client.collection("Editoriales").findOne({_id:new ObjectId(args.id)})
        if(existing){
            await context.client.collection("Editoriales").deleteOne({_id:new ObjectId(args.id)})
            return "Deleted!"
        }else{
            throw new ApolloError("Not found","Not Found",{status:404})
        }
    }


    
}
