console.log("Welcome to TextStorm");

// getting few global variables
let myDocument = document.documentElement;
let UserData = localStorage.getItem("User's Data");
let FileData = localStorage.getItem("File Name");
let edit_button = document.getElementById("editbutton");
let UserVerification = localStorage.getItem("$verfication");
let unlimited = document.getElementById("apnatext");
let btn = document.getElementById("btn");

// getting some css & html done with javascript           LOL
document.getElementById("apnatext").disabled = true;
edit_button.innerHTML = document.write = '<i class="far fa-pencil-square-o" id="icon"></i>';

// StartUp Logic Begins
if (FileData == null || FileData == "") {
	document.title = "Textstorm";
}
else {
	document.title = "Textstorm | " + FileData;
}

if (UserVerification == "$verified$") {
	unlimited.removeAttribute("onKeyDown");
	unlimited.removeAttribute("onKeyUp");
}

if (FileData == null || FileData == "") {
	document.getElementById("fileid").innerHTML = "Untitled.txt";
} else {
	document.getElementById("fileid").innerHTML = FileData;
}

if (UserData == "" || UserData == null) {
	document.getElementById("apnatext").value = "Write your text here";
} else {
	document.getElementById("apnatext").value = UserData;
}

// Save Button Function
function saveText() {
	let filecontent = document.getElementById("fileid").innerHTML;
	let content = document.getElementById("apnatext").value;

	localStorage.setItem("User's Data", content);
	localStorage.setItem("File Name", filecontent);
	document.title = "Textstorm | " + filecontent;
	let errordump = document.getElementById("message_id");
	errordump.style.display = "flex";
}

// Rename Button Function
function renameFile() {
	let extractname = prompt("Enter your file name: ", 'TextStorm_Untitled');
	if (extractname != null) {
		let storage = extractname + ".txt";
		document.getElementById("fileid").innerHTML = storage;
		document.title = "Textstorm | " + storage;
	}
}

btn.addEventListener("click", ()=>{
    if(btn.value == '<i class="fas fa-expand"></i>'){
        if (myDocument.requestFullscreen) {
            myDocument.requestFullscreen();
        } 
        else if (myDocument.msRequestFullscreen) {
            myDocument.msRequestFullscreen();
        } 
        else if (myDocument.mozRequestFullScreen) {
            myDocument.mozRequestFullScreen();
        }
        else if(myDocument.webkitRequestFullscreen) {
            myDocument.webkitRequestFullscreen();
        }
        btn.value = '<i class="fas fa-compress"></i>';
    }
    else{
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if(document.msexitFullscreen) {
            document.msexitFullscreen();
        }
        else if(document.mozexitFullscreen) {
            document.mozexitFullscreen();
        }
        else if(document.webkitexitFullscreen) {
            document.webkitexitFullscreen();
        }
        btn.value = '<i class="fas fa-expand"></i>';
    }
});


/*dark_mode editor*/
let dark_mode_btn = document.querySelector('.dark_mode_btn');
let dark_mode_status = false;
dark_mode_btn.addEventListener('click', function () {
	body_editor.classList.toggle('dark_mode_active');
	if (dark_mode_status == false) {
		dark_mode_btn.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
		dark_mode_status = true;
	} else {
		dark_mode_btn.innerHTML = '<i class="far fa-moon-o" aria-hidden="true"></i>';
		dark_mode_status = false;
	}
});

/*dark_mode home*/
let dark_mode_btn_home = document.querySelector('.dark_mode_btn_home');
let body = document.querySelector('body');
let dark_mode_status_home = false;
dark_mode_btn_home.addEventListener('click', function () {
	body.classList.toggle('dark_mode_active_home');
	if (dark_mode_status_home == false) {
		dark_mode_btn_home.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i> Light Theme';
		dark_mode_status_home = true;
	} else {
		dark_mode_btn_home.innerHTML = '<i class="far fa-moon-o" aria-hidden="true"></i> Dark Theme';
		dark_mode_status_home = false;
	}
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB9-zUZOXPgGduXPQPhllSWeihCP1yCt98",
    authDomain: "textstorm-88b75.firebaseapp.com",
    projectId: "textstorm-88b75",
    storageBucket: "textstorm-88b75.appspot.com",
    messagingSenderId: "355783594449",
    appId: "1:355783594449:web:df56c1b95263170532d0f0",
    measurementId: "G-C86NFR0T5S"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
