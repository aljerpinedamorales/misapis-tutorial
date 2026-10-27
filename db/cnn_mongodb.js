import mongoose from 'mongoose';

let isConected = false;

const conectarAMongoDB = async () => {
    if(isConected){
        console.log('Ya esta conectado a MongoDB'.green);
        return;
    }
}