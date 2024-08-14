"use client";

import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getOwnBookQuery, useBookCreateQuery } from "@/hooks/use-books-query";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  justifyContent: "center",
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};

const UploadBook = () => {
  const { data } = getOwnBookQuery()
  const [options, setOptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      const bookNames = data.data.map((book: any) => book.bookName);
      setOptions(bookNames);
    }
  }, [data]);


  const { control, handleSubmit, reset, setValue: setFormValue } = useForm({
    defaultValues: {
      bookName: '',
      authorName: '',
      category: '',
      quantity: null,
      rentPrice: null,
      cover: null,
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalSubmit = () => {
    handleClose();
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };
  const { mutate: addBook, isSuccess, isPending, isError, error } = useBookCreateQuery();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('bookName', data.bookName);
    formData.append('authorName', data.authorName);
    formData.append('category', data.category);
    formData.append('quantity', String(Number(data.quantity)));
    formData.append('rentPrice', String(Number(data.rentPrice)));
    if (selectedFile) {
      formData.append('cover', selectedFile);
    }

    addBook(formData, {
      onSuccess: () => {
        reset();
        setFileName(null)
      },
    });

  };



  return (
    <Box>
      <Box sx={{ width: 400 }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}
        >
          <Box sx={{ width: 400, mx: 'auto' }}>
            <Controller
              name="bookName"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={value}
                  onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                    field.onChange(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Search Book" />}
                />
              )}
            />
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ mt: 2, width: "100%" }}
            >
              Add
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 500 }}>
              <Controller
                name="bookName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Book Name"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <Controller
                name="authorName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Author Name"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                )}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      onChange={(event: SelectChangeEvent) => field.onChange(event.target.value)}
                    >
                      <MenuItem value="Fantasy">Fantasy</MenuItem>
                      <MenuItem value="Science">Science</MenuItem>
                      <MenuItem value="Business">Business</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              <Button
                variant="contained"
                onClick={handleModalSubmit}
              >
                Add
              </Button>
            </Box>
          </Modal>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="rentPrice"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rent Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, color: 'blue' }}>
            <FileUploadOutlinedIcon
              sx={{ fontSize: 30, cursor: 'pointer' }}
              onClick={handleIconClick}
            />
            {fileName ? (
              <Typography sx={{ ml: 2 }}>{fileName}</Typography>
            ) : (
              <Typography sx={{ ml: 2 }}>Upload Book cover</Typography>
            )}
            <Input
              inputRef={fileInputRef}
              type="file"
              onChange={handleFileChange}
              sx={{ display: 'none' }}
            />
          </Box>
          <Button
            disabled={isPending}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UploadBook;
