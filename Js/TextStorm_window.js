/*Making all window draggable*/
dragElement(document.getElementById("editor"), document.getElementById("titlebar"), true);
dragElement(document.getElementById("error_id"), document.getElementById("title_error"), true);
dragElement(document.getElementById("message_id"), document.getElementById("title_message"), true);
dragElement(document.getElementById("message_id_three"), document.getElementById("title_message_three"), true);
dragElement(document.getElementById("in_error_id"), document.getElementById("title_in_error"), true);
dragElement(document.getElementById("about_id"), document.getElementById("title_about"), true);
dragElement(document.getElementById("account_id"), document.getElementById("title_account"), true);


let editor = document.getElementById("editor");
let save_window = document.getElementById("message_id");
let error_window = document.getElementById("error_id");
let about_window = document.getElementById("about_id");
let about_textstorm_window = document.getElementById("textstorm_about_wrapper");
let account_window = document.getElementById("account_id");


// Layers of Windows
editor.addEventListener("click", () => {
	editor.style.zIndex = "2"
	save_window.style.zIndex = "1"
	error_window.style.zIndex = "1"
	about_window.style.zIndex = "1"
	account_window.style.zIndex = "1"
})
save_window.addEventListener("click", () => {
	save_window.style.zIndex = "2"
	editor.style.zIndex = "1"
	error_window.style.zIndex = "1"
	about_window.style.zIndex = "1"
	account_window.style.zIndex = "1"
})
error_window.addEventListener("click", () => {
	error_window.style.zIndex = "2"
	save_window.style.zIndex = "1"
	editor.style.zIndex = "1"
	about_window.style.zIndex = "1"
	account_window.style.zIndex = "1"
})
account_window.addEventListener("click", () => {
	account_window.style.zIndex = "2"
	save_window.style.zIndex = "1"
	editor.style.zIndex = "1"
	about_window.style.zIndex = "1"
	error_window.style.zIndex = "1"
})
about_window.addEventListener("click", () => {
	about_window.style.zIndex = "2"
	save_window.style.zIndex = "1"
	error_window.style.zIndex = "1"
	editor.style.zIndex = "1"
	account_window.style.zIndex = "1"
})

// LEGACY LOL
// function limitText(limitField, limitNum) {
// 	if (limitField.value.length > limitNum) {
// 		limitField.value = limitField.value.substring(0, limitNum);
// 		let errordump = document.getElementById("error_id");
// 		errordump.style.display = "flex";
// 	}
// }

function messageClose() {
	let messagedump = document.getElementById("message_id");
	messagedump.style.display = "none";
}

function newFileClose() {
	document.getElementById("message_id_three").style.display = "none";
}

function newFile_after_Download() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			downloadText();
			let user_details_updating = {
				Data: "Write your text here...",
				File_Data: "Untitled_New.txt",
			};
			firebase
				.database()
				.ref("Users_Data/" + user.uid)
				.update(user_details_updating)
				.catch((error) => {
					alert(error);
				});
		}
	});
	newFileClose();
}

function newFile_no_Download() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			let user_details_updating = {
				Data: "Write your text here...",
				File_Data: "Untitled_New.txt",
			};
			firebase
				.database()
				.ref("Users_Data/" + user.uid)
				.update(user_details_updating)
				.catch((error) => {
					alert(error);
				});
		}
	});
	newFileClose();
}

// Restore Down/Maximize Function Window Utils
let maximize_status = false;

