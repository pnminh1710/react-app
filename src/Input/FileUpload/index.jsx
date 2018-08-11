import React from 'react';
import './styles.css';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      files: [],
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { files } = event.target;
    const numOfFile = files.length;
    let previewFiles = [];
    for (let i = 0 ; i < numOfFile; i++) {
      previewFiles[i] = {
        file: files[i],
        name: files[i].name,
        path: URL.createObjectURL(files[i]),
      };
    };
    const imgList = previewFiles.map((file, index) =>
    <div className="container">
      <img key={index} alt={file.name} src={file.path} />
    </div>
    );
    this.setState({
      files: imgList,
    });
  }

  render() {
    const { files } = this.state;
    return (
      <div>
        <input id="img-upload-input" type="file" onChange={this.handleChange} multiple/>
        <label className="upload-label" htmlFor="img-upload-input" >Choose a file</label>
        <div className="wrapper">
          {files}
        </div>
      </div>
    )
  }
}

export default ImageUpload;
