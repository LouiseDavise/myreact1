import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBsnGCjsIHb4ChXoRBn6-klpnoafWiGH6c",
    authDomain: "louiz-35490.firebaseapp.com",
    projectId: "louiz-35490",
    storageBucket: "louiz-35490.appspot.com",
    messagingSenderId: "1098103181777",
    appId: "1:1098103181777:web:ec67e3915d55a67ef8d0f0",
    measurementId: "G-758LWQ3H5R"
};
// Initialize Firebase
export function initFirebase() {
    console.log('Firebase init : ', firebase.apps.length);
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Firebase DB reference / instance
const db = firebase.firestore();
// Firebase Auth instance
const auth = firebase.auth();

const storage = firebase.storage();

export function login(email, password) {

    return new Promise((resolve, reject) => {
        // then when success
        // catch when fail
        // resolve = then
        // reject = catch
        auth.signInWithEmailAndPassword(email, password).then(() => {
            // the following statements will be executed if login success
            resolve('success');
        })
            .catch(err => {
                // the following statements will be executed if login failure
                reject(err);
            })
    })

}

export function logout() {
    return new Promise((resolve, reject) => {
        auth.signOut().then(function () {
            // Sign-out successful.
            resolve(true);
        }).catch(function (error) {
            // An error happened.
            reject(error);
        });
    })
}

export function onAuthentication(callback) {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            if (callback)
                callback(user);
        } else {
            // No user is signed in.
            if (callback)
                callback(null);
        }
    });
}

export function getUser(email) {

    return new Promise((resolve, reject) => {

        db.collection('users').where('email', '==', email).get().then((result) => {
            if (result.docs.length > 0) {
                let userData = {
                    id: result.docs[0].id,
                    name: result.docs[0].data().name,
                    address: result.docs[0].data().address,
                    phone: result.docs[0].data().phone,
                }
                console.log(userData);
                resolve(userData);
            }
            else{
                resolve(null);
            }
        })
            .catch((err) => reject(err))

    })

}

export function getUserList() {
    return new Promise((resolve, reject) => {
        db.collection('users').get().then((result) => {
            let userList = []; //Empty array
            console.log(result.docs.length)
            for (let i = 0; i < result.docs.length; ++i) {
                userList.push({
                    id: result.docs[i].id,
                    name: result.docs[i].data().name,
                    email: result.docs[i].data().email,
                    address: result.docs[i].data().address,
                    phone: result.docs[i].data().phone,
                })
            }
            console.log(userList);
            resolve(userList); //return the user list we got from Database
        })
            .catch((err) => reject(err));
    })
}

export function getUserById(userId) {
	return new Promise((resolve, reject) => {

		// result is the QuerySnapshot object
		// QuerySnapshot object contains docs property, i.e. the documents match the query condition
		// We can access each document in docs by using array index, e.g. docs[1] for the second document
		db.collection('users').doc(userId).get().then((result) => {

			if (result)
			{
				let userData = {
					id: result.id,
					name: result.data().name,
					email: result.data().email,
					address: result.data().address,
					phone: result.data().phone
				}
				resolve(userData);
			}
			else
			{
				resolve(null);
			}
		})
		.catch((err) => reject(err));
	})
}
export function updateUser(userId, name, address, phone) {
	return new Promise((resolve, reject) => {
        if (!userId)
            reject('Invalid User Id');
        else{
            db.collection('users').doc(userId).update({ 
                name,
                address,
                phone
            }).then(() => {
                resolve('ok');
            })
            .catch((err) => reject(err));
        }
		
	})
}

export function addUser(email,password,name,address,phone) {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            let new_user = {
                email,
                name
            };
            if(address) 
                new_user.address = address;
            if(phone) 
                new_user.phone = phone
            db.collection('users').add(new_user).then(() =>{
                resolve(true);
            })
            .catch((err) => reject(err))
        })
    })
}
// input file is the file information we got from <input type="file" />
export function uploadFile(input_file){
    return new Promise((resolve, reject) =>{
        // parameter for the ref is the unique if for each file
        const task = storage.ref(input_file.name).put(input_file);
        task.on('state_changed',(snapshot)=>{
            // snapshot.bytesTransferred
            // snapshot.totalBytes
            // snapshot.state => generally 'running
            console.log(snapshot.bytesTransferred*100 / snapshot.totalBytes, '%');
        },(err)=>{
            reject(err);
        },() => {
            storage.ref(input_file.name).getDownloadURL().then((url) => {
                console.log(url);
                resolve(url);
            })
        })
    })
}

export function removeStorage(filename){
    return new Promise((resolve, reject) => {
        storage.ref(filename).delete()
        .then(() => resolve(true))
        .catch((err) => reject(err))
    })

}
// {key1, key2, key3} : destructuring object
export function addFile({userId, filename, size, type, url}){
    return new Promise((resolve, reject) => {
        db.collection('files').add({
            filename,
            size,
            type,
            url,
            user: db.collection('user').doc(userId)
        })
        .then(() => resolve(true))
        .catch((err) => reject(err))
    })
}

export function getFile({userId}){
    return new Promise((resolve, reject) => {
        console.log(userId)
        db.collection('files')
        .where('user', '==', db.collection('user').doc(userId))
        .get().then((result) => {
            let arr = [];
            for (let i = 0; i < result.docs.length; i++) {
                arr.push({
                    id: result.docs[i].id,
                    filename: result.docs[i].data().filename,
                    size: result.docs[i].data().size,
                    type: result.docs[i].data().type,
                    url: result.docs[i].data().url,
                })
            }
            resolve(arr)
        })
        .catch((err) => reject(err))
    })
}

export function deleteFile({id,userId}){
    return new Promise((resolve, reject) => {

        db.collection('files').doc(id).get().then((result) => {
            console.log(result);
            if (result.exists){
                
                const filename = result.data().filename;
                // if (result.data().user == db.collection('users').doc(userId)){
                {    removeStorage(filename)
                    .then(() => console.log('file deleted'))
                    .catch((err) => console.log(err))

                    db.collection('files').doc(id).delete().then(() => resolve(true))
                }
                // else{
                //     reject('Unauthorized process');
                // }
            }
            else{
                reject('File not found');
            }

        })
        .catch((err) => reject(err))
    })
}

export function getLocalStorage(key) {
    const val = window.localStorage.getItem(key);
    if (val){
        return JSON.parse(val);
    }
    return null;
}

export function setLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}