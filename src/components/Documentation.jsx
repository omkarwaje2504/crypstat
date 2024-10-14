// this a code for sign up using email and password fields with firebase authentication
//register.jsx

import{createUserWithEmailAndPassword} from 'firebase/auth';
// create a state to store value from email and password
const [values, setValues] = useState({
    name: "",
    email: "",
    pass: ""
})

// create a state to store error messsage
const [errorMsg, setErrorMsg] = useState("");
// to stop create duplicating users disable the button till the firebase load .........for that add disabled:submitButtonDisabled in button tag
const [submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
var navigate=useNavigate();
// submit button function on click
const handleSubmit = (e) => {
    //prevent from page loading
    e.preventDefault();
    // checking the fields for empty values
    if (!values.name || !values.email || !values.pass) {
        setErrorMsg("Please fill all fields");
        return;
    }
    setErrorMsg("");
// initialize the disabled button function
    setSubmitButtonDisabled(true);
    // authentication with firebase to sign up user
    createUserWithEmailAndPassword(auth, values.email, values.pass)
    .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // add username to user...................... for that import import {updateProfile } from "firebase/auth";
        await updateProfile(user,{displayName:values.name});
        // redirect to login page ..............import {useNavigate} from "react-router-dom";
        useNavigate("/Login");

        // ...
      })
        .catch((error) => {
            const errorCode = error.code;
            // if there is a error then remove the disabled from button
            setsubmitButtonDisabled(false);
            const errorMessage = error.message;
        });

}



//for checking the user is authenticated create state in app.js as it is parent for all
// app.js

const [userAuthenticated,setUserAuthenticated]=useState("");

useEffect(()=>{
  auth.onAuthStateChanged((user)=>{
    if(user){
      setUserAuthenticated(user.displayName);
    }
    else{
      setUserAuthenticated("");
    }
  })
})

// to send the username to show send it as <Home name="userAuthenticated"/> and print as props.name where to show the username


// for login the user just have changes in login page
//  signInWithEmailAndPassword(auth, values.email, values.pass)  .............. replace the createUser function
//remove the values.name from if state that is used to print the error messsage of empty field
//remove the thing related to name only kept the require thing s such as email and password 
// rest is all same 