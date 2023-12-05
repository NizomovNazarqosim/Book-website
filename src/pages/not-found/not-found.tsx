import React from 'react';
import './not-found.css';
import NotFoundImg from '../../images/not-found.png';
import {Button} from '@mui/material';

export const NotFound = () => {

    const reload = () => {
        window.location.reload();
    }
    const home = () => {
        window.location.href='/books'
    }


    return (
        <div className="not-found">
            <div className="not-found-div">
                <img src={NotFoundImg} alt="Not-Found-Image" />
            </div>
            <div className="not-found-btns">
            <Button onClick={home} className='err-btn' style={{backgroundColor: '#6200EE', display:'flex'}} type='submit' variant='contained' fullWidth={true} disableElevation={true} sx={{marginTop:2, textTransform: 'none'}} >Go Home Page</Button>
            <Button onClick={reload} className='err-btn-2' style={{backgroundColor: 'transparent', border: '#6200EE'}} type='submit' variant='contained' fullWidth={true} disableElevation={true} sx={{marginTop:2, textTransform: 'none'}} >Reload Page</Button>
            </div>
        </div>
    )
}