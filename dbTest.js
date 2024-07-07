const mongoose = require('mongoose');
const Url = require('./models/url');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv');
dotenv.config();
const mongoDB = process.env.DB_URL;

main().catch((err) => console.log(err));

async function main() {
    console.log('About to connect');
    await mongoose.connect(mongoDB);
    await createUrl();
    console.log('url should be created. Closing mongoose')
    mongoose.connection.close();
}


async function createUrl() {
    const url = new Url({ originalUrl: 'google.com', shortUrl: '1234' });
    await url.save();
}