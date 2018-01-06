var express = require('express');
var router = express.Router();

console.log(__dirname);
const sqlite3 = require('sqlite3').verbose();
//let db = new sqlite3.Database(':memory:');
let db = new sqlite3.Database('/Users/programuser/Library/Containers/com.apple.iBooksX/Data/Documents/AEAnnotation/AEAnnotation_v10312011_1727_local.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
});
let books = new sqlite3.Database('/Users/programuser/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary/BKLibrary-1-091020131601.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
});

  

/* GET home page. */

router.post('/books', function(req, res){
  console.log(req.body.books);
  var book = req.body.books;
  let sql = 'SELECT ZANNOTATIONSELECTEDTEXT FROM ZAEANNOTATION WHERE ZANNOTATIONSELECTEDTEXT NOT NULL AND ZANNOTATIONASSETID = "' + book +'"';
 
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);

    // rows.forEach((row) => {
    //   console.log(rows);
    // });

  
  console.log('Connected to the in-memory SQlite database.');
  res.render('notes', { notes: rows, title: 'Bookworm Notes' });
  });




});
router.get('/', function(req, res, next) {
  let sql = 'SELECT ZTITLE, ZASSETID FROM ZBKLIBRARYASSET WHERE ZTITLE IS NOT NULL';
 
  books.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);

    // rows.forEach((row) => {
    //   console.log(rows);
    // });

  
  console.log('Connected to the in-memory SQlite database.');
  res.render('index', { books: rows, title: 'Bookworm Notes' });
  });
  
});

module.exports = router;
