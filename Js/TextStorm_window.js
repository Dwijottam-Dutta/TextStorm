/***************************File*Header********************************** 

* File Name: TextStorm_window.js
*
* JS Description: This JS File contains TextStorm Editor Window
*                 Functions/Logic which are used in editor...
*
* IMPORTANT: This file gets loaded after successful boot of TextStorm
*            due to console security reasons

****************************************************************************/

dragElement(document.getElementById("editor"), document.getElementById("titlebar"));
dragElement(document.getElementById("error_id"), document.getElementById("title_error"));
dragElement(document.getElementById("message_id"), document.getElementById("title_message"));
dragElement(document.getElementById("message_id_three"), document.getElementById("title_message_three"));
dragElement(document.getElementById("in_error_id"), document.getElementById("title_in_error"));
dragElement(document.getElementById("account_id"), document.getElementById("title_account"));


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


/**************Section*Header****************** 

* Section Name: GLOBAL WINDOW FUNCTION
*
* Description: 
* This Section contains functions which are 
* needed by all windows

***********************************************/

// Window Close Function
function CLOSE_WINDOW(id) {
    document.getElementById(id).style.display = "none";
}

// Window Open Function
function OPEN_WINDOW(id) {
    document.getElementById(id).style.zIndex = "3"
    document.getElementById(id).style.display = "flex";
}






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
		document.getElementById("popup_change").innerHTML = "Restore Down";
		document.onmouseup = null;
		document.onmousemove = null;
		MAXIMIZE_STATUS = true;
	} else {
		// Restore Down the Window
		editor.style.width = current_width_of_window;
		editor.style.height = current_height_of_window;
		editor.style.left = current_left_of_window;
		editor.style.top = current_top_of_window;
		editor.style.resize = 'both';
		document.getElementById("popup_change").style.width = '100px';
		document.getElementById("popup_change").innerHTML = "Maximize";
		MAXIMIZE_STATUS = false;
	}
}

// Minimize Function Window Utils
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
	fullscreen_mode_btn.innerHTML = '<i class="fas fa-expand"></i>';
        full_screen_mode = false;
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
	winMaximize_Resize();
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
		document.getElementById("apnatext").style.paddingTop = "0.8rem";
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

//MAIL TO
function mailto() {
	window.open('https://dwijottam-dutta.github.io/portfolio#contact');
};

function developer() {
	window.open('https://dwijottam-dutta.github.io');
}

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


function whats_new_bro() {

	// ADDED THESE LINES SO THAT THIS UPDATES THE ICON AND STATUS OF FULL SCREEN
	fullscreen_mode_btn.innerHTML = '<i class="fas fa-expand"></i>';
	full_screen_mode = false;


	alert(`##+## What's New in V.2.5 ##+##
17th November 2023
-----------------------------
> Fixed Full Screen mode issue while toggle
> Fixed Database structure, so you see slight smoothness while running TextStorm
> Password Reset made easy for begginers
-----------------------------

##+## Things we are working right now ##+##
-----------------------------
> Our application is still on Firebase 8 [deprecated], which was last updated on August 19, 2021 by Google. The major problem we are currently facing on, is upgrading to Firebase 10, as we have to rewrite our code base, again from scratch.. So the next update may take times for us.

STAY TUNED !!
`)
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
	location.reload();
};

// Forget Password Function
function forgetPassword() {
	firebase.auth().onIdTokenChanged((user) => {
		if (user) {
			firebase.auth().sendPasswordResetEmail(user.email)
				.then(() => {
					TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm Account", "Reset link sent to your email, you have to again sign in with your new password after you change the password...", 10000, "success");
					location.reload();
				})
				.catch((error) => {
					TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm Account", error, 10000, "error");
				});
		}
	});
}

// Limiting Name for User Account while editing
function limitINNERText(id, limitNum) {
	if (id.innerHTML.length > limitNum) {
		id.innerHTML = "";
	}
}

let editAccount_mode = false;
function editAccount() {
	if (editAccount_mode == false) {
		document.getElementById("user_name_account").contentEditable = true;
		document.getElementById("user_name_account").style.borderBottom = "2px #333 solid";
		document.getElementById("account_edit_parent").innerHTML = `<i class="fas fa-check"></i>`;
		editAccount_mode = true;
	}
	else {
		if (window.navigator.onLine) {
			firebase.auth().onIdTokenChanged((user) => {
				if (user) {
					let currentName = document.getElementById("user_name_account").innerHTML;
					let user_name_details = {
						User: currentName
					};
					firebase
						.database()
						.ref("Users_Data/" + user.uid)
						.update(user_name_details)
						.catch((error) => {
							TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm Account", error, 10000, "error");
						});

					TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm Account", `Your Account name has been changed to ${currentName}`, 10000, "success");
				}
			});
			document.getElementById("user_name_account").contentEditable = false;
			document.getElementById("user_name_account").style.borderBottom = "0px #333 solid";
			document.getElementById("account_edit_parent").innerHTML = `<i class="fas fa-user-edit"></i>`;
			editAccount_mode = false;
		} else {
			TEXTSTORM_NOTIFICATION_SHOW(null, "TextStorm Account", "Please have a stable connection for editing your account...", 10000, "error");
		}

	}
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
		document.getElementById("body_editor").style.background = `rgba(38, 38, 38, 1)`;
		dark_mode_status = true;
		localStorage.setItem("TextStorm_Editor_Mode", "$dark");
	} else {
		dark_mode_btn.innerHTML = '<i class="far fa-moon"></i>';
		document.getElementById("body_editor").style.background = `rgba(248, 248, 248, 1)`;
		dark_mode_status = false;
		localStorage.setItem("TextStorm_Editor_Mode", "$light");
	}
});

function transparent_BG_editor() {
	if (dark_mode_status == false) {
		document.getElementById("body_editor").style.background = `rgba(248, 248, 248, 0.8)`;
	} else {
		document.getElementById("body_editor").style.background = `rgba(38, 38, 38, 0.8)`;
	}
}