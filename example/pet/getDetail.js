const faker = require('faker')

const mockPath = {
  path: ":param1",
  method: "GET"
}

const mockRequest = {
  query: [],  // ?query=xxxx
  params: [ // /test/{param}
    {
      name: "param1",
      type: "string",
      require: true,
      desc: "Enter string",
      example: "test parameter"
    }
  ],
  body: []  // pass parameters into body request
}

const mockResponse = {
  status: 200,
  headers: {
    "Content-Type": "application/json"
  },
  body: {
    success: true,
    data: {
      petName: faker.name.firstName(),
      owner: faker.name.findName(),
      birthday: faker.date.past()
    }
  }
}

module.exports = {
  mockPath,
  mockRequest,
  mockResponse
};