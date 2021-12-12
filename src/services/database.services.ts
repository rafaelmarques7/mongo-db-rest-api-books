// External Dependencies
import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"

// Global Variables
export const collections: { books?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    // this pulls in the .env file
    dotenv.config();

    // instantiate a connection
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    await client.connect();

    // instantiate db
    const db: mongoDB.Db = client.db(process.env.DB_NAME)
    
    // instantiate book collection
    const booksCollection: mongoDB.Collection = db.collection(process.env.BOOKS_COLLECTION_NAME)

    // add book collection to global collections object
    collections.books = booksCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${booksCollection.collectionName}`);

}