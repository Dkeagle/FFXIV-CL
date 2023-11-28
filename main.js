// Functions
/* Load text in the shops panel according to the selected language */
function loadShopsPanel(ls_lang){
	document.getElementById("shops_title").innerHTML = str_shops_title[ls_lang];
	document.getElementById("lab_nooks_cranny").innerHTML = str_nooks_cranny[ls_lang];
	document.getElementById("lab_turnip_am").innerHTML = str_turnip_am[ls_lang];
	document.getElementById("lab_turnip_pm").innerHTML = str_turnip_pm[ls_lang];
	document.getElementById("lab_abels_sisters").innerHTML = str_abels_sisters[ls_lang];
	document.getElementById("lab_sable").innerHTML = str_sable[ls_lang];
}

/* Load text in the miles panel according to the selected language */
function loadMilesPanel(ls_lang){
	document.getElementById("miles_title").innerHTML = str_miles_title[ls_lang];
	document.getElementById("lab_daily_miles").innerHTML = str_daily_miles[ls_lang];
	document.getElementById("lab_nook_shopping").innerHTML = str_nook_shopping[ls_lang];
	document.getElementById("lab_recycle_bin").innerHTML = str_recycle_bin[ls_lang];
	document.getElementById("lab_miles_challenge").innerHTML = str_miles_challenges[ls_lang];
}

/* Load text in the island panel according to the selected language */
function loadIslandPanel(ls_lang){
	document.getElementById("island_title").innerHTML = str_island_title[ls_lang];
	document.getElementById("lab_mailbox").innerHTML = str_mailbox[ls_lang];
	document.getElementById("lab_fossils").innerHTML = str_fossils[ls_lang];
	document.getElementById("lab_rocks").innerHTML = str_rocks[ls_lang];
	document.getElementById("lab_gold_spot").innerHTML = str_gold_spot[ls_lang];
	document.getElementById("lab_trees").innerHTML = str_trees[ls_lang];
	document.getElementById("lab_flowers").innerHTML = str_flowers[ls_lang];
	document.getElementById("lab_shells_clams").innerHTML = str_shells_clams[ls_lang];
	document.getElementById("lab_message_bottle").innerHTML = str_message_bottle[ls_lang];
	if(ls_lang === "en"){
		document.getElementById("egg").addEventListener("click", easterEgg);
	}
	document.getElementById("lab_fruits").innerHTML = str_fruits[ls_lang];
	document.getElementById("lab_wood").innerHTML = str_wood[ls_lang];
	document.getElementById("lab_weeds").innerHTML = str_weeds[ls_lang];
}

/* Load text in the villagers panel according to the selected language */
function loadVillagersPanel(ls_lang){
	document.getElementById("villagers_title").innerHTML = str_villagers_title[ls_lang];
	document.getElementById("tb_villager_01").placeholder = str_villager_01[ls_lang];
	document.getElementById("tb_villager_02").placeholder = str_villager_02[ls_lang];
	document.getElementById("tb_villager_03").placeholder = str_villager_03[ls_lang];
	document.getElementById("tb_villager_04").placeholder = str_villager_04[ls_lang];
	document.getElementById("tb_villager_05").placeholder = str_villager_05[ls_lang];
	document.getElementById("tb_villager_06").placeholder = str_villager_06[ls_lang];
	document.getElementById("tb_villager_07").placeholder = str_villager_07[ls_lang];
	document.getElementById("tb_villager_08").placeholder = str_villager_08[ls_lang];
	document.getElementById("tb_villager_09").placeholder = str_villager_09[ls_lang];
	document.getElementById("tb_villager_10").placeholder = str_villager_10[ls_lang];
	document.getElementById("lab_camping").innerHTML = str_camping[ls_lang];
	document.getElementById("lab_visitors").innerHTML = str_visitors[ls_lang];
	document.getElementById("p_visitors_list").innerHTML = str_visitors_list[ls_lang];
}

/* Load text in the infos panel according to the selected language */
function loadInfosPanel(ls_lang){
	document.getElementById("infos_title").innerHTML = str_infos_title[ls_lang];
	document.getElementById("infos").innerHTML = str_infos[ls_lang];
}

/* When language is english, add a redirect to "Message in a bottle" by "The Police" when clicking on the text, just because it's funny :P */
function easterEgg(){
	window.open("https://www.youtube.com/watch?v=MbXWrmQW-OE");
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
	loadShopsPanel(ls_lang);
	loadMilesPanel(ls_lang);
	loadIslandPanel(ls_lang);
	loadVillagersPanel(ls_lang);
	loadInfosPanel(ls_lang);
}

/* Check localstorage for existing values and load them */
function loadValues(checkboxes, textinputs){
	for(let i = 0; i < checkboxes.length; i++){
		if(localStorage[checkboxes[i].id] !== undefined && localStorage[checkboxes[i].id] === "true"){
			checkboxes[i].checked = true;
		}
	}
	for(let i = 0; i < textinputs.length; i++){
		if(localStorage[textinputs[i].id] !== undefined && localStorage[textinputs[i].id] !== ""){
			textinputs[i].value = localStorage[textinputs[i].id];
		}
	}
}

/* When triggered by change event, save the triggered element value (or state) in the localStorage */
function saveValues(ev){
	localStorage[ev.target.id] = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value 
}

/* Add an event listener on every input, making it trigger the save at every change */
function triggerSave(checkboxes, textinputs){
	for(let i = 0; i < checkboxes.length; i++){
		checkboxes[i].addEventListener("change", saveValues);
	}
	for(let i = 0; i < textinputs.length; i++){
		textinputs[i].addEventListener("change", saveValues);
	}
}

/* Check if a reset is needed */
function needReset(checkboxes){
	if(document.cookie.indexOf("dailyResetDone=") === -1){
		// If cookie doesn't exist, reset the checkboxes and set a cookie (used as a flag) expiring at 5am the next day (or same day if created before 5am)
		resetValues(checkboxes);
		let now = new Date();
		let expiration = new Date(now.getFullYear(), now.getMonth(), now.getHours() < 5 ? now.getDate() : now.getDate() + 1, 5, 0, 0);
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
	let checkboxes = document.querySelectorAll("input[type=checkbox]");
	let textinputs = document.querySelectorAll("input[type=text]");
	triggerSave(checkboxes, textinputs);
	
	// Check if a reset is needed (and if so, reset the checkboxes)
	needReset(checkboxes);
	
	// After a (possible) reset, load the values from the localStorage
	loadValues(checkboxes, textinputs);
}