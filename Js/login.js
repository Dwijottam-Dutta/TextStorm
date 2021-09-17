const form = document.querySelector(".signup form");
let email = document.getElementById("email");
let password = document.getElementById("password");
let error = document.getElementById("error-text");
// let UserVerification = localStorage.getItem("$verfication");
// let UserIdVerification = localStorage.getItem("User_Id");
// let UserNameVerification = localStorage.getItem("User_Name");

// Security at startup script
document.getElementById("loader").style.display = "block";
document.getElementById("wrapper").style.display = "none";

function StartUp() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
                location.replace("TextStorm.html");
        } else {
            document.getElementById("loader").style.display = "none";
            document.getElementById("wrapper").style.display = "block";
        }
    })
}
StartUp();


// if ((UserIdVerification == null) || (UserIdVerification == "")) {
//     localStorage.clear();
// }


// if ((UserVerification == "$verified$") && (!(UserVerification == null))) {
//     if (!((UserIdVerification == null) || (UserIdVerification == ""))) {

//         const database_ref = firebase.database().ref();  //different because ref added means refernce
//         // let valid = database_ref.child("Users_Data/" + UserIdVerification + "/Password");


//         database_ref.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {
//             let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
//             var keys = Object.keys(snap_val);
//             console.log(keys)
//             // for (let i = 0; i < keys.length; i++) {
//             //   let element = keys[i];
//             //   let initials = snap_val[element].Password;
//             //   console.log(initials);
//             //   let final = initials;
//             // }
//             if (keys.includes(UserIdVerification)) {
//                 const database = firebase.database();
//                 database.ref("Users_Data/" + UserIdVerification).on('value', function (snapshot) {
//                     let user_database = snapshot.val().User;
//                     localStorage.setItem("User_Name", user_database);
//                     window.location.replace("TextStorm.html");
//                 });
//             }
//             else {
//                 localStorage.clear();
//             }
//         });
//     }
//     else {
//         localStorage.clear();
//         location.reload();
//     }
// }

form.onsubmit = (e) => {
    e.preventDefault();
    document.getElementById("loader").style.display = "block";
    document.getElementById("wrapper").style.display = "none";
    let email_val = email.value;
    let password_val = password.value; //Taking value of password

        firebase.auth().signInWithEmailAndPassword(email_val, password_val)
            .catch((error) => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("wrapper").style.display = "block";
                document.getElementById("error").innerHTML = error.message;
                document.getElementById("error").style.display = "block";
            })

    // let password_val_process = CryptoJS.MD5(password_val_user);        // Converting password to hash
    // let password_val = password_val_process.toString();        //Final value

    // let database_ref = firebase.database().ref();  //different because ref added means refernce
    // // let valid = database_ref.child("Users_Data/" + UserIdVerification + "/Password");


    // database_ref.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {

    //     let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
    //     var keys = Object.keys(snap_val);
    //     if (keys.includes(password_val)) {
    //         const database = firebase.database();
    //         database.ref("Users_Data/" + password_val).on('value', function (snapshot) {
    //             let database_em = snapshot.val().Email;
    //             if (database_em == email_val) {
    //                 const database = firebase.database();
    //                 database.ref("Users_Data/" + password_val).on('value', function (snapshot) {
    //                     let user_database = snapshot.val().User;
    //                     let user_data = snapshot.val().Data;
    //                     let user_filedata = snapshot.val().File_Data;
    //                     localStorage.setItem("User_Name", user_database);
    //                     localStorage.setItem("$verfication", "$verified$");
    //                     localStorage.setItem("User_Id", password_val);
    //                     localStorage.setItem("User's Data", user_data);
    //                     localStorage.setItem("File Name", user_filedata);
    //                     setTimeout(() => {
    //                         window.location.replace("TextStorm.html");
    //                     }, 4000);
    //                 });
    //             }
    //             else {
    //                 alert("Please type your email address correctly...");
    //                 document.getElementById("loader").style.display = "none";
    //                 document.getElementById("wrapper").style.display = "block";
    //                 email_val.innerHTML = "";
    //                 password_val_user.innerHTML = "";
    //             }
    //         });


    //     }
    //     else {
    //         alert("Your password is incorrect...\nPlease create your account if you are not a registered user...");
    //         document.getElementById("loader").style.display = "none";
    //         document.getElementById("wrapper").style.display = "block";
    //         email_val = "";
    //         password_val_user = "";
    //         document.getElementById("email").value = "";
    //         document.getElementById("password").value = "";
    //     }

    // });
}