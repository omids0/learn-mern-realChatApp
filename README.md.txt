//File system module

const fs = require('fs')

//Create a File
fs.writeFile('app.txt', 'hi easy learning.', (err) => {
  if(err) console.log(err)
  else console.log('File Just Created')
} )

//Read File
fs.readFile('./app.txt', 'utf-8', (err, data) => {
  if(err) console.log(err)
  else console.log(data)
})

//Rename File
fs.rename('./app.txt', './helper.txt', (err) => {
  if(err) console.log(err)
  else console.log('File successfully renamed.')
})

//Delete File
fs.unlink('./helper.txt', (err) => {
  if(err) console.log(err)
  else console.log('File Removed.')
})


//HTTP MODULE
const http = require('http')
const server = http.createServer((req, res) => {
  console.log('Server is now running')
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('Hi Omid')
})
server.listen(3000)

//
const http = require('http')
const server = http.createServer((req, res) => {
  console.log('Server is now running')
  const data = await fs.readFile("./server.html", "utf-8");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('Hi Omid')
})
server.listen(3000)