const moongoose = require('mongoose');


module.exports = async () => {
    await moongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully');
}