import type { MongoClient } from 'mongodb';

declare global {
  var _mongoClient: Promise<MongoClient> | undefined;
}

export {};
