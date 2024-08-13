import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

const FileUpload = () => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleClick = () => {
        document.getElementById('file-input').click();
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{ mb: 2 }}
                >
                    Choose File
                </Button>

                {fileName && (
                    <Typography variant="body1">
                        Selected file: {fileName}
                    </Typography>
                )}
            </Box>


        </Box>
    );
};

export default FileUpload;
