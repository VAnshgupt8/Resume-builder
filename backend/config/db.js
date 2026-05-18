// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {

//     await mongoose.connect(process.env.MONGO_URI);

//     console.log('MongoDB Connected');

//   } catch (error) {

//     console.log(error);

//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI Missing');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected');

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
};

module.exports = connectDB;