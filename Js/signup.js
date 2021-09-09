const form = document.querySelector(".signup form");
let ffname = document.getElementById("ffname");
let llname = document.getElementById("llname");
let email = document.getElementById("email");
let error = document.getElementById("error-text");
let password = document.getElementById("password");
let UserVerification = localStorage.getItem("$verfication");
let UserIdVerification = localStorage.getItem("User_Id");
let UserNameVerification = localStorage.getItem("User_Name");

// Security at startup script
if ((UserIdVerification == null) || (UserIdVerification == "")) {
  localStorage.clear();
}


if ((UserVerification == "$verified$") && (!(UserVerification == null))) {
  document.getElementById("loader").style.display = "block";
  document.getElementById("wrapper").style.display = "none";
  if (!((UserIdVerification == null) || (UserIdVerification == ""))) {

    const database_ref = firebase.database().ref(); //different because ref added means refernce
    // let valid = database_ref.child("Users_Data/" + UserIdVerification + "/Password");


    database_ref.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {
      let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
      var keys = Object.keys(snap_val);
      // for (let i = 0; i < keys.length; i++) {
      //   let element = keys[i];
      //   let initials = snap_val[element].Password;
      //   console.log(initials);
      //   let final = initials;
      // }
      if (keys.includes(UserIdVerification)) {
        const database = firebase.database();
        database.ref("Users_Data/" + UserIdVerification).on('value', function (snapshot) {
          let user_database = snapshot.val().User;
          localStorage.setItem("User_Name", user_database);

          // Instantiate an xhr object
          const xhr = new XMLHttpRequest();

          // Open the object
          xhr.open('GET', 'TextStorm.html', true);
          xhr.send();
          xhr.getResponseHeader('Content-type', 'application/html');


          // What to do on progress (optional)
          xhr.onprogress = function () {
            document.getElementById("loader").style.display = "block";
            document.getElementById("wrapper").style.display = "none";
            console.log('On progress');
          }

          // What to do when response is ready
          xhr.onload = function () {
            if (this.status === 200) {
              window.location.replace("TextStorm.html");
            } else {
              console.log("Some error occured")
            }
          }

          
        });
      } else {
        document.getElementById("loader").style.display = "none";
            document.getElementById("wrapper").style.display = "block";
        localStorage.removeItem("$verfication");
        localStorage.removeItem("User_Id");
        localStorage.removeItem("User_Name");
      }
    });
  } else {
    localStorage.removeItem("$verfication");
    localStorage.removeItem("User_Id");
    localStorage.removeItem("User_Name");
    location.reload();
  }
}


form.onsubmit = (e) => {
  e.preventDefault();

  document.getElementById("loader").style.display = "block";
  document.getElementById("wrapper").style.display = "none";
  let fname = ffname.value;
  let lname = llname.value;
  let email_val = email.value;
  if ((email_val.includes("@"))) {
    let password_val_user = password.value; //Taking value of password
    let password_val_process = CryptoJS.MD5(password_val_user); // Converting password to hash
    let password_val = password_val_process.toString(); //Final value

    //Checking password is same from others or not
    let database_ref = firebase.database().ref(); //different because ref added means refernce
    database_ref.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {
      let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
      var keys = Object.keys(snap_val);
      // Check if the user's password is same with other password
      if (keys.includes(password_val)) {
        document.getElementById("error-text").style.display = "block";
        error.innerHTML = "Try to give another password\n"
        document.getElementById("loader").style.display = "none";
        document.getElementById("wrapper").style.display = "block";
        setTimeout(() => {
          document.getElementById("error-text").style.display = "none";
        }, 5000);

      } else {
        var database = firebase.database();
        let data = {
          User: fname + " " + lname,
          Email: email_val,
          Password: password_val,
          Data: "Write your text here...",
          File_Data: "Untitled.txt"
        }
        var ref = database.ref("Users_Data/" + password_val);
        ref.set(data);
        console.log("Hello " + fname);
        localStorage.setItem("$verfication", "$verified$");
        localStorage.setItem("User_Id", password_val);
        localStorage.setItem("User_Name", fname + " " + lname);

        const database_ref_sec = firebase.database().ref(); //different because ref added means refernce
        database_ref_sec.child("Users_Data").orderByChild("Password").once("value", function (snapshot) {
          let snap_val = snapshot.val(); // on newer SDKs, this may be snapshot.key
          var keys = Object.keys(snap_val);
          if (keys.includes(password_val)) {
            setTimeout(() => {
              location.reload();
              window.location.replace("TextStorm.html");
            }, 2000);
          } else {
            localStorage.removeItem("$verfication");
            localStorage.removeItem("User_Id");
            localStorage.removeItem("User_Name");
          }
        });
      }
    });
  } else {
    document.getElementById("error-text").style.display = "block";
    error.innerHTML = "Please type a valid email address for your account"
    document.getElementById("loader").style.display = "none";
    document.getElementById("wrapper").style.display = "block";
    setTimeout(() => {
      document.getElementById("error-text").style.display = "none";
    }, 3000);
  }
}