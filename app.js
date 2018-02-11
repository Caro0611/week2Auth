const express = require('express');
const app = express();

app.use(express.static('public'));


app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

//this goes to another path
//app.get('/contact', (req, res) => {
//  res.sendFile(__dirname + '/contact.html');
//});

//this goes to another path
//app.get('/users', (req, res) => {
//  res.sendFile(__dirname + '/users.html');
//});

app.listen(3000, () => {
  console.log ('app running on port 3000!');
});
