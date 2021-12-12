// External Dependencies
import express, { Request, Response } from "express"
import { collections } from "../services/database.services";
import Book from "../models/book";
import { ObjectId } from "bson";

// Global Config
export const booksRouter = express.Router();
booksRouter.use(express.json()) // use middleware to parse json to bson

// GET
booksRouter.get("/", async(_req: Request, res: Response) => {
    try {
        const books = (await collections.books.find({}).toArray()) as unknown as Book[];

        res.status(200).send(books)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

booksRouter.get("/:id", async(req: Request, res: Response) => {
    const id = req?.params?.id

    try {
        const query = { _id: new ObjectId(id) }
        const book = (await collections.books.findOne(query)) as unknown as Book;

        if (book) {
            res.status(200).send(book)
        }
    } catch (error) {
        res.status(404).send(`Unable to find document matching id: ${id}`)
    }
})

// POST
booksRouter.post("/", async(req: Request, res:Response) => {
    try {
        const newBook = req.body as Book;
        const result = await collections.books.insertOne(newBook);
        
        // return response based on result 
        result 
            ? res.status(201).send(`Success creating new book with id: ${result.insertedId}`)
            : res.status(500).send("Failed to create new book")
    } catch (error){
        console.error(error);
        res.status(400).send(error.message);
    }
})

// PUT
booksRouter.put("/:id", async(req: Request, res: Response) => {
    const id = req?.params?.id

    try {
        const query = { "_id": new ObjectId(id) }
        const updatedBook = req.body as Book
        const result = await collections.books.updateOne(query, { $set: updatedBook });

        result 
            ? res.status(201).send(`Success updating book with id: ${id}`)
            : res.status(304).send(`Book with id: ${id} not updated`)
    } catch(error) {
        console.error(error.message)
        res.status(400).send(error.message)
    }
})

// DELETE
booksRouter.delete("/:id", async(req: Request, res: Response) => {
    const id = req?.params?.id

    try {
        const query = { "_id": new ObjectId(id) }
        const result = await collections.books.deleteOne(query)

        if (result && result.deletedCount) {
            res.status(202).send(`Book with id ${id} has been deleted`)
        } else if (!result) {
            res.status(400).send(`Failed to delete book with id: ${id}`)
        } else if (result && !result.deletedCount) {
            res.status(404).send(`Boo kwith id ${id} not found`)
        }
    } catch(error) {
        console.error(error.message)
        res.status(400).send((error.message))
    }
})
