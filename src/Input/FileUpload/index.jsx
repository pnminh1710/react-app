import React from 'react';
import './styles.css';

const ERROR_MESSAGE = 'Some of your file(s) does not match, please re-upload';


class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      error: null,
      isUploaded: false,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { files } = event.target;
    let error = null;
    const numOfFile = files.length;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let previewFiles = [];
    for (let i = 0; i < numOfFile; i++) {
      previewFiles[i] = {
        file: files[i],
        name: files[i].name,
        path: URL.createObjectURL(files[i]),
      };
    };
    const imgList = previewFiles.map((file, index) => {
      if (!allowedExtensions.exec(file.name)) {
        error = ERROR_MESSAGE;
        return null;
      }
      return (
        <div key={index} className="container">
          <img alt={file.name} src={file.path} />
        </div>
      );
    });
    this.setState({
      files: imgList,
      isUploaded: true,
      error,
    });
  }

  render() {
    const { files, isUploaded, error } = this.state;
    return (
      <div>
        <input
          id="img-upload-input" type="file" onChange={this.handleChange}
          multiple data-filetype="jpg|jpeg|png" />
        {!isUploaded && <label className="upload-label" htmlFor="img-upload-input" >+</label>}
        <div className="wrapper">
          {files}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    )
  }
}

export default ImageUpload;
