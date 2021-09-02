import mongoose from 'mongoose' ;

const connection = {} ;
async function dbConnect () {
    if (connection.isConnceted){
        return ;
    }
    const db = await mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) ;
    connection.isConnected = db.connections[0].readyState;
}
export default dbConnect;