import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://connectabishek:abishek%40123@cluster0.ginat.mongodb.net/startup_data?retryWrites=true&w=majority';
const dbName = 'startup_data';
let client;

export async function connectToDatabase() {
  try {
    if (!client) {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      });
      console.log('Attempting to connect to MongoDB...');
      await client.connect();
      console.log('Successfully connected to MongoDB');
    }
    return client.db(dbName);
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    throw error;
  }
}

export async function getStartupData() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('web_scraping');
    const data = await collection.find({}).toArray();
    console.log(`Successfully fetched ${data.length} records from MongoDB`);
    return data;
  } catch (error) {
    console.error("Error fetching startup data:", error);
    throw error;
  }
} 