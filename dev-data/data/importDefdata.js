const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../Models/tourModels');
dotenv.config({ path: './config.env' });

mongoose
  .connect(
    `mongodb+srv://msms5476mm:ms201426@natour-user.awugm7l.mongodb.net/?retryWrites=true&w=majority&appName=Natour-User`
  )
  .then((con) => {});

// Read JSON file and write it to
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data oaded succesfully imported');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted successfully');
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
console.log(process.argv);
