const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const conn_url = `mongodb+srv://fullstack:${process.env.MONGO_PASSWORD}@cluster0.6bibb.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(conn_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connection successful to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, minlength: 3 },
  number: { type: String, unique: true, required: true, minlength: 6 },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
