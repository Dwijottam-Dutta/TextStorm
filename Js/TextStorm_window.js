/***************************File*Header********************************** 

* File Name: TextStorm_window.js
*
* JS Description: This JS File contains TextStorm Editor Window
*                 Functions/Logic which are used in editor...

****************************************************************************/


/*Making all window draggable*/
dragElement(document.getElementById("editor"), document.getElementById("titlebar"), true);
dragElement(document.getElementById("error_id"), document.getElementById("title_error"), true);
dragElement(document.getElementById("message_id"), document.getElementById("title_message"), true);
dragElement(document.getElementById("message_id_three"), document.getElementById("title_message_three"), true);
dragElement(document.getElementById("in_error_id"), document.getElementById("title_in_error"), true);
dragElement(document.getElementById("account_id"), document.getElementById("title_account"), true);


let editor = document.getElementById("editor");
let save_window = document.getElementById("message_id");
let error_window = document.getElementById("error_id");
let account_window = document.getElementById("account_id");


// Layers of Windows
editor.addEventListener("click", () => {
	editor.style.zIndex = "2"
	save_window.style.zIndex = "1"
	error_window.style.zIndex = "1"
	account_window.style.zIndex = "1"
});
save_window.addEventListener("click", () => {
	save_window.style.zIndex = "2"
	editor.style.zIndex = "1"
	error_window.style.zIndex = "1"
	account_window.style.zIndex = "1"
});
error_window.addEventListener("click", () => {
	error_window.style.zIndex = "2"
	save_window.style.zIndex = "1"
	editor.style.zIndex = "1"
	account_window.style.zIndex = "1"
});
account_window.addEventListener("click", () => {
	account_window.style.zIndex = "2"
	save_window.style.zIndex = "1"
	editor.style.zIndex = "1"
	error_window.style.zIndex = "1"
});

// LEGACY LOL
// function limitText(limitField, limitNum) {
// 	if (limitField.value.length > limitNum) {
// 		limitField.value = limitField.value.substring(0, limitNum);
// 		let errordump = document.getElementById("error_id");
// 		errordump.style.display = "flex";
// 	}
// }






/**************Section*Header****************** 

* Section Name: EDITOR WINDOW
*
* Description: 
* This Section contains functions related to 
* Editor Window

***********************************************/

// Restore Down/Maximize Function
let MAXIMIZE_STATUS = false;
let current_height_of_window;
let current_width_of_window;
let current_top_of_window;
let current_left_of_window;

function winMaximize_Resize() {
	let editor = document.getElementById("editor");
	if (MAXIMIZE_STATUS == false) {

		// Storing last Height, Width, Top, Left
		current_height_of_window = editor.style.height;
		current_width_of_window = editor.style.width;
		current_top_of_window = editor.style.top;
		current_left_of_window = editor.style.left;

		// Maximize the Window
		editor.style.width = '100%';
		editor.style.height = '100%';
		editor.style.left = '0px';
		editor.style.top = '0px';
		editor.style.resize = 'none';

		document.getElementById("popup_change").style.width = '140px';
		document.getElementById("popup_change").innerHTML = "Restore Down"
		MAXIMIZE_STATUS = true;
	} else {
		// Restore Down the Window
		editor.style.width = current_width_of_window;
		editor.style.height = current_height_of_window;
		editor.style.left = current_left_of_window;
		editor.style.top = current_top_of_window;
		editor.style.resize = 'both';
		document.getElementById("popup_change").style.width = '100px';
		document.getElementById("popup_change").innerHTML = "Maximize"
		MAXIMIZE_STATUS = false;
	}
}

// Minimize Function Window Utils
let minimize_status = false;

function winMinimize() {
	document.getElementById("editor").style.display = "none";
	// LEGACY
	// const minimize_but = document.getElementById("body_editor");
	// let editorarea = document.getElementById("editor");
	// let titlebar_row = document.getElementById("titlebar");
	// minimize_but.style.display = "none";
	// if (minimize_status == true) {
	// 	minimize_but.style.display = "flex";
	// 	titlebar_row.style.display = "flex";
	// 	// editorarea.style.height = "337px";
	// 	minimize_status = false;
	// 	editorarea.style.minHeight = '220px';
	// 	editorarea.style.maxHeight = 'none';
	// 	// editorarea.onresize = 
	// } else {
	// 	minimize_status = true;
	// 	minimize_but.style.display = "none";
	// 	// editorarea.style.height = "40px";
	// 	editorarea.style.maxHeight = "40px";
	// 	editorarea.style.minHeight = "40px";

	// 	titlebar_row.style.display = "flex";
	// }
}

