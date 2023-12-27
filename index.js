import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";
import { setTimeout as sleep } from "timers/promises";

const mongoServer = await MongoMemoryReplSet.create({
  instanceOpts: [
    { storageEngine: "wiredTiger" },
    { storageEngine: "wiredTiger" },
  ],
  replSet: {
    count: 2,
  },
});

const uri = mongoServer.getUri();

console.log(`MongoDB started on ${uri}`);

await mongoose.connect(uri, { maxPoolSize: 10 });

console.log("Mongoose connected");

const schema = new mongoose.Schema({ data: String });
const mockModel = mongoose.model("Test", schema);

const changeStream = mockModel.watch();

let mongooseError = false;
let mongoDbError = false;

changeStream.on("error", (error) => {
  console.log(error);

  mongooseError = true;
});

changeStream.driverChangeStream.on("error", (error) => {
  console.log(error);

  mongoDbError = true;
});

console.log(`Stop MongoDB to simulate network error`);

await mongoServer.stop();

console.log(`Wait 90 seconds for change stream to emit an error`);

await sleep(90_000); // 60_000 works too, but 90_000 just to be sure

await changeStream.close();
await mongoose.disconnect();

if (mongoDbError && !mongooseError) {
  console.log("Change stream error was not caught by mongoose!");
  process.exit(1);
}

process.exit(0);
