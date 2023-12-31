import mongose from "mongoose";

const connectMongodb = () => {
  try {
    mongose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Mongodb...");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongodb;