// Rename File Function
function renameFile() {
	let file_name_prompt = prompt("Enter your file name: ", document.getElementById("fileid").innerHTML);
	if (file_name_prompt != null) {
		if (file_name_prompt.includes(".")) {
			let file_name = file_name_prompt;
			document.getElementById("fileid").innerHTML = file_name;
			document.title = "Textstorm | " + file_name;
			is_it_code_file();
		} else {
			let file_name = file_name_prompt + ".txt";
			document.getElementById("fileid").innerHTML = file_name;
			document.title = "Textstorm | " + file_name;
		}
	}
}


// Open Function Window Utils
function openwindow() {
	document.getElementById("editor").style.display = "flex";
};

// Editing/Viewing Function Window Utils
let EDIT_MODE = false;
let text_edit = document.getElementById("apnatext");
text_edit.disabled = true;

function editableOption() {
	let text_edit = document.getElementById("apnatext");
	let edit_button = document.getElementById("editbutton");
	if (EDIT_MODE == false) {
		edit_button.innerHTML = document.write = '<i class="far fa-file-alt"></i>';
		text_edit.disabled = false;
		EDIT_MODE = true;
	} else if (EDIT_MODE == true) {
		edit_button.innerHTML = document.write = '<i class="far fa-edit"></i>';
		text_edit.disabled = true;
		EDIT_MODE = false;
	}
}







/******************Section*Header**********************

* Section Name: SHORTCUTS FOR ALL WINDOW @EDITOR_WINDOW
*
* Description: 
* This Section contains functions related to 
* Shortcuts

*******************************************************/

// 1
// CTRL + '+' Event
window.addEventListener('keydown', e => {
	if (e.altKey && e.keyCode === 187) { //plus
		e.preventDefault();
		let increase_apnatext = document.getElementById('apnatext');
		let style = window.getComputedStyle(increase_apnatext, null).getPropertyValue('font-size');
		let currentSize = parseFloat(style);
		increase_apnatext.style.fontSize = (currentSize + 3) + 'px';

		document.getElementById("FontSizeSeekBar").value = currentSize; // Update FontSize SeekBar
	}
	if (e.altKey && e.keyCode === 189) { //minus
		e.preventDefault();
		let decrease_apnatext = document.getElementById('apnatext');
		let style = window.getComputedStyle(decrease_apnatext, null).getPropertyValue('font-size');
		let currentSize = parseFloat(style);
		decrease_apnatext.style.fontSize = (currentSize - 3) + 'px';

		document.getElementById("FontSizeSeekBar").value = currentSize; // Update FontSize SeekBar

	}
});

// 2
// Double Clicking TitleBar event listener 
document.getElementById("titlebar").ondblclick = function () {
	let editor = document.getElementById("editor");
	if (MAXIMIZE_STATUS == false) {

		// Storing last Height, Width, Top, Left
		current_height_of_window = editor.style.height;
		current_width_of_window = editor.style.width;
		current_top_of_window = editor.style.top;
		current_left_of_window = editor.style.left;

		// Maximize the Window
		editor.style.width = '100%';
		editor.style.height = '100%';
		editor.style.left = '0px';
		editor.style.top = '0px';
		editor.style.resize = 'none';

		document.getElementById("popup_change").style.width = '140px';
		document.getElementById("popup_change").innerHTML = "Restore Down"
		MAXIMIZE_STATUS = true;
	} else {
		// Restore Down the Window
		editor.style.width = current_width_of_window;
		editor.style.height = current_height_of_window;
		editor.style.left = current_left_of_window;
		editor.style.top = current_top_of_window;
		editor.style.resize = 'both';
		document.getElementById("popup_change").style.width = '100px';
		document.getElementById("popup_change").innerHTML = "Maximize"
		MAXIMIZE_STATUS = false;
	}
};







