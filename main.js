// Functions
function loadText(textNodes, langFileConst, ls_lang){
	for(let i = 0; i < textNodes.length; i++){
		textNodes[i].innerHTML = langFileConst[i][ls_lang];		
	}
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

/* Main loading functions */
function mainLoad(bt_texts, daily_texts, weekly_texts, hunts_texts){
	let ls_lang = localStorage['lang'];
	loadLangSwitchButton(ls_lang);
	loadDate(ls_lang);
	loadText(bt_texts, str_bt_texts, ls_lang);
	loadText(daily_texts, str_daily_texts, ls_lang);
	loadText(weekly_texts, str_weekly_texts, ls_lang);
	loadText(hunts_texts, str_hunts_texts, ls_lang);
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
	localStorage[ev.target.id] = ev.target.checked;
}

/* Add an event listener on every input, making it trigger the save at every change */
function triggerSave(checkboxes){
	for(let i = 0; i < checkboxes.length; i++){
		checkboxes[i].addEventListener("change", saveValues);
	}
}

/* Check if a reset is needed */
function needReset(daily4pmCB, daily9pmCB, weeklyCB) {
	let now = new Date();
	
	function resetAndSetCookie(checkBox, cookieName, resetHour, resetDay = 1) {
		if (document.cookie.indexOf(cookieName + "=") === -1) {
			resetValues(checkBox);
			let expiration = new Date(now.getFullYear(), now.getMonth(), now.getHours() < resetHour ? now.getDate() : now.getDate() + resetDay, resetHour, 0, 0);
			document.cookie = cookieName + "=true; expires=" + expiration.toUTCString();
		}
	}
  
	resetAndSetCookie(daily4pmCB, "daily4pmResetDone", 17);
	resetAndSetCookie(daily9pmCB, "daily9pmResetDone", 22);
  
	let daysBeforeTuesday = (2 - now.getDay() + 7) % 7;
	resetAndSetCookie(weeklyCB, "weeklyResetDone", 10, daysBeforeTuesday);
}

/* Reset every checkboxes to false (unchecked) */
function resetValues(checkboxes){
	for(let i = 0; i < checkboxes.length; i++){
		localStorage[checkboxes[i].id] = "false";
	}
}

/* Count the amount of checked boxes and disable the others if max amount if reached */
function countCheckedBoxes(checkboxes, amount){
	let checkedCount = document.querySelectorAll("input.btCount[type=checkbox]:checked").length;

	checkboxes.forEach(checkbox => {
		checkbox.disabled = checkedCount >= amount && !checkbox.checked;
	});
}

/* Set the maximum amount of simultaneously checked boxes in a specific list */
function triggerMaxCheckedCount(checkboxes, maxCount){
	for(let i = 0; i < checkboxes.length; i++){
		checkboxes[i].addEventListener("change", () => countCheckedBoxes(checkboxes, maxCount));
	}
}

/* Window is loaded */
window.addEventListener("DOMContentLoaded", () => {
	// Check localStorage for language, set to english by default
	if(localStorage['lang'] === undefined || localStorage['lang'] === ''){
		localStorage['lang'] = "en"
	}

	// Get the different labels
	let bt_texts = document.querySelectorAll(".bt_texts");
	let daily_texts = document.querySelectorAll(".daily_texts");
	let weekly_texts = document.querySelectorAll(".weekly_texts");
	let hunts_texts = document.querySelectorAll(".hunts_texts");
	
	// Load the event listener on the language switch
	document.getElementById("lang_switch").addEventListener("click", () => {
		localStorage['lang'] === "en" ? localStorage['lang'] = "fr" : localStorage['lang'] = "en"
		mainLoad(bt_texts, daily_texts, weekly_texts, hunts_texts);
	})
	
	// Call the main loading function
	mainLoad(bt_texts, daily_texts, weekly_texts, hunts_texts);

	// Get the different checkboxes
	let daily4pmCB = document.querySelectorAll("input.daily4pm[type=checkbox]")
	let daily9pmCB = document.querySelectorAll("input.daily9pm[type=checkbox]")
	let weeklyCB = document.querySelectorAll("input.weekly[type=checkbox]");
	let btCount = document.querySelectorAll("input.btCount[type=checkbox]");
	let checkboxes = document.querySelectorAll("input[type=checkbox]");

	// Make every input modification trigger an autosave
	triggerSave(checkboxes);
	
	// Check if a reset is needed (and if so, reset the checkboxes)
	needReset(daily4pmCB, daily9pmCB, weeklyCB);
	
	// After a (possible) reset, load the values from the localStorage
	loadValues(checkboxes);

	// Beast tribes panel only authorize 12 maximum checked boxes at once
	triggerMaxCheckedCount(btCount, 12);
	countCheckedBoxes(btCount, 12);
});