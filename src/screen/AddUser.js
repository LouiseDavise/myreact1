import React, { useState, useEffect } from 'react';
import { getUser, addUser } from '../api';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MyAlert from '../component/MyAlert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    rowContainer: {
        marginTop: 10,
    }
}));

export default function FloatingActionButtonSize(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errMessage, setErrMessage] = useState(null);

    const params = new URLSearchParams(props.location.search);
    const id = params.get('id');

    const onSaveUser = () => {
        if (!errMessage) {
            addUser(email, password, fullName, address, phone).then(() => {
                window.location.href = '/userlist';
            })
                .catch((err) => {
                    setErrMessage(err);
                })
        }
    }

    const closeErr = () => {
        setErrMessage(null);
    }
    const checkEmail = () => {
        getUser(email).then((users) => {
            if (!users) {

            }
            else {
                setErrMessage('Existing Email Address');
            }
        })
    }
    const checkPassword = () => {
        if (password.length < 6) {
            setErrMessage('Password must be at least 6 characters')
        }
    }
    return (
        <div>
            <div>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Add User
                    </Typography>
                        {
                            <form>
                                <div>Email</div>
                                <TextField type="email" value={email} fullWidth onChange={(e) => setEmail(e.target.value)} onBlur={(e) => checkEmail()}></TextField>
                                <div>Password</div>
                                <TextField type="password" value={password} fullWidth onChange={(e) => setPassword(e.target.value)} onBlur={(e) => checkPassword()}></TextField>
                                <div>Full Name</div>
                                <TextField type="text" value={fullName} fullWidth onChange={(e) => setFullName(e.target.value)}></TextField>
                                <div className={classes.rowContainer}>Address</div>
                                <TextField value={address} fullWidth onChange={(e) => setAddress(e.target.value)}></TextField>
                                <div className={classes.rowContainer}>Phone</div>
                                <TextField value={phone} fullWidth onChange={(e) => setPhone(e.target.value)}></TextField>
                            </form>
                        }
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" variant="contained" onClick={onSaveUser}>Save</Button>
                    </CardActions>
                </Card>
                <Snackbar open={Boolean(errMessage)} autoHideDuration={6000} onClose={closeErr} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <MyAlert onClose={closeErr} severity="error">
                        {errMessage}
                    </MyAlert>
                </Snackbar>
            </div>
        </div>
    );
}
