import React from 'react';
import Button from '@material-ui/core/Button';
import { logout } from '../api'

export default function Dashboard(props) {
    const onLogout = () => {
        logout();
    }
    return (
        <div>
            <h3>This is Dashboard</h3>
            <Button onClick={onLogout}>Logout</Button>
        </div>
    )

}