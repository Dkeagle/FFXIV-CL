// Functions
function loadBeastTribesPanel(ls_lang){
	document.getElementById("bt_title").innerHTML = str_bt_title[ls_lang];
	document.getElementById("bt_lab01").innerHTML = str_bt_lab01[ls_lang];
	document.getElementById("bt_lab02").innerHTML = str_bt_lab02[ls_lang];
	document.getElementById("bt_lab03").innerHTML = str_bt_lab03[ls_lang];
	document.getElementById("bt_lab04").innerHTML = str_bt_lab04[ls_lang];
	document.getElementById("bt_lab05").innerHTML = str_bt_lab05[ls_lang];
	document.getElementById("bt_lab06").innerHTML = str_bt_lab06[ls_lang];
	document.getElementById("bt_lab07").innerHTML = str_bt_lab07[ls_lang];
	document.getElementById("bt_lab08").innerHTML = str_bt_lab08[ls_lang];
	document.getElementById("bt_lab09").innerHTML = str_bt_lab09[ls_lang];
	document.getElementById("bt_lab10").innerHTML = str_bt_lab10[ls_lang];
	document.getElementById("bt_lab11").innerHTML = str_bt_lab11[ls_lang];
	document.getElementById("bt_lab12").innerHTML = str_bt_lab12[ls_lang];
	document.getElementById("bt_lab13").innerHTML = str_bt_lab13[ls_lang];
	document.getElementById("bt_lab14").innerHTML = str_bt_lab14[ls_lang];
	document.getElementById("bt_lab15").innerHTML = str_bt_lab15[ls_lang];
	document.getElementById("bt_lab16").innerHTML = str_bt_lab16[ls_lang];
	document.getElementById("bt_lab17").innerHTML = str_bt_lab17[ls_lang];
}

function loadDailyPanel(ls_lang){
	document.getElementById("daily_title").innerHTML = str_daily_title[ls_lang];
	document.getElementById("daily_lab01").innerHTML = str_daily_lab01[ls_lang];
	document.getElementById("daily_lab02").innerHTML = str_daily_lab02[ls_lang];
	document.getElementById("daily_lab03").innerHTML = str_daily_lab03[ls_lang];
	document.getElementById("daily_lab04").innerHTML = str_daily_lab04[ls_lang];
}

function loadWeeklyPanel(ls_lang){
	document.getElementById("weekly_title").innerHTML = str_weekly_title[ls_lang];
	document.getElementById("weekly_lab01").innerHTML = str_weekly_lab01[ls_lang];
	document.getElementById("weekly_lab02").innerHTML = str_weekly_lab02[ls_lang];
	document.getElementById("weekly_lab03").innerHTML = str_weekly_lab03[ls_lang];
	document.getElementById("weekly_lab04").innerHTML = str_weekly_lab04[ls_lang];
	document.getElementById("weekly_lab05").innerHTML = str_weekly_lab05[ls_lang];
	document.getElementById("weekly_lab06").innerHTML = str_weekly_lab06[ls_lang];
	document.getElementById("weekly_lab07").innerHTML = str_weekly_lab07[ls_lang];
	document.getElementById("weekly_lab08").innerHTML = str_weekly_lab08[ls_lang];
	document.getElementById("weekly_lab09").innerHTML = str_weekly_lab09[ls_lang];
	document.getElementById("weekly_lab10").innerHTML = str_weekly_lab10[ls_lang];
	document.getElementById("weekly_lab11").innerHTML = str_weekly_lab11[ls_lang];
}

function loadHuntsPanel(ls_lang){
	document.getElementById("hunts_title").innerText = str_hunts_title[ls_lang];
	document.getElementById("hunts_lab01").innerText = str_hunts_lab01[ls_lang];
	document.getElementById("hunts_lab02").innerText = str_hunts_lab02[ls_lang];
	document.getElementById("hunts_lab03").innerText = str_hunts_lab03[ls_lang];
	document.getElementById("hunts_lab04").innerText = str_hunts_lab04[ls_lang];
	document.getElementById("hunts_lab05").innerText = str_hunts_lab05[ls_lang];
	document.getElementById("hunts_lab06").innerText = str_hunts_lab06[ls_lang];
	document.getElementById("hunts_lab07").innerText = str_hunts_lab07[ls_lang];
	document.getElementById("hunts_lab08").innerText = str_hunts_lab08[ls_lang];
	document.getElementById("hunts_lab09").innerText = str_hunts_lab09[ls_lang];
	document.getElementById("hunts_lab10").innerText = str_hunts_lab10[ls_lang];
	document.getElementById("hunts_lab11").innerText = str_hunts_lab11[ls_lang];
	document.getElementById("hunts_lab12").innerText = str_hunts_lab12[ls_lang];
	document.getElementById("hunts_lab13").innerText = str_hunts_lab13[ls_lang];
	document.getElementById("hunts_lab14").innerText = str_hunts_lab14[ls_lang];
	document.getElementById("hunts_lab15").innerText = str_hunts_lab15[ls_lang];
	document.getElementById("hunts_lab16").innerText = str_hunts_lab16[ls_lang];
	document.getElementById("hunts_lab17").innerText = str_hunts_lab17[ls_lang];
	document.getElementById("hunts_lab18").innerText = str_hunts_lab18[ls_lang];
}

