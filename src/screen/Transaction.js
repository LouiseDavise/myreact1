import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '85vw',
        margin: 'auto',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dateField: {
        width: '300px',
    },
    descriptionField: {
        width: '400px',
    },
    ammountField: {
        width: '250px',
    },
}));

export default function Transaction(props) {

    const classes = useStyles();
    const [transactionList, setTransactionList] = useState([]);

    
    useEffect(() => {
        if (transactionList.length == 0){
            insertEmptyRow();
        }
    }, [])

    const insertEmptyRow = () => {
        let newList = [... transactionList, {
            data: new Date(),
            description: '',
            debit: 0,
            credit: 0,
            balance: 0,
        }];
        setTransactionList(newList);
    }

    const onChangeDate = (e, index) => {
        // Clone transactionList into a new variable
        let newList = [... transactionList];
        // Change transactionList[index].description to new value (e.target.value)
        newList[index].date = e.target.value;
        // Save back to state 'transactionList
        setTransactionList(newList)
        
    }
    const onChangeDescription = (e, index) => {
        // Clone transactionList into a new variable
        let newList = [... transactionList];
        // Change transactionList[index].description to new value (e.target.value)
        newList[index].description = e.target.value;
        // Save back to state 'transactionList
        setTransactionList(newList)
    }
    const onChangeDebit = (e, index) => {
        // Clone transactionList into a new variable
        let newList = [... transactionList];
        // Change transactionList[index].description to new value (e.target.value)
        newList[index].debit = Number(e.target.value);
        // Re-calculate balance from
        newList = calculateBalance(newList)
        // Save back to state 'transactionList
        setTransactionList(newList)
    }
    const onChangeCredit = (e, index) => {
        // Clone transactionList into a new variable
        let newList = [... transactionList];
        // Change transactionList[index].description to new value (e.target.value)
        newList[index].credit = Number(e.target.value);
        // Re-calculate balance from
        newList = calculateBalance(newList)
        // Save back to state 'transactionList
        setTransactionList(newList)

    }

    const calculateBalance = (transList) => {
        let balance = 0;
        for (let i = 0; i < transactionList.length; ++i){
            transList[i].balance = balance + transList[i].debit - transList[i].credit;
            balance = transList[i].balance;
        }
        return transList;
    }

    console.log(transactionList);

    return(
        <div className={classes.root}>
            <div className={classes.rowContainer}>
                <div className={classes.dateField}>Date</div>
                <div className={classes.descriptionField}>Description</div>
                <div className={classes.ammountField}>Debit</div>
                <div className={classes.ammountField}>Credit</div>
                <div className={classes.ammountField}>Balance</div>
            </div>
            {
                transactionList.map((item, index) => {
                    return(
                        <div className={classes.rowContainer}>
                            <div className={classes.dateField}>
                         
                                <TextField 
                                type="date" 
                                variant="outlined"
                                value={item.date}
                                onChange={(e) => onChangeDate(e, index)}
                                />
                            </div>
                            <div className={classes.descriptionField}>
                                <TextField
                                type="text" 
                                variant="outlined"
                                value={item.description}
                                onChange={(e) => onChangeDescription(e, index)}
                                />
                            </div>
                            <div className={classes.ammountField}>
                                <TextField 
                                type="number" 
                                variant="outlined"
                                value={item.debit}
                                onChange={(e) => onChangeDebit(e, index)}
                                />
                            </div>
                            <div className={classes.ammountField}>
                                <TextField 
                                type="number" 
                                variant="outlined"
                                value={item.creift}
                                onChange={(e) => onChangeCredit(e, index)}
                                />
                            </div>
                            <div className={classes.ammountField}>
                                <TextField 
                                type="text" 
                                variant="outlined"
                                value={item.balance}
                                />
                            </div>
                        </div>
                    )
                })
            }
            <Button onClick={insertEmptyRow}>Add Row</Button>
        </div>
    )
}