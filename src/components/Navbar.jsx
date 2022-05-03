import React, { Component } from 'react'
import FavoriteIcon from '@mui/icons-material/FavoriteIcon';
import './index.css'
import { Typography } from '@mui/material';
import {Link} from "react-router-dom"
export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar-header'>
        <Link to="/" style={{ textDecoration: 'none', color: '#d47c50'}}><h1>MYmovie.com</h1></Link>
        <Link to="/favorites">
          <Typography variant='h2'>
            <FavoriteIcon />
          </Typography>
        </Link>
      </div>
    )
  }
}
