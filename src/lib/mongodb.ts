import mongoose from 'mongoose';

const uri = `${process.env.URI}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Myflix`;

const mongodb = async () => {
  if (mongoose.connections[0]?.readyState) return true;

  try {
    await mongoose.connect(uri);
    console.log('Mongodb connected');
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default mongodb;
