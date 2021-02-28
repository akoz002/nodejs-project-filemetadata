
# API Project: File Metadata Microservice

### User stories

1. I can submit a form that includes a file upload.
2. The form file input field  has the `name` attribute set to `upfile`. We rely on this in testing.
3. When I submit something, I will receive the file name, type and size in bytes within the JSON response, e.g:
```
{ name: 'Desert.jpg', type: 'image/jpeg', size: 845941 }
```

### Usage

* Go to the main page, and upload a file using the provided form.

### Implementation

At the backend the app is implemented with *Node.js* and *Express*. The server source can be found in `server.js`. A demo can be found at the link below. At the frontend the home page has a *React* web form to upload a file for analysis. React source can be found at `views/src/` and it was built with Parcel. Source maps were generated and the original source can be viewed in browser developer tools.

* https://akoz002-nodejs-file-metadata.herokuapp.com/

Alternatively you can post a `multipart/form-data` encoded file with field name `upfile` to:

`POST https://akoz002-nodejs-file-metadata.herokuapp.com/api/fileanalyse`

#### Tests

A set of basic tests can be found at `tests/tests.js`. To execute the tests in a local environment, first start the server with `npm start`. Then to execute the tests run `npm test`. Environment variable `APP_URL` is used by the tests to locate the app server. This defaults to a local server at `http://localhost:3000/api/fileanalyse/`. 

Environment variable `NODE_ENV` may also need to be defined in the local environment, as it tells the tests what environment the app server is running on. If undefined it defaults to a development environment. You can also define a local `.env` file, and it will be read by the app.