function winResize() {
	let macos = document.getElementById("editor");
	if (maximize_status == true) {

		// Restore Down the Window
		macos.style.width = '547px';
		macos.style.height = '337px';
		macos.style.left = '200px';
		macos.style.top = '170px';
		macos.style.resize = 'both';
		document.getElementById("popup_change").style.width = '100px';
		document.getElementById("popup_change").innerHTML = "Maximize"
		dragElement(document.getElementById("editor"), document.getElementById("titlebar"), true); //Enabling Drag
		maximize_status = false;
	} else {
		// Maximize the Window
		macos.style.width = '100%';
		macos.style.height = '100%';
		macos.style.left = '0px';
		macos.style.top = '30px';
		macos.style.resize = 'none';
		document.getElementById("popup_change").style.width = '140px';
		document.getElementById("popup_change").innerHTML = "Restore Down"
		dragElement(document.getElementById("editor"), document.getElementById("titlebar"), false); //Disabling Drag
		maximize_status = true;
	}
}
// Double Clicking TitleBar event listener 
document.getElementById("titlebar").ondblclick = function () {
	if (maximize_status == true) {

		// Restore Down the window while double clicking on a maximized window
		let macos = document.getElementById("editor");
		macos.style.width = '547px';
		macos.style.height = '337px';
		macos.style.left = '200px';
		macos.style.top = '170px';
		macos.style.resize = 'both';
		document.getElementById("popup_change").style.width = '100px';
		document.getElementById("popup_change").innerHTML = "Maximize"
		maximize_status = false;

	} else if (maximize_status == false) {
		// Maximize Down the window while double clicking on a maximized window
		let macos = document.getElementById("editor");
		macos.style.width = '100%';
		macos.style.height = '100%';
		macos.style.left = '0px';
		macos.style.top = '30px';
		macos.style.resize = 'none';
		document.getElementById("popup_change").style.width = '140px';
		document.getElementById("popup_change").innerHTML = "Restore Down"
		maximize_status = true;
	}
};


// Minimize Function Window Utils
let minimize_status = false;

function winMinimize() {
	// let minimize_status = false;
	const minimize_but = document.getElementById("body_editor");
	let editorarea = document.getElementById("editor");
	let titlebar_row = document.getElementById("titlebar");
	minimize_but.style.display = "none";
	if (minimize_status == true) {
		minimize_but.style.display = "flex";
		titlebar_row.style.display = "flex";
		// editorarea.style.height = "337px";
		minimize_status = false;
		editorarea.style.minHeight = '220px';
		editorarea.style.maxHeight = 'none';
		// editorarea.onresize = 
	} else {
		minimize_status = true;
		minimize_but.style.display = "none";
		// editorarea.style.height = "40px";
		editorarea.style.maxHeight = "40px";
		editorarea.style.minHeight = "40px";

		titlebar_row.style.display = "flex";
	}
}



// Editing/Viewing Function Window Utils
let edit_mode = false;
let text_edit = document.getElementById("apnatext");
text_edit.disabled = true;

function editableOption() {
	let text_edit = document.getElementById("apnatext");
	let edit_button = document.getElementById("editbutton");
	if (edit_mode == false) {
		edit_button.innerHTML = document.write = '<i class="far fa-file-alt"></i>';
		text_edit.disabled = false;
		edit_mode = true;
	} else if (edit_mode == true) {
		edit_button.innerHTML = document.write = '<i class="far fa-edit"></i>';
		text_edit.disabled = true;
		edit_mode = false;
	}
}


// CRTL + '+' Event
window.addEventListener('keydown', e => {
	if (e.altKey && e.keyCode === 187) { //plus
		e.preventDefault();
		let increase_apnatext = document.getElementById('apnatext');
		let style = window.getComputedStyle(increase_apnatext, null).getPropertyValue('font-size');
		let currentSize = parseFloat(style);
		increase_apnatext.style.fontSize = (currentSize + 5) + 'px';
	}
	if (e.altKey && e.keyCode === 189) { //minus
		e.preventDefault();
		let decrease_apnatext = document.getElementById('apnatext');
		let style = window.getComputedStyle(decrease_apnatext, null).getPropertyValue('font-size');
		let currentSize = parseFloat(style);
		decrease_apnatext.style.fontSize = (currentSize - 5) + 'px';
	}
});



// Rename Button Function
function renameFile() {
	let extractname = prompt("Enter your file name: ", document.getElementById("fileid").innerHTML);
	if (extractname != null) {
		let storage = extractname + ".txt";
		document.getElementById("fileid").innerHTML = storage;
		document.title = "Textstorm | " + storage;
	}
}

