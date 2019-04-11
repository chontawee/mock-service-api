const generateDoc = (routes) => {
  let appendHtml = ''
  routes.forEach(route => {
    appendHtml += `
      <tr>
        <td>${route.mockPath.path}</td>
        <td>${route.mockPath.method}</td>
        <td><pre>${JSON.stringify(route.mockRequest, null, 4)}</pre></td>
        <td><pre>${JSON.stringify(route.mockResponse, null, 4)}</pre></td>
      </tr>
    `
  });
  return `
    <html>
      <head>
        <title>Document for mock server</title>
        <style>
          table, th, td {
            border: 1px solid black;
          }
        </style>
      </head>
      <body>
        <center>
          <table>
            <tr>
              <td><b>URL</b></td>
              <td><b>Method</b></td>
              <td><b>Request</b></td>
              <td><b>Response</b></td>
            </tr>
            ${appendHtml}
          </table>
        </center>
      </body>
    </html>
  `
}

module.exports = {
  generateDoc
}
