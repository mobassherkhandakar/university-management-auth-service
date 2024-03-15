import mongoose from 'mongoose';
import app from './app';
import config from './config';



async function bootstrap() {
    try{
        await mongoose.connect(config.database_url as string);
        console.log('Database is conncected successfully');
        app.listen(config.port, () => {
            console.log(`Application app listening on port ${config.port}`)
          })
    }catch(error){
        console.log("Faild to connect database connection",error);
    }
}
bootstrap()