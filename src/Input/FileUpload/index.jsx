import React from 'react';
import './styles.css';

const ERROR_MESSAGE = 'Some of your file(s) does not match, please re-upload';
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;


class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      displayFiles: [],
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.closePreview = this.closePreview.bind(this);
    this.displayPreview = this.displayPreview.bind(this);
  }

  displayPreview(files) {
    const imgList = files.map((file, index) => {
      return (
        <div key={index} className="container">
          <img alt={file.name} src={file.path} />
          <span id={`${index}-${file.path}`} className="close-preview" onClick={(event) => this.closePreview(event)}>✖</span>
        </div>
      );
    });
    return imgList;
  }

  closePreview(event) {
    const { files } = this.state;
    const removeIndex = event.target.id.split('-')[0];
    files.splice(removeIndex, 1);
    const displayFiles = this.displayPreview(files);
    this.setState({ files, displayFiles });
  }

  handleChange(event) {
    const storedFiles = this.state.files;
    const { files } = event.target;
    let error = '';
    const numOfFile = files.length;
    let addedFiles = [];
    // FileList cannot be loop with map so we use pure for loop
    for (let i = 0; i < numOfFile; i += 1) {
      if (!allowedExtensions.exec(files[i].name)) {
        error = ERROR_MESSAGE;
        break;
      }
      addedFiles[i] = {
        file: files[i],
        name: files[i].name,
        path: URL.createObjectURL(files[i]),
      };
    }
    if (this.state.files.length > 0) {
      addedFiles = storedFiles.concat(addedFiles);
    }
    const imgList = this.displayPreview(addedFiles);
    this.setState({
      files: addedFiles,
      displayFiles: imgList,
      error,
    });
    event.preventDefault();
  }

  render() {
    const { displayFiles, error } = this.state;
    return (
      <div>
        <input
          id="img-upload-input" type="file" onChangeCapture={this.handleChange}
          multiple accept="image/*"
        />
        <div className="wrapper">
          {displayFiles}
          <label className="upload-label" htmlFor="img-upload-input">+</label>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}

export default ImageUpload;
