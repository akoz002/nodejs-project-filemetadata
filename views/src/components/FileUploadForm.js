
import React from 'react';

/*
 * Form to upload a file and display analysis results.
 */

export default class FileUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadingFile: false,
      fileInfo: null
    };

    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      uploadingFile: true,
      fileInfo: null
    });

    const formData = new FormData();
    formData.append("upfile", this.fileInput.current.files[0]);

    fetch("/api/fileanalyse", {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(json => this.setState({
      uploadingFile: false,
      fileInfo: json
    }))
    .catch(err => console.error(err));
  }

  // formats output value with quotes and/or comma
  formatValue(key, index, length) {
    const value = this.state.fileInfo[key];
    const result = typeof value === "string" ? `"${value}"` : `${value}`;
    return index < length - 1 ? result + ',' : result;
  }

  render() {
    let fileInfoResult = null;
    if (this.state.uploadingFile) {
      fileInfoResult = (
        <p className='code-block'>
          <code>Uploading file...</code>
        </p>
      );
    }
    else if (this.state.fileInfo) {
      fileInfoResult = (
        <ul className='code-block'>
          <code>
            <li>{'{'}</li>
            <ul>
              {Object.keys(this.state.fileInfo).map((key, index, array) =>
                <li key={key}>
                  "{key}": {this.formatValue(key, index, array.length)}
                </li>
              )}
            </ul>
            <li>{'}'}</li>
          </code>
        </ul>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" required ref={this.fileInput} />
        <input type="submit" value="Upload" />
        {fileInfoResult}
      </form>
    );
  }
}
