const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const doc = require('./render/doc')
const helper = require('./helper')

const start = (rootDirPath, port=3000) => {
  const app = express()

  // set bodyparser
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // add route config
  const routes = []
  fs.readdirSync(rootDirPath).forEach((dir) => {
    fs.readdirSync(`${rootDirPath}/${dir}`).forEach((file) => {
      const { mockPath, mockRequest, mockResponse } = require(`${rootDirPath}/${dir}/${file}`)
      const urlPath = `/${dir}${mockPath.path}`
      switch(mockPath.method) {
        case "GET":
          app.get(urlPath, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        case "POST":
          app.post(urlPath, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        case "PUT":
          app.put(urlPath, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        case "DELETE":
          app.delete(urlPath, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        default:
          break
      }
      routes.push({
        mockPath: {
          path: urlPath,
          method: mockPath.method
        },
        mockRequest,
        mockResponse
      })
    })
  })
  app.get('/doc', (req, res) => res.send(doc.generateDoc(routes)))
  app.use((req, res) => helper.generateErrRes(res, 404, "Page not found"))
  app.listen(port, () => console.log(`Mock Server start on port ${port}!`))  
}

module.exports = {
  start
}