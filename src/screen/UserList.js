import React, { useEffect, useState } from 'react';
import MUIData from 'mui-datatables';
import { getUserList } from '../api';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        flexDirection: 'row',
    }
}))

export default function UserList(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const columns = [
        {
            name: 'name',
            label: 'Full Name',
        },
        {
            name: 'email',
            label: 'Email Address'
        },
        {
            name: 'address',
            label: 'Address'
        },
        {
            name: 'phone',
            label: 'Phone Number'
        },
        {
            name: 'id',
            label: 'Action',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <Button component={Link} to={'/edituser?id=' + value}>Edit</Button>
                    )
                }
            }
        }
    ]

    useEffect(() => {
        getUserList().then((result) => {
            setUsers(result);
        })
            .catch((err) => console.log(err))
    }, [])
    return (
        <div>
            <div className={classes.title}>
                <h3>User List</h3>
                <IconButton component={Link} to='/adduser'>
                    <AddIcon color="primary" />
                </IconButton>
            </div>
            <MUIData
                // title={"User List"}
                data={users}
                columns={columns}
            />
        </div>

    )

}