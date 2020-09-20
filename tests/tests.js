/*
 * Basic tests for the File Metadata Microservice.
 * Alex Kozlov, 2020
 */

const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');
const assert = require('assert').strict;
require('dotenv').config();

/*
 * Upload a file and validate the response.
 */

function validateFileUpload(testFile) {
  const form = new FormData();
  if (testFile) {
    form.append('upfile', fs.createReadStream(testFileDir + testFile.name));
  }

  return fetch(process.env.APP_URL, { method: 'POST', body: form })
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
          assert.match(text, /No file uploaded/);
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
  for (const testFile of testFiles) {
    await validateFileUpload(testFile);
  }

  // validate not uploading a file
  await validateFileUpload();
}

runTests();
