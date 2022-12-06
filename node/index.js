const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'nodedb'
};

app.get('/', (req, res) => { 
  // res.send('<h1>Full Cycle Rocks!</h1>')
  insert(res);
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})

function randomName() {
  const names = [
    'Rafaibor Gatutur',
    'Vokuinit Tarzithalion',
    'Celebdor Bienda',
    'Veyrouko Kipeish',
    'Dexurond Zudowia',
    'Zodifao Ermoi',
    'Irnuasun Gueln',
    'Thrriwey Amwefu',
    'Frulwuzeu Kreiclu',
    'Giuseystili Zupos',
    'Snagvudu Haraim'
  ];
  
  const random = Math.floor(Math.random() * 10);
  return names[random];
}

function insert(res) {
  const name = randomName();
  const connection = mysql.createConnection(config); 
  const sql = `INSERT INTO people(name) VALUES ('${name}')`;
  connection.query(sql);
  
  console.log(`Nome ${name} inserido com sucesso.`);
  getName(res, connection);
}

function getName(res, connection) {
  const sql = `SELECT * FROM people`;

  connection.query(sql, (error, results) => {
    if (error) {
      throw error;
    }

    let table = '<table border="1">';
    table += '<tr><th>#</th><th>Name</th></tr>';

    for(let people of results) {      
      table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
    }

    table += '</table>';    
    res.send('<h1>Full Cycle Rocks!</h1>' + table);  
  })

  connection.end();
}