// Close Function Window Utils
function winClose() {
	document.getElementById("editor").style.display = "none";
}

// Open Function Window Utils
function openwindow() {
	document.getElementById("editor").style.display = "flex";
}

// CLose Function Error Window Utils
function errorClose() {
	let errordump = document.getElementById("error_id");
	errordump.style.display = "none";
}

// Open About Window
function open_About() {
	document.getElementById("about_id").style.display = "flex";
}
// Close Function About Window
function aboutClose() {
	document.getElementById("about_id").style.display = "none";
}
// Open TextStorm About Window
function open_TextStorm_About() {
	document.getElementById("textstorm_about_wrapper").style.display = "flex";
}
// Close TextStorm Function About Window
function TextStorm_aboutClose() {
	document.getElementById("textstorm_about_wrapper").style.display = "none";
}

//MAIL TO
function mailto() {
	window.open('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new');
}

// CLose Function In_Error Window Utils
function in_errorClose() {
	localStorage.setItem("$bypass_id", "not_crack");
	document.getElementById("in_error_id").style.display = "none";
	document.getElementById("editor").style.display = "flex";
	document.getElementById("navbar").style.display = "flex";
}

function in_errorBypass() {
	localStorage.setItem("$bypass_id", "crack");
	document.getElementById("in_error_id").style.display = "none";
	document.getElementById("editor").style.display = "flex";
	document.getElementById("navbar").style.display = "flex";
}


//Recommendation
let recommended_open = false;

function recommended() {
	if (recommended_open == false) {
		document.getElementById("recommended_change").innerHTML = "We highly recommend you to use Chrome, Edge, Brave or any Chromium-based Browsers, for running TextStorm with all features and enjoyment..."
		document.getElementById("recommendation").innerHTML = "Error Message";
		recommended_open = true;
	} else if (recommended_open == true) {
		document.getElementById("recommended_change").innerHTML = `Some Function may not work, because your browser, doesn't support <u><a href="https://developer.mozilla.org/en-US/docs/web/api/window/showopenfilepicker#browser_compatibility">File System API</a></u> which is used in TextStorm`;
		document.getElementById("recommendation").innerHTML = "Recommendation";
		recommended_open = false;
	}
}




// ACCOUNT WINDOW ACCESSORIES AND FUNCTIONS 

function logOutAccount() {
	firebase.auth().signOut();
	location.reload();
	closeAccount()
}

function deleteAccount() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			let user_details = {
				ACCOUNT_STATUS: "DELETED"
			}

			firebase.database().ref('Users_Data/' + user.uid).update(user_details).catch(error => {
				console.log(error);
			});



		} else {
			console.warn("Something went wrong !")
		}
	});
	const user = firebase.auth().currentUser;

	user.delete().then(() => {
		console.log("DONE DELETE");
	}).catch((error) => {
		console.log(error);
	});
}

function forgetPassword() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {

			firebase.auth().sendPasswordResetEmail(user.email)
				.then(() => {
					alert("Reset link sent to your email, you have to again sign in with your new password after you change the password");
					logOutAccount();
					location.reload();
				})
				.catch((error) => {
					document.getElementById("error").innerHTML = error.message
				});
		}
	});
}

// Open Account Window
function openAccount() {
	document.getElementById("account_id").style.display = "flex";
}

// Close Account Window
function closeAccount() {
	document.getElementById("account_id").style.display = "none";
}

let dark_mode_btn = document.querySelector(".dark_mode_btn");
let dark_mode_status = false;
dark_mode_btn.addEventListener("click", function () {
	body_editor.classList.toggle("dark_mode_active");
	if (dark_mode_status == false) {
		dark_mode_btn.innerHTML = '<i class="far fa-sun"></i>';
		dark_mode_status = true;
	} else {
		dark_mode_btn.innerHTML =
			'<i class="far fa-moon"></i>';
		dark_mode_status = false;
	}
});