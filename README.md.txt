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
