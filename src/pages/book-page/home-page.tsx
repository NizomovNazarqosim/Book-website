import React, { useState, useEffect } from 'react';
import './home-page.css';
import {Header} from '../components/header';
import { Button, Box, Modal, TextField } from '@mui/material';
import { IBook } from './../components/book-interface';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export let book: IBook[] = [
   {title:"CS course", description: "Computer science is the study of computers and computing as well as their theoretical and practical applications.", author: "Oliver Tomson", published: 2012, pages: 287},
   {title:"Harry Poter", description: "Book is about Harry poter life who is the most famous man", author: "J.K. Rowling ", published: 1997, pages: 645},
   {title:"Atomic  Habits", description: "Atomic Habits teaches readers a simple set of rules for creating good habits and breaking bad ones.", author: "James Clear", published: 2019, pages: 120}
]

interface ISignInForm {
  title: string;
  author:string;
  published: number;
  description: string;
  pages: number;
}

export const HomePage = () => {
  const [numberOfBooks, setNumberOfBooks] = useState(7);
  const [books, setBooks] = useState<IBook[] | []>();
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState(0);
  const [pages, setPages] = useState(0);

  const {handleSubmit, control} = useForm<ISignInForm>();
    const {errors} = useFormState({
        control
    })


    const onSubmit: SubmitHandler<ISignInForm> = (data: IBook) => {
      // if(editing){
      //   const newBook:IBook = {
      //     title: title,
      //     author: author,
      //     description: description,
      //     published: published,
      //     pages: pages,
      //   } 
      //   book = book.map(e => e == editingBook ? newBook : e);
      //   setBooks(book)
      //   setEditing(false)
      // }else{
        book.push(data)
        setBooks(book)
      // }
      handleClose()
    };

  const deleteBook = (deletedBook: IBook) => {
    book = book.filter(e => e!==deletedBook)
    setBooks(book)
  }

  const editBook = (item:IBook) => {
    setEditing(true)
    setTitle(String(item?.title));
    setAuthor(String(item?.author));
    setDescription(String(item?.description));
    setPublished(Number(item?.published));
    setPages(Number(item?.pages))
    setEditingBook(item);
    handleOpen()
  }
  const handleEdit = () => {
    const newBook:IBook = {
      title: title,
      author: author,
      description: description,
      published: published,
      pages: pages,
    } 
    book = book.map(e => e == editingBook ? newBook : e);
    setBooks(book)
    setEditing(false)
    handleClose()
  }

  useEffect(() => {
     setBooks(book)
     console.log('setBook ishladi')
  }, [book])
  
  const createBook = () => {
    handleOpen()
  }
  return (<>
    <div className='home'>
      <Header/>
      {/* starting part of creating part */}
      <section className='add'>
        <div className="add-left">
           <h2>You've got <span>{numberOfBooks}  book</span></h2>
        </div>
        <div className="add-right">
          <input type="text" placeholder='Enter your name' />
          <Button onClick={createBook} className='add-btn' style={{backgroundColor: '#6200EE', display:'flex'}} type='submit' variant='contained' disableElevation={true} >+  Create</Button>
        </div>
      </section>
      {/* ending part of creating part */}
      <p className="description">Your task today</p>
      {/* starting part of the books */}
      <div className="books-container">
        {books ? books?.map((item, i) => (
           <div className='book-wrapper' key={i}>
            <h3 className='book-title'>{item.title}</h3>
            <p className='book-desc'>{item.description}</p>
            <div className='book-detail'>
              <p className='book-author'>{item.author}: {item.published}-year</p>
              <p className='book-page'>{item.pages} pages</p>
            </div>
            <div className="icons">
              <EditIcon onClick={() => editBook(item)}  fontSize="large" sx={{color:'#fff'}} className="edit-icon" />
              <DeleteIcon onClick={() => deleteBook(item)} fontSize="large" sx={{color:'#fff'}} className="delete-icon"/>
            </div>
           </div>
        )) : (<h2>Not found</h2>)}
      </div>
      {/* ending part of the books */}
    </div>
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div className="modal-header">
          <h3>Create a book</h3>
          <p onClick={handleClose} className="close-btn">x</p>
         </div>
         <form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
            <Controller control={control} name='title' rules={{required: "Title is required"}} render={({field}) =>(
                <TextField label="Enter title of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) =>{
                  field.onChange(e);
                  setTitle(String(e.target.value))
                }}  value={title} error={!!errors.title?.message && !!!editing} helperText={errors.title?.message} />
            )}></Controller>
            <Controller control={control} name='author' rules={{required: "Author is required"}} render={({field}) =>(
                <TextField label="Enter author of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => {
                  field.onChange(e);
                  setAuthor(String(e.target.value))
                }}  value={author} error={!!errors.author?.message && !editing} helperText={errors.author?.message} />
            )}></Controller>
            <Controller control={control} name='description' rules={{required: "Description is required"}} render={({field}) =>(
                <TextField label="Enter description of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) =>{
                  field.onChange(e);
                  setDescription(String(e.target.value))
                }}  value={description} error={!!errors.description?.message && !editing} helperText={errors.description?.message} />
            )}></Controller>
            <Controller control={control} name='published' rules={{required: "Published is required"}} render={({field}) =>(
                <TextField label="Enter published year of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) =>{
                  field.onChange(e);
                  setPublished(Number(e.target.value))
                }}  value={published} error={!!errors.published?.message && !editing} helperText={errors.published?.message} />
            )}></Controller>
            <Controller control={control} name='pages' rules={{required: "Pages is required"}} render={({field}) =>(
                <TextField label="Enter pages of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => {
                  field.onChange(e);
                  setPages(Number(e.target.value))
                }}  value={pages} error={!!errors.pages?.message && !editing} helperText={errors.pages?.message} />
            )}></Controller>
            <div className="create-modal-btns">
            <Button className='close-btn-modal' onClick={handleClose} variant='contained' fullWidth={true} disableElevation={true} sx={{marginTop:2, textTransform: 'none'}} >Close</Button>
            <Button style={{backgroundColor: '#6200EE'}} type='submit' variant='contained' fullWidth={true} disableElevation={true} sx={{marginTop:2, textTransform: 'none'}} >Button</Button>
            </div>
            </form>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div className="modal-header">
          <h3>Create a book</h3>
          <p onClick={handleClose} className="close-btn">x</p>
         </div>
         <form className='auth-form_form' onSubmit={handleEdit}>
                <TextField label="Enter title of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) =>{
                  setTitle(String(e.target.value))
                }}  value={title} required  />
           
                <TextField label="Enter author of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => {
                  setAuthor(String(e.target.value))
                }}  value={author} />
                <TextField required label="Enter description of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) =>{
                  setDescription(String(e.target.value))
                }}  value={description} />
          
                <TextField required label="Enter published year of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) =>{
                  setPublished(Number(e.target.value))
                }}  value={published} />
                <TextField required label="Enter pages of the book" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => {
                  setPages(Number(e.target.value))
                }}  value={pages} />
            <div className="create-modal-btns">
            <Button className='close-btn-modal' onClick={handleClose} variant='contained' fullWidth={true} disableElevation={true} sx={{marginTop:2, textTransform: 'none'}} >Close</Button>
            <Button style={{backgroundColor: '#6200EE'}} type='submit' variant='contained' fullWidth={true} disableElevation={true} sx={{marginTop:2, textTransform: 'none'}} >Button</Button>
            </div>
            </form>
        </Box>
      </Modal>
   </>
  )
}
