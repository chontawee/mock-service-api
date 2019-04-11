const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const helper = require('./helper')

const start = (rootDirPath, port=3000) => {
  const app = express()

  // set bodyparser
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // add route config
  fs.readdirSync(rootDirPath).forEach((dir) => {
    fs.readdirSync(`${rootDirPath}/${dir}`).forEach((file) => {
      const { mockPath, mockRequest, mockResponse } = require(`${rootDirPath}/${dir}/${file}`)
      switch(mockPath.method) {
        case "GET":
          app.get(`/${dir}/${mockPath.path}`, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        case "POST":
          app.post(`/${dir}/${mockPath.path}`, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        case "PUT":
          app.put(`/${dir}/${mockPath.path}`, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        case "DELETE":
          app.delete(`/${dir}/${mockPath.path}`, (req, res) => helper.apiCallback(req, res, mockRequest, mockResponse))
          break
        default:
          break
      }
    })
  })
  app.use((req, res) => helper.generateErrRes(res, 404, "Page not found"))
  app.listen(port, () => console.log(`Mock Server start on port ${port}!`))  
}

module.exports = {
  start
}