import { Box, Button, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageUploaderProps {
  formImages: (string | File)[];
  setFormImages: React.Dispatch<React.SetStateAction<(string | File)[]>>;
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null); // ホバー状態を追跡するための状態

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newImage = URL.createObjectURL(file);
      props.setFormImages((prevImages) => [...prevImages, file]);
      props.setPreviewImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const handleDelete = (index: number) => {
    props.setFormImages(props.formImages.filter((_, i) => i !== index));
    props.setPreviewImages(props.previewImages.filter((_, i) => i !== index));
  };

  return (
    <Grid container spacing={2}>
      {props.previewImages.map((image, index) => (
        <Grid item key={index}>
          <Box
            position="relative"
            width="140px"
            height="140px"
            onMouseEnter={() => setHoverIndex(index)} // マウスが入ったらホバー状態を設定
            onMouseLeave={() => setHoverIndex(null)} // マウスが離れたらホバー状態を解除
          >
            <img
              src={image}
              alt={`uploaded-${index}`}
              style={{ width: "140px", height: "140px", objectFit: "contain" }}
            />
            {hoverIndex === index && (
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bgcolor="rgba(50, 50, 50, 0.7)" // グレー色の半透明
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Grid>
      ))}
      {props.previewImages.length < 5 && (
        <Grid item>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="outlined"
              component="span"
              style={{ width: "140px", height: "140px" }}
            >
              upload
            </Button>
          </label>
        </Grid>
      )}
    </Grid>
  );
};

export default ImageUploader;
