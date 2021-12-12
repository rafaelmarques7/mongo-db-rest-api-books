# Books REST API using MongoDB

This repo contains the source code to implement a REST API using MongoDB. The API is intended to store information about books.

The structure for each book is as follows:
```JSON
"id": ID,
"name": string!,
"authors": [string!]!,
"publisher": [string!]!,
```

* We will start this project without enforcing the schema
* Once we have a REST API that allows the CRUD operations for a book, we want to update the code to enforce the schema

Notes:
* the source code for this project has been developed with the help of [this](https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial) tutorial

