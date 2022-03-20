import React from 'react';
import './UploadImgButton.scss';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

function UploadImgButton({ className, image, setImage }) {
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  console.log(image.name);

  return (
    <div className={className}>
      <label htmlFor="uploadImgButton">
        <input
          onChange={handleChange}
          accept="image/*"
          id="uploadImgButton"
          type="file"
        />
        <Button variant="outlined" component="span">
          Upload
        </Button>
        <p>{image ? <CheckIcon color="primary" /> : 'No file choosen'}</p>
      </label>
    </div>
  );
}

UploadImgButton.propTypes = {
  className: PropTypes.string.isRequired,
  image: PropTypes.instanceOf(Object).isRequired,
  setImage: PropTypes.instanceOf(Object).isRequired,
};

export default UploadImgButton;
