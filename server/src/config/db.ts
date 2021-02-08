import { connect } from "mongoose";

let mongoURI =
  process.env.NODE_ENV === "development"
    ? `mongodb://localhost:27017/find-bike-db`
    : `mongodb://mongo:27017/find-bike-db`;

const connectDB = async () => {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
