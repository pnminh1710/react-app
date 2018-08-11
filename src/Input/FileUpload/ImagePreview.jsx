import React from 'react';

const ImagePreview = ({ name, path, dismissFile }) => (
  <img alt={name} src={path} />
);

export default ImagePreview;
