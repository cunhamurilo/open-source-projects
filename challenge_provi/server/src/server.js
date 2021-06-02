const app = require('../src/app');
const port = 3030

// server listen port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// get conection with database
const db = require("./database/models");
const Role = db.role;

// sync with database
db.sequelize.sync();

// init dabase role
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "admin"
//   });
 
// }