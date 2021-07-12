import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../api';
import { makeStyles, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyless = makeStyles((theme) => ({
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
}))

export default function EditUser(props) {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const classes = useStyless();

    const params = new URLSearchParams(props.location.search);
    const id = params.get('id');

    useEffect(() => {
        if (id) {
            getUserById(id).then((users) => {
                if (users) {
                    if (users.name)
                        setFullName(users.name);
                    if (users.address)
                        setAddress(users.address);
                    if (users.phone)
                        setPhone(users.phone);
                }
            })
        }
    }, [])

    const onSaveUser = () => {
        // if id is null/undifinied
        if (id) {
            updateUser(id, fullName, address, phone).then(() => {
                window.location.href = "/userlist";
            })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Edit User
                    </Typography>
                    {
                        <form>
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
                    <Button size="small" onClick={onSaveUser}>Save</Button>
                </CardActions>
            </Card>
        </div>
    )
}