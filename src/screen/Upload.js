import React, {useState, useEffect , useContext} from 'react';
import Button from '@material-ui/core/Button';
import {uploadFile, addFile, getFile, deleteFile} from '../api';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from 'mui-datatables';
import { makeStyles} from '@material-ui/core/styles';
import {AuthContext} from '../component/Context';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


export default function Upload(props){

    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const {userData} = useContext(AuthContext);
    const [showImageDlg, setShowImageDlg] = useState(false);
    const classes = useStyles();
    const [activeImage, setActiveImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleFile = (e) => {
        console.log(e.target.files);
        setFile(e.target.files[0])
    }

    const columns = [
        {
            name: 'url',
            label: 'Image',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, meta) =>{
                    console.log('filename = ', meta.rowData[1])
                    return <img src={value} style={{maxHeight: '80px'}} 
                            onClick={() => onClickImage(meta.rowData[1], value)}/>
                }
            }
        },
        {
            name: 'filename',
            label: 'Filename'
        },
        {
            name: 'size',
            label: ''
        },
        {
            name: 'id',
            label: 'Action',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <Button onClick={(e) => onDeleteFile(value)}>Delete</Button>
                    )
                }
            }
        }
    ]
    
    useEffect(() => {
        loadFile();
    }, [userData])

    const onClickImage = (filename, url) => {
        setActiveImage({filename, url});
        setShowImageDlg(true);
    }

    const loadFile = () =>{
        if (userData){
            console.log('get files for id:', userData.id);
            setIsLoading(true)
            getFile({userId: userData.id}).then((data) =>{
                console.log(data);
                setFileList(data);
                // Delay Loading
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000)
                
            })
        }
    }

    const onUpload = () => {
        console.log('upload', {file});
        if(file){
            uploadFile(file).then((url) => {
                addFile({
                    filename: file.name,
                    size:file.size,
                    type: file.type,
                    url,
                    userId:userData.id
                })
                .then(() =>{
                    console.log('Upload result, url: ', url)
                    loadFile();
                })
                .catch((err) => console.log(err))
                console.log('Upload result, url', url)
            })
        }
    }

    const onDeleteFile = (id) => {
        console.log('===> Delete file id', id);
        deleteFile({id, userId: userData.id})
        .then(() => {
            loadFile();
        })
        .catch((err) => console.log(err))
    }
    
    const onCloseImageDlg = () => {
        setShowImageDlg(false);
    }

    return(
        <div className={classes.container}>
            <div>
                <input type="file" onChange={handleFile}/>
                <Button color="primary" variant="contained" onClick={onUpload}>
                    Upload
                </Button>
            </div>
            <MUIDataTable
                columns={columns}
                data={fileList}            
            />
            <Dialog open={showImageDlg} onClose={onCloseImageDlg} fullWidth maxWidth="md">
                <DialogTitle>{activeImage && activeImage.filename}</DialogTitle>
                <DialogContent>
                    {
                        activeImage && (
                            <img src={activeImage.url} style={{maxWidth: '100%', maxHeight: '100%'}}></img>
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseImageDlg} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="primary" />
            </Backdrop>
        </div>
        
    )
}