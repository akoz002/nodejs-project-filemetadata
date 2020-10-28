'use strict';
/*
 * Form to upload a file and display analysis results.
 */

class FileUploadForm extends React.Component {
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
    }).then(res => res.json()).then(json => this.setState({
      fileInfo: JSON.stringify(json, null, 1)
    })).catch(err => console.error(err));
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "file",
      required: true,
      ref: this.fileInput
    }), /*#__PURE__*/React.createElement("input", {
      id: "button",
      type: "submit",
      value: "Upload"
    }), this.state.fileInfo && /*#__PURE__*/React.createElement("p", {
      className: "code"
    }, /*#__PURE__*/React.createElement("code", null, this.state.fileInfo)));
  }

}
/*
 * Render the component.
 */


ReactDOM.render( /*#__PURE__*/React.createElement(FileUploadForm, null), document.getElementById('file-upload-form'));