/* Load the correct date format, according to the the selected language */
function loadDate(ls_lang){
	let today = new Date();
	let day = ('0' + today.getDate()).slice(-2);
	let months = str_months[ls_lang][today.getMonth()];
	let year = today.getFullYear();
	let weekday = str_days[ls_lang][today.getDay()];
	document.getElementById("date").innerHTML = ls_lang === "en" ? `${weekday}, ${months} ${day}, ${year}` : `${weekday}, ${day} ${months} ${year}`;
}

/* Load the language switch button, with correct flag and attribute, according to language */
function loadLangSwitchButton(ls_lang){
	let lang_switch_button = document.getElementById("lang_switch");
	lang_switch_button.src = str_lang_switch[ls_lang];
	lang_switch_button.alt = str_lang_switch_alt[ls_lang];
	lang_switch_button.title = str_lang_switch_title[ls_lang];
}

/* Main loading functions, will call every others loading functions */
function mainLoad(){
	let ls_lang = localStorage['lang'];
	loadLangSwitchButton(ls_lang);
	loadDate(ls_lang);
	loadBeastTribesPanel(ls_lang);
	loadDailyPanel(ls_lang);
	loadWeeklyPanel(ls_lang);
	loadHuntsPanel(ls_lang);
}

/* Check localstorage for existing values and load them */
function loadValues(checkboxes){
	for(let i = 0; i < checkboxes.length; i++){
		if(localStorage[checkboxes[i].id] !== undefined && localStorage[checkboxes[i].id] === "true"){
			checkboxes[i].checked = true;
		}
	}
}

/* When triggered by change event, save the triggered element value (or state) in the localStorage */
function saveValues(ev){
	localStorage[ev.target.id] = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value 
}

/* Add an event listener on every input, making it trigger the save at every change */
function triggerSave(dailyCB, weeklyCB){
	console.log(dailyCB);
	console.log(weeklyCB);
	let checkboxes = {
		...dailyCB,
		...weeklyCB
	};
	console.log(checkboxes);
	for(let i = 0; i < checkboxes.length; i++){
		checkboxes[i].addEventListener("change", saveValues);
	}
}

/* Check if a reset is needed */
function needReset(checkboxes){
	if(document.cookie.indexOf("dailyResetDone=") === -1){
		// If cookie doesn't exist, reset the checkboxes and set a cookie (used as a flag) expiring at 5am the next day (or same day if created before 5am)
		resetValues(checkboxes);
		let now = new Date();
		let expiration = new Date(now.getFullYear(), now.getMonth(), now.getHours() < 5 ? now.getDate() : now.getDate() + 1, 17, 0, 0);
		document.cookie = "dailyResetDone=true; expires=" + expiration.toUTCString();
	}
}

/* Reset every checkboxes to false (unchecked) */
function resetValues(checkboxes){
	for(let i = 0; i < checkboxes.length; i++){
		localStorage[checkboxes[i].id] = "false";
	}
}

/* Window is loaded */
window.onload = function (){
	// Check localStorage for language, set to english by default
	if(localStorage['lang'] === undefined || localStorage['lang'] === ''){
		localStorage['lang'] = "en"
	}
	
	// Load the event listener on the language switch
	document.getElementById("lang_switch").addEventListener("click", () => {
		localStorage['lang'] === "en" ? localStorage['lang'] = "fr" : localStorage['lang'] = "en"
		mainLoad();
	})
	
	// Call the main loading function
	mainLoad();

	// Make every input modification trigger an autosave
	let dailyCB = document.querySelectorAll(".daily[type=checkbox]");
	let weeklyCB = document.querySelectorAll("input.weekly[type=checkbox]");
	triggerSave(dailyCB, weeklyCB);
	/* Apres ici c'est encore à faire */
	
	// Check if a reset is needed (and if so, reset the checkboxes)
	/* needReset(dailyCB, weeklyCB);*/
	
	// After a (possible) reset, load the values from the localStorage
	/*loadValues(dailyCB, weeklyCB);*/
}