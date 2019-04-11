# Mock Service API
## Install
```
npm install mock-service-api
```
## How to Use
Import `mock-api-server` and start project
```
const mockApiServer = require('mock-api-server')
const path = require('path')
const configPath = path.join(__dirname, 'example')
mockApiServer.start(configPath)
```
## Add New Route
1. Create folder which you want to store your all route config. (ex. `/rest`)
2. Create folder inside `step 1` to specific new route. (ex. `/rest/pet`)
3. Create config file inside `step 2` (anyname in folder will be read as config).

## Config
In configfile you have to specific 3 paramters and use `module.exports` to export them
```
module.exports = {
  mockPath,
  mockRequest,
  mockResponse
}
```
### Path Config
```
const mockPath = {
  path: "add/new/path/here/:param",
  method: "GET" # "GET|POST|PUT|DELETE"
}
```
### Request Config
```
const mockRequest = {
  query: [],  # for query string
  params: [], # for parameter which specific in url (ex. :param)
  body: []  # for parameter in body request
}
```
You can add parameter which you want in each type of parameter in request. There are parameter in each key following these:
```
{
  name: param1 # name of parameter
  type: string # type of parameter ("string|text|number|tel|email|date")
  format: null # date format of parameter. These format will follow `moment.js`
  require: true  # parameter require or not ("true|false")
  desc: param1 description # description of parameter
  example: This can be any string  # example of parameter
}
```
### Response Config
```
const mockResponse = {
  status: 200,
  headers: {
    "Content-Type": "application/json"
  },
  body: {}
}
```