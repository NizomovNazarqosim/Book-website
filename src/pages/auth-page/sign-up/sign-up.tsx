import React from 'react';
import './sign-up.css';
import {Button, TextField, Typography} from '@mui/material'
import {Controller, SubmitHandler, useForm, useFormState} from 'react-hook-form';
import GoogleIcon from '../../../images/google-icon.svg';
import FacebookIcon from '../../../images/facebook-icon.svg';
import { Link } from 'react-router-dom';

interface ISignInForm {
    username: string;
    email:string;
    username2: string;
    password: string;
}


export const SignUp: React.FC = () => {
  const {handleSubmit, control} = useForm<ISignInForm>();
    const {errors} = useFormState({
        control
    })

    const onSubmit: SubmitHandler<ISignInForm> = (data) => {
        window.location.href='/books'
    };
  return (
    <div className='auth-page'>
         <div className='auth-form'>
        <Typography variant="h4" component="div" gutterBottom={true}>
            Sign in
        </Typography>
        <Button style={{marginBottom:'20px'}} fullWidth={true} className='icon-wrapper' variant='outlined' onClick={() => { alert('clicked');}}>
           <div className="img-wrapper">
           <img src={GoogleIcon} alt="efw" />
           </div>
           <p>Continue with Google</p>
        </Button>
        <Button style={{marginBottom:'20px'}} fullWidth={true} className='icon-wrapper' variant='outlined' onClick={() => { alert('clicked');}}>
            <div className="img-wrapper">
              <img src={FacebookIcon} alt="efw" />
            </div>

        <p>Continue with Google</p>
        </Button>
       <div className="lines">
        <span className='line'></span>
        <p>OR</p>
        <span className='line'></span>
       </div>
        <form className='auth-form_form' onSubmit={handleSubmit(onSubmit)}>
            <Controller control={control} name='username' rules={{required: "Username is required"}} render={({field}) =>(
                <TextField label="Enter your username" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => field.onChange(e)}  value={field.value} error={!!errors.username?.message} helperText={errors.username?.message} />
            )}></Controller>
            <Controller control={control} name='email' rules={{required: "Email is required"}} render={({field}) =>(
                <TextField label="Enter your email" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => field.onChange(e)}  value={field.value} error={!!errors.email?.message} helperText={errors.email?.message} />
            )}></Controller>
            <Controller control={control} name='password' rules={{required:"Password is required"}} render={({field}) =>(
                <TextField label="password" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => field.onChange(e)}  value={field.value} error={!!errors.password?.message} helperText={errors.password?.message}/>
            )}></Controller>
            <Controller control={control} name='username2' rules={{required: "Username is required"}} render={({field}) =>(
                <TextField label="Enter your username" size="small" margin='normal' className='auth-form_input' fullWidth={true} onChange={(e) => field.onChange(e)}  value={field.value} error={!!errors.username2?.message} helperText={errors.username2?.    message} />
            )}></Controller>
                <Button style={{backgroundColor: '#6200EE'}} type='submit' variant='contained' fullWidth={true} disableElevation={true} sx={{marginTop:2, textTransform: 'none'}} >Button</Button>
        </form>
        <p>Already signed up? <Link to='/login'>Go to sign up.</Link></p>
    </div>
    </div>
  )
}

