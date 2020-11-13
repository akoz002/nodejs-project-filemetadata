
import React from 'react';

/*
 * Form to upload a file and display analysis results.
 */

export default class FileUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileInfo: null
    };

    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      fileInfo: 'Processing file...'
    });

    const formData = new FormData();
    formData.append("upfile", this.fileInput.current.files[0]);

    fetch("/api/fileanalyse", {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(json => this.setState({
      fileInfo: JSON.stringify(json, null, 1)
    }))
    .catch(err => console.error(err));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" required ref={this.fileInput} />
        <input id="button" type="submit" value="Upload" />
        {
          this.state.fileInfo &&
          <p className='code'><code>{this.state.fileInfo}</code></p>
        }
      </form>
    );
  }
}
