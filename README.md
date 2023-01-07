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

//
const http = require('http')
const URL = require('url')

const server = http.createServer((req,res) => {
  if(req.url === '/favicon.ico') return

  console.log(req.url)
  const myUrl = new URL(req.url, 'http://localhost:3000/')
  const myUrl2 = new URL(req.url, `http://${req.headers.host}`)

  const pathname = myUrl.pathname
  const id = myUrl.searchParams.get('id')

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end('<h1>Welcome to the bicyle shop </h1>')
})

// Routs and rendering HTML
const http = require('http')
const URL = require('url')
const fs = require('fs').promises

const server = http.createServer(async(req,res) => {
  if(req.url === '/favicon.ico') return

  console.log(req.url)
  const myUrl = new URL(req.url, 'http://localhost:3000/')
  const myUrl2 = new URL(req.url, `http://${req.headers.host}`)

  const pathname = myUrl.pathname
  const id = myUrl.searchParams.get('id')

  if(pathname === '/'){
    const html = await fs.readFile('./masirHTML.html', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(html)
  } else if(pathname === '/bicycle'){
    const html = await fs.readFile('./masirHTML.html', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(html)
  } else if(/\.(png)$/i.test(req.url)){
    const image = await fs.readFile(`./public/images/${req.url.slice(1)}`)
    res.writeHead(200, {'Content-Type': 'image/png'})
    res.end(image)
  } else if(/\.(css)$/i.test(req.url)){
    const css = await fs.readFile(`./public/css/index.css`)
    res.writeHead(200, {'Content-Type': 'text/css'})
    res.end(css)
  } else if(/\.(svg)$/i.test(req.url)){
    const svg = await fs.readFile(`./public/images/${req.url.slice(1)}`)
    res.writeHead(200, {'Content-Type': 'image/svg+xml'})
    res.end(svg)
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end(<h1>File Not Found</h1>)
  }
})

// Dynamic Data
const http = require('http')
const URL = require('url')
const fs = require('fs').promises
const db = require('./data/db.json')

const server = http.createServer(async(req,res) => {
  if(req.url === '/favicon.ico') return

  console.log(req.url)
  const myUrl = new URL(req.url, 'http://localhost:3000/')
  const myUrl2 = new URL(req.url, `http://${req.headers.host}`)

  const pathname = myUrl.pathname
  const id = myUrl.searchParams.get('id')

  if(pathname === '/'){
    const html = await fs.readFile('./masirHTML.html', 'utf-8')
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(html)
  } else if(pathname === '/bicycle' && id <= 5){
    let html = await fs.readFile('./masirHTML.html', 'utf-8')

    const db = db.find((bicycle) => bicycle.id === id)

    //برای اینکه عکس ها و فایل‌ها رو داشته باشیم زمان رندر، داخل فایل اچ‌تی‌ام‌ال برای سورس ها از حالت زیر استفاده میکنیم
    //<%IMAGE%>

    html = html.replace(/<%IMAGE%>/g, db.image)

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(html)
  } else if(/\.(png)$/i.test(req.url)){
    const image = await fs.readFile(`./public/images/${req.url.slice(1)}`)
    res.writeHead(200, {'Content-Type': 'image/png'})
    res.end(image)
  } else if(/\.(css)$/i.test(req.url)){
    const css = await fs.readFile(`./public/css/index.css`)
    res.writeHead(200, {'Content-Type': 'text/css'})
    res.end(css)
  } else if(/\.(svg)$/i.test(req.url)){
    const svg = await fs.readFile(`./public/images/${req.url.slice(1)}`)
    res.writeHead(200, {'Content-Type': 'image/svg+xml'})
    res.end(svg)
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end(<h1>File Not Found</h1>)
  }
})