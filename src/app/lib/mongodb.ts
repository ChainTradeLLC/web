import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

// Note: Ensure 'declare global { var _mongoClientPromise: Promise<MongoClient> | undefined; }' 
// is available in your project's global type definitions.

const uri = process.env.MONGODB_URI!;

const options: MongoClientOptions = {
    // Fail quickly if a server cannot be found
    serverSelectionTimeoutMS: 5000, 
    
    // Serverless optimization: Small pool size
    maxPoolSize: 1, 
    
    // Aggressive timeouts to prevent Workers runtime hangs
    socketTimeoutMS: 300000,
    connectTimeoutMS: 300000,
    maxIdleTimeMS: 300000,
    
    // Enforce correct MongoDB API version and strictness
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env");
}

// 💡 The logic is unified across all environments (Dev/Prod/Serverless)
// This ensures the connection is cached and reused globally on the first call
// in any running Node.js/Worker instance.
if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;