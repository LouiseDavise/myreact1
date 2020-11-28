import React, { useState } from 'react'

const styles = {
    title: {
        color: 'red'
    }
}


export default function InputForm() {

    const [name, setName] = useState('N/A');
    const [phone, setPhone] = useState('N/A');
    const [address, setAddress] = useState('N/A');

    const onChangeName = (event) => {
        // The text is saved isnid of event.target.value
        console.log(event.target.value);
        setName(event.target.value)
    }
    const onChangeAddress = (event) => {
        // The text is saved isnid of event.target.value
        console.log(event.target.value);
        setAddress(event.target.value)
    }
    const onChangePhone = (event) => {
        // The text is saved isnid of event.target.value
        console.log(event.target.value);
        setPhone(event.target.value)
    }

    return (
        <div>
            <div>
                Name: <input type="text" placeholder="Input Full name" onChange={onChangeName} /><br />
                Address: <input type="text" placeholder="Input Address" onChange={onChangeAddress} /><br />
                Phone: <input type="text" placeholder="Input Phone" onChange={onChangePhone} /><br />
                <input type="submit" />
            </div>
            <h3 style={styles.title}>You Input</h3>
            Name: {name.toUpperCase()}<br />
            Address: {address.toUpperCase()}<br />
            Phone: {phone.toUpperCase()}
        </div>

    )

}