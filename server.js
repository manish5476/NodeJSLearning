const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
console.log(process.env.NODE_ENV);

mongoose
  .connect(
    `mongodb+srv://msms5476mm:ms201426@natour-user.awugm7l.mongodb.net/?retryWrites=true&w=majority&appName=Natour-User`,
  )
  .then((con) => {});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
