/* Boodschappenlijstje
 
	versie 1.0.1 	augustus 2014
	versie 1.0 		juni 2013
*/

// globals
var broodEtc = ["brood","broodjes","eieren","kaas","aardappels","beleg","groente","fruit","soepgroente","uien","knoflook"];
var drankEtc = ["wijn rood","wijn rose","wijn wit","vlees","frisdrank","bubbelwater","toast","bier","pinda s"];
var schoonmaakEtc = ["witwasmid","kleurwasmid","afwasmiddel","schuurmid","schoonmkmid","chloor","pedaalzak","WC papier","keukenrol","vloeibare zeep","zeep","tandpasta","shampoo"];
var levensmidEtc = ["bloem","koekjes","koffie","koffiepads","koffiefilters","thee","suiker","completa","crackers","zout","olijfolie","rijst","pasta","mayonnaise"];
var tomatenpureeEtc = ["tomatenpuree","tomatenstukjes","pesto","dressing","soep","bouillonpot","kwark","toetje","Becel","BakBraad-Becel","Becel pakje","jam","hagelslag","beschuit","ontbijtkoek","pindakaas"];
var sojamelkEtc = ["sojamelk","halfvolle melk","sojaroom","muesli","pizza s","diepvriesvis","aardapplkrktjes","ijs","diepvriesgrnte","diepvriesvlees","frites","garnalen"];
var allEtc = broodEtc.concat(drankEtc,schoonmaakEtc,levensmidEtc,tomatenpureeEtc,sojamelkEtc);
var arrays = ["broodEtc","drankEtc","schoonmaakEtc","levensmidEtc","tomatenpureeEtc","sojamelkEtc"];
var allAll = [];
var listItem = [];
var listValue = [];

