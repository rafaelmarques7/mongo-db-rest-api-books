import express from "express"
import { booksRouter } from "./routes/books.router"
import { connectToDatabase } from "./services/database.services"

const app = express();
const port = 8080;

connectToDatabase()
    .then(() => {
        app.use("/books", booksRouter)
        
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`)
        })
    })
    .catch((error: Error) => {
        console.error("Database connection failed, error: ", error)
        process.exit();
    })