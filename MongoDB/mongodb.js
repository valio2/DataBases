const {
    MongoClient
} = require("mongodb");

const connectionString = "mongodb://localhost";

const run = async () => {
    const client = await MongoClient.connect(connectionString);

    const db = client.db("booksdb");


    const booksCollection = db.collection("books");

    const books = await booksCollection.find({
        $or: [{
            title: {
                $regex: ".*magic.*"
            }
        }, {
            description: {
                $regex: ".*magic.*"
            }
        }]
    });
    books.forEach((book) => console.log(book));

}
run();