import React, { useState } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUploader";
import { Box, Typography } from "@mui/material";

function App() {
  const [formImages, setFormImages] = useState<(string | File)[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  return (
    <Box
      sx={{
        p: 2,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography variant="h2">Image Uploader</Typography>
      </Box>
      <Box>
        <ImageUploader
          formImages={formImages}
          setFormImages={setFormImages}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
      </Box>
    </Box>
  );
}

export default App;