var currentDate = new Date();
var day = currentDate.getDate();
var monthNum = currentDate.getMonth();
var months = new Array('januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
var month = months[monthNum];
var year = currentDate.getFullYear();
var datum = " " + day + " " + month + " " + year

var boodschap = [];
var extraBoodschap = [];

var incCount = 0;
var printString = null;
var i;

// Maak schone ID'tjes voor de items
function createId (arrayItem) {
	var x,y,z;
	if (arrayItem.indexOf(" ") != -1){
		x = arrayItem.substr(0,arrayItem.indexOf(" ",0));
		y = arrayItem.substr(arrayItem.lastIndexOf(" ")+1);
		z = x + y;
	}
	else {
		z = arrayItem;
	}
	return z;
}

for (i = 0; i < allEtc.length; i++) {
	allAll[i] = createId(allEtc[i]);
}

// Maak de arraytjes schoon
Array.prototype.clean = function (deleteValue) {
	for (i = 0; i <this.length; i++) {
		if (this[i] == deleteValue) {
			this.splice(i,1);
			i--;
		}
	}
	return this;
};

// Toon de lijst
function printList() {
	document.write("<h3>De wekelijkse boodschappen</h3>");
	
	for (i = 0; i < (listItem.length - incCount); i++) {
		boodschap[i] = listItem[i] + ": " + listValue[i] + " %0A";
		document.write(listItem[i] + ": " + listValue[i] + "<br />");
	}
	document.write("<br />");
	
	for (i = (listItem.length - incCount); i < listItem.length; i++) {
		extraBoodschap[i] = listItem[i] + "%0A";
		document.write("<i>" + listItem[i] + "</i>");

	document.write("<br />");
	}
}

// Stuur een e-mail (nog in aanbouw)
function sendMail() {
	var rec = "fdehaen", 
		dom = "gmail", 
		ext = "com",
		onderwerp = "Boodschappen",
		body = "Dit zijn de boodschappen: %0A",
		mailtje = "mailto:" 
			+ rec + "@" + dom + "." + ext 
			+ "?subject=" + onderwerp + datum 
			+ "&body=" + body 
			+ boodschap.join("")
			+ extraBoodschap.join("");

	window.location.href = mailtje;
	enterDatabase();
};

// Plaats de nieuwe lijst in de database
function enterDatabase(){
	lijsten.insert
}

// Stel een lijst samen met de boodschappen en hun hoeveelheden
function createList() {
	var itemName, itemNameC, itemNameT, incidenteel, formInc, form = document.form;
	
	for (i = 0; i < allAll.length; i++) {
		itemName = allAll[i];
		itemNameC = "c" + itemName;
		itemNameT = "t" + itemName;
		if (form[itemNameC].checked || form[itemNameT].value != 0) {
			listItem[i] = form[itemNameC].value;
			listValue[i] = form[itemNameT].value;
		}
	}
	// Haal de incidenteeltjes op - 6 stuks
	for (i = 1; i <= 6; i++) { 
		incidenteel = "inc" + i;
		formInc = form[incidenteel].value;
		if (formInc != 0) {
			listItem[allAll.length + i] = formInc;
			incCount++;
		}
	}
	listItem.clean(undefined);
	listValue.clean(undefined);
	printList();
	document.write("<input type = 'button' onclick = 'location.reload()' value = 'Opnieuw...'> <input type = 'button' onclick = 'beheerLijsten()' value = 'Beheer historische lijstjes'> <input type = 'button' onclick = 'window.print()' value = 'Print dit lijstje'> <input type = 'button' onclick = 'sendMail();' value = 'Stuur een mailtje aan jezelf'>");
}

// Creeer en populeer het formulier
function main() {
	var idname;
	document.body.innerHTML = "";
	document.write("<form onsubmit = 'createList(); return false' name = 'form'><table><tbody><th><td>Hoeveelheid</td></th>");
	for (i = 0; i < broodEtc.length; i++) {
		idname = createId(broodEtc[i]);
		document.write("<tr><td><input id = '" + idname + "' type = 'checkbox' name = 'c" + idname + "' value = '" + broodEtc[i] + "'>" + broodEtc[i] + "</td><td><input id = '" + idname + "' type = 'text' size = '3' name = 't" + idname + "' value = ''></td></tr>");
	}
	// extra regel voor incidenteeltjes
	document.write("<tr><td colspan = '2'><input = 'text' name = 'inc1'></td></tr>"); 	// extra regel voor incidenteeltjes
	document.write("</tbody></table><table><tbody><th><td>Hoeveelheid</td></th>");
	for (i = 0; i < drankEtc.length; i++) {
		idname = createId(drankEtc[i]);
		document.write("<tr><td><input id = '" + idname + "' type = 'checkbox' name = 'c" + idname + "' value = '" + drankEtc[i] + "'>" + drankEtc[i] + "</td><td><input id = '" + idname + "' type = 'text' size = '3' name = 't" + idname + "' value = ''></td></tr>");
	}
	// extra regel voor incidenteeltjes
	document.write("<tr><td colspan = '2'><input = 'text' name = 'inc2'></td></tr>");	 	// extra regel voor incidenteeltjes
	document.write("</tbody></table><table><tbody><th><td>Hoeveelheid</td></th>");
	for (i = 0; i < schoonmaakEtc.length; i++) {
		idname = createId(schoonmaakEtc[i]);
		document.write("<tr><td><input id = '" + idname + "' type = 'checkbox' name = 'c" + idname + "' value = '" + schoonmaakEtc[i] + "'>" + schoonmaakEtc[i] + "</td><td><input id = '" + idname + "' type = 'text' size = '3' name = 't" + idname + "' value = ''></td></tr>");
	}
	// extra regel voor incidenteeltjes
	document.write("<tr><td colspan = '2'><input = 'text' name = 'inc3'></td></tr>");	 	// extra regel voor incidenteeltjes
	document.write("</tbody></table><table><tbody><th><td>Hoeveelheid</td></th>");
	for (i = 0; i < levensmidEtc.length; i++) {
		idname = createId(levensmidEtc[i]);
		document.write("<tr><td><input id = '" + idname + "' type = 'checkbox' name = 'c" + idname + "' value = '" + levensmidEtc[i] + "'>" + levensmidEtc[i] + "</td><td><input id = '" + idname + "' type = 'text' size = '3' name = 't" + idname + "' value = ''></td></tr>");
	}
	// extra regel voor incidenteeltjes
	document.write("<tr><td colspan = '2'><input = 'text' name = 'inc4'></td></tr>");	 	// extra regel voor incidenteeltjes
	document.write("</tbody></table><table><tbody><th><td>Hoeveelheid</td></th>");
	for (i = 0; i < tomatenpureeEtc.length; i++) {
		idname = createId(tomatenpureeEtc[i]);
		document.write("<tr><td><input id = '" + idname + "' type = 'checkbox' name = 'c" + idname + "' value = '" + tomatenpureeEtc[i] + "'>" + tomatenpureeEtc[i] + "</td><td><input id = '" + idname + "' type = 'text' size = '3' name = 't" + idname + "' value = ''></td></tr>");
	}
	document.write("<tr><td colspan = '2'><input = 'text' name = 'inc5'></td></tr>"); 	// extra regel voor incidenteeltjes
	document.write("</tbody></table><table><tbody><th><td>Hoeveelheid</td></th>");
	for (i = 0; i < sojamelkEtc.length; i++) {
		idname = createId(sojamelkEtc[i]);
		document.write("<tr><td><input id = '" + idname + "' type = 'checkbox' name = 'c" + idname + "' value = '" + sojamelkEtc[i] + "'>" + sojamelkEtc[i] + "</td><td><input id = '" + idname + "' type = 'text' size = '3' name = 't" + idname + "' value = ''></td></tr>");
	}
	document.write("<tr><td colspan = '2'><input = 'text' name = 'inc6'></td></tr>"); 	// extra regel voor incidenteeltjes
	document.write("</tbody></table><br /><br /><input type = 'submit' value = 'Klaar?'></form>");
}