/**************Section*Header****************** 

* Section Name: TOOL BAR @EDITOR_WINDOW 
*
* Description: 
* This Section contains functions related to 
* Editor Window

***********************************************/

// Tool Mode
let TOOL_MODE = false;

function openTools() {
	if (TOOL_MODE == false) {
		document.getElementById("toolbar").style.display = "flex";
		document.getElementById("apnatext").style.paddingTop = "2.6rem";
		TOOL_MODE = true;
	} else if (TOOL_MODE == true) {
		document.getElementById("toolbar").style.display = "none";
		document.getElementById("apnatext").style.paddingTop = "1rem";
		TOOL_MODE = false;
	}
};

let font_list_on = false;
let font_arrow_chevron = document.getElementById("font_arrow_chevron");
let fonts_list = document.getElementById("fonts_list");

function Font_List() {
	if (font_list_on) {
		fonts_list.style.display = "none"
		font_list_on = false;
	} else {
		fonts_list.style.display = "block"
		font_list_on = true;
	}
}

//FONT SIZE SEEK BAR
let FontSizeSeekBar = document.getElementById("FontSizeSeekBar");

FontSizeSeekBar.addEventListener('change', () => {
	document.getElementById('apnatext').style.fontSize = (FontSizeSeekBar.value) + 'px';
});







/**************Section*Header****************** 

* Section Name: OTHER WINDOW 
*
* Description: 
* This Section contains functions related to 
* Other Windows

***********************************************/

function messageClose() {
	document.getElementById("message_id").style.display = "none";
};

function newFileClose() {
	document.getElementById("message_id_three").style.display = "none";
};

// CLose Function Error Window Utils
function errorClose() {
	let errordump = document.getElementById("error_id");
	errordump.style.display = "none";
};

// Open TextStorm About Window
function open_TextStorm_About() {
	document.getElementById("textstorm_about_wrapper").style.display = "flex";
};

// Close TextStorm Function About Window
function TextStorm_aboutClose() {
	document.getElementById("textstorm_about_wrapper").style.display = "none";
};

//MAIL TO
function mailto() {
	window.open('https://mail.google.com/mail/u/0/?fs=1&to=dwijottamdutta@gmail.com&tf=cm');
};

function developer(){
	window.open('https://dwijottam-dutta.github.io/portfolio/about.html');
}

// Close Function In_Error Window Utils
function in_errorClose() {
	localStorage.setItem("$bypass_id", "not_crack");
	document.getElementById("in_error_id").style.display = "none";
};

function in_errorBypass() {
	localStorage.setItem("$bypass_id", "crack");
	document.getElementById("in_error_id").style.display = "none";
	document.getElementById("editor").style.display = "flex";
	document.getElementById("navbar").style.display = "flex";
};


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
};


function third_party() {
	alert(`1. FILESAVER.JS
-----------------------------
The MIT License

Copyright © 2016 Eli Grey.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files(the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and / or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-----------------------------`)
};









/**************Section*Header****************** 

* Section Name: ACCOUNT WINDOW
*
* Description: 
* This Section contains functions related to 
* Account/Profile Window

***********************************************/

//Logout Function
function logOutAccount() {
	firebase.auth().signOut();
	TEXTSTORM_RESTART();
};

//Delete Account Function
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

	TEXTSTORM_RESTART();
}

// Forget Password Function
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
	document.getElementById("account_id").style.zIndex = "3";
	document.getElementById("account_id").style.display = "flex";
}

// Close Account Window
function closeAccount() {
	document.getElementById("account_id").style.display = "none";
}




/**************Section*Header****************** 

* Section Name: DARK MODE @EDITOR_WINDOW
*
* Description: 
* This Section contains functions related to 
* Editor Window

***********************************************/
dark_mode_btn.addEventListener("click", function () {
	document.getElementById("editor").classList.toggle("dark_mode_active");
	if (dark_mode_status == false) {
		dark_mode_btn.innerHTML = '<i class="far fa-sun"></i>';
		dark_mode_status = true;
		localStorage.setItem("TextStorm_Editor_Mode", "$dark");
	} else {
		dark_mode_btn.innerHTML =
			'<i class="far fa-moon"></i>';
		dark_mode_status = false;
		localStorage.setItem("TextStorm_Editor_Mode", "$light");
	}
});