/*
 * Basic tests for the File Metadata Microservice.
 * Alex Kozlov, 2020
 */

const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');
const assert = require('assert').strict;
require('dotenv').config();

const APP_URL = process.env.APP_URL || 'http://localhost:3000/api/fileanalyse/';

/*
 * Upload a file and validate the response.
 */

function validateFileUpload(testFile) {
  const form = new FormData();
  if (testFile) {
    form.append('upfile', fs.createReadStream(testFileDir + testFile.name));
  }

  return fetch(APP_URL, { method: 'POST', body: form })
    .then(res => {
      if (testFile) { // expecting successful response
        assert.equal(res.status, 200);
        res.json().then(json => {
          assert.deepEqual(json, testFile);
          console.log("Successfully validated uploading file '%s'", testFile.name);
        });
      }
      else { // expecting error
        assert.equal(res.status, 400);
        res.text().then(text => {
          if (process.env.NODE_ENV === 'production') {
            assert.match(text, /Bad Request/);
          }
          else {
            assert.match(text, /No file uploaded/);
          }
          console.log('Successfully validated uploading no file');
        });
      }
    });
}

/*
 * Run basic tests.
 */

const testFileDir = __dirname + '/test-files/';

const testFiles = [
  { name: 'document.txt', type: 'text/plain', size: 30 },
  { name: 'Desert.jpg', type: 'image/jpeg', size: 845941 },
  { name: '03 Flight of Icarus.mp3', type: 'audio/mpeg', size: 3693679 }
];

async function runTests() {
  if (process.env.NODE_ENV === 'production') {
    console.log('Running tests on production environment');
  }
  else {
    console.log('Running tests on development environment');
  }

  console.log(`Running tests on app URL: '${APP_URL}'\n`);

  // validate uploading test files
  for (const testFile of testFiles) {
    await validateFileUpload(testFile);
  }

  // validate not uploading a file
  await validateFileUpload();
}

runTests();
