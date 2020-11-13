
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

A set of basic tests can be found at `tests/tests.js`. The tests can be executed by running `npm test` from the root directory.

The `.env` file contains two parameters for configuring the tests. The `APP_URL` is used by the tests to locate the app server. The `NODE_ENV` tells the tests what environment the app server is running on.

By default the tests will run against the app deployed to the cloud (on Heroku as above), and on the production environment (to match the cloud environment).
