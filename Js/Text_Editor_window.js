/*Error Window Utils*/
$(".error").draggable();
$(".message_two").draggable();
$(".window").draggable();

// create and show the notification
const showNotification = () => {
	// create a new notification
	const notification = new Notification('TextStorm', {
		body: 'A simple text/notes editor with Mac Design, developed by Dwijottam Dutta',
		icon: "../Icon/textstorm.png"
	});

	// close the notification after 10 seconds
	setTimeout(() => {
		notification.close();
	}, 15 * 1000);

	// navigate to a URL when clicked
	notification.addEventListener('click', () => {
		null
	});
}

// show an error message
const showError = () => {
	console.log("Notification Blocked")
}

// check notification permission
let granted = false;

if (Notification.permission === 'granted') {
	granted = true;
} else if (Notification.permission !== 'denied') {
	let permission = Notification.requestPermission();
	granted = permission === 'granted' ? true : false;
}

// show notification or error

var delayInMilliseconds = 5000; //10 second

setTimeout(function () {
	granted ? showNotification() : showError();
}, delayInMilliseconds);


// Limitting Text Function for Anonymous  
function limitText(limitField, limitNum) {
	if (limitField.value.length > limitNum) {
		limitField.value = limitField.value.substring(0, limitNum);
		let errordump = document.getElementById("error_id");
		errordump.style.display = "flex";
	}
}

// Limitting Text Function for Anonymous onclick(ok button)
function validation_mess() {
	// alert("You have consumed non-verified user (anonymous) Usage, now you have to verify yourself for writing unlimited notes/texts in TextStorm");
	userproduct = prompt("Enter your name:");
	console.log(userproduct);
	if (!((userproduct == null) || (userproduct == ""))) {
		unlimited.removeAttribute("onKeyDown");
		unlimited.removeAttribute("onKeyUp");
		alert("You are now an verified user...");
		localStorage.setItem("$verfication", "$verified$");
		// Get a reference to the database service
		var database = firebase.database();
		var ref = database.ref("Users_Data");
		ref.push(userproduct)
		console.log(userproduct)
		let errordump = document.getElementById("error_id");
		errordump.style.display = "none";
	}
	// else if (userproduct != ""){
	//   unlimited.removeAttribute("onKeyDown");
	//   unlimited.removeAttribute("onKeyUp");
	//   alert("You are now an verified user...");
	// }
}

function messageClose() {
	let messagedump = document.getElementById("message_id");
	messagedump.style.display = "none";
}

// Restore Down Function Window Utils
function winResize() {
	let win_resize_but = document.getElementById("large_small");
	if (win_resize_but.style.visibility == "visible") {
		win_resize_but.style.visibility = "hidden"
		console.log("Normal")
	} else {
		console.log("Unstable")
		win_resize_but.style.visibility = "visible";
	}

}

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
		editorarea.style.height = "337px";
		minimize_status = false;
		editorarea.style.minHeight = '220px';
		editorarea.style.maxHeight = 'none';
	} else {
		minimize_status = true;
		minimize_but.style.display = "none";
		editorarea.style.height = "40px";
		editorarea.style.maxHeight = "40px";
		editorarea.style.minHeight = "40px";

		titlebar_row.style.display = "flex";
	}
}

// Restore Down Function Window Utils
function myCopy() {
	let copyText = document.getElementById("apnatext");
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	// alert("Copied the text: " + copyText.value);
}

// Editing/Viewing Function Window Utils
function editableOption() {
	let text_edit = document.getElementById("apnatext");
	let edit_button = document.getElementById("editbutton");
	if (text_edit.disabled === true) {
		edit_button.innerHTML = document.write = '<i class="far fa-files-o" id="icon_doc"></i>';
		text_edit.disabled = false;
	} else if (text_edit.disabled === false) {
		edit_button.innerHTML = document.write = '<i class="far fa-pencil-square-o" id="icon"></i>';
		text_edit.disabled = true;
	}
	// else{
	//   text_edit.disable == true;
	//   edit_button.innerHTML = document.write='<i class="fa fa-pencil-square-o"></i> Edit';
	//   console.log("LOL");
	// }

}

// Resize Plus Icon Function
let content = document.getElementById("editor");      /*Declared Var*/
let large_press = document.getElementById("large");
large_press.addEventListener("click", function () {
	let width1 = content.offsetWidth
	let height1 = content.offsetHeight
	content.style.width = (width1 + 100) + "px";
	content.style.height = (height1 + 50) + "px";
});

// Resize Minus Icon Function
let small_press = document.getElementById("small");
small_press.addEventListener("click", function () {
	let width1 = content.offsetWidth
	let height1 = content.offsetHeight
	content.style.width = (width1 - 100) + "px";
	content.style.height = (height1 - 50) + "px";
});

// Close Function Window Utils
let macos = document.getElementById("editor");
let open_but = document.getElementById("open");
function winClose() {
	macos.style.display = "none";
	open_but.style.display = 'flex';
}

// Open Function Window Utils
function openwindow() {
	macos.style.display = "block";
	open_but.style.display = 'none';

}

// CLose Function Error Window Utils
function errorClose() {
	let errordump = document.getElementById("error_id");
	errordump.style.display = "none";
}