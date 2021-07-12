import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import { login } from '../api/index';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItem: 'center',
        width: '100vw'
    },
    loginCard: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        height: '400px',
        alignItem: 'center',
        marginTop: '40px'
    },
    avatar: {
        marginTop: '25px',
        marginBottom: '25px',
        backgroundColor: 'salmon',
        color: 'white',
    },
    textField: {
        margin: '15px',
        width: '90%'
    }
}));

export default function Login(props) {

    const classes = useStyles();
    const [username, setUsermame] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (e) => {
        setUsermame(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onLogin = () => {
        login(username, password).then((data) => {
            console.log('login success with result=', data);

            // Change Page
            props.history.push('/dashboard');
            // window.location.href = '/dashboard'
        })
            .catch((err) => console.log('login error with result=', err));
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.loginCard} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <TextField
                    className={classes.textField}
                    id="standard-basic" label="Email"
                    type="text"
                    onChange={onChangeUsername}
                />
                <TextField
                    className={classes.textField}
                    id="standard-basic" label="Password"
                    type="text"
                    onChange={onChangePassword}
                />
                <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={onLogin}
                >Sign In</Button>
            </Paper>
        </div>
    )
}