const CLIENT = require("node-telegram-bot-api");
const config = require("./JSON/config.json");
const client = new CLIENT(config.token, { polling: true });

const {States, User} = require("./userStatesObj.js");

const materials = require("./JSON/materials.json");
const matDays = require("./JSON/matDays.json");
const locale = require("./localization.js");
const lists = require("./lists.js");
const commands = [
	"/start",
	"/info",
	"/search",
	"/characters_list",
	"/swords_list",
	"/claymores_list",
	"/polearms_list",
	"/bows_list",
	"/catalysts_list",
	"/talent_materials_list",
	"/weapon_materials_list",
	"/setReminder"
];

const commandsKeyboard = commands.map(command => [command]);

let states = new States();

client.onText(/.*/, (msg) => {
	console.log(msg.text.toString());
	console.log(Object.keys(states.users));
	console.log(msg.chat.id);

	//test if a user ID has a state
	if (states.users[msg.chat.id]) {
		if (msg.text.toLowerCase() ? "cancel" : "/cancel") {
			delete states.users[msg.chat.id];
			return;
		}
		console.log("state found");
		switch(states.users[msg.chat.id].currentState) {
			case "search":
				console.log("search state found");
				switch(msg.text) {
					case "Characters":
						charactersSearch(msg);
						break;
					case "Character Materials":	 
						characterMatSearch(msg);
						break;
					case "Weapons": 
						weaponsSearch(msg);
						break;
					case "Weapon Materials": 
						weaponMatSearch(msg);
						break;
					case "Material":
						matSearch(msg);
						break;
				}
				break;
			case "char":
				characterQuery(msg);
				break;
			case "charmat":
				characterMatQuery(msg);
				break;
			case "weapons":
				weaponsQuery(msg);
				break;
			case "weaponmats":
				weaponMatQuery(msg);
				break;
			case "mats":
				matQuery(msg);
				break;
			case "reminder":
				setReminder(msg);
				break;
			default: 
				client.sendMessage(msg.chat.id, "Something went wrong! Please restart what you were doing.");
				delete states.users[msg.chat.id];
				break;
		}
	}
	//if no state is found, test against standard commands
	else { 
		switch(msg.text) {
			case commands[0]:
				console.log("start case run");
				start(msg);
				break;
			case commands[1]: 
				info(msg);
				break;
			case commands[2]:
				search(msg); 
				break;
			case commands[3]:
				characterList(msg); 
				break;
			case commands[4]: 
				swordList(msg);
				break;
			case commands[5]:
				claymoreList(msg); 
				break;
			case commands[6]:
				polearmList(msg); 
				break;
			case commands[7]: 
				bowList(msg);
				break;
			case commands[8]: 
				catalystList(msg);
				break;
			case commands[9]: 
				talentMatsList(msg);
				break;
			case commands[10]: 
				weaponMatsList(msg);
				break;
			case commands[11]:
				setReminder(msg);
				break;
		}
	}
});

//Sends a list of all the commands in a message
const start = (msg) => {

	client.sendMessage(msg.chat.id, "Welcome!", {
		"reply_markup": {
			"keyboard": commandsKeyboard
		}
	});	

};

//Will send a message with information of some kind? I haven't decided yet
const info = (msg) => {
	client.sendMessage(msg.chat.id, "Functionatlity has yet to be added!");
};

/***FUNCTIONS FOR USERS IN A "SEARCH" STATE***/
//Will eventually allow users to search for various combinations of materials/the characters and weapons they correspond to
//and/or characters/weapons and the materials they need
const search = (msg) => {
	// let user = new User(msg.chat.id, "search", Date.now());
	if( states.users[msg.chat.id] ) {
		states.users[msg.chat.id].currentState = "search";
		console.log(states.users);
	}
	else { 
		states.users[msg.chat.id] = new User("search", Date.now()); 
		console.log(states.users);
	}

	client.sendMessage(msg.chat.id, `What would you like to search by?\nYou can cancel at any point by typing "cancel" or "/cancel"`, {
		"reply_markup": {
			"keyboard": [["Characters"], ["Character Materials"], ["Weapons"], ["Weapon Materials"]]
		}
	});
};

const charactersSearch = (msg) => {
	console.log(lists.characterList);
	states.users[msg.chat.id].currentState = "char";
	client.sendMessage(msg.chat.id, `List of Characters`, {
		"reply_markup": {
			"keyboard": locale.characterLocal
		}
	});
};

const characterMatSearch = (msg) => {
	states.users[msg.chat.id].currentState = "charmat";
};

const weaponsSearch = (msg) => {
	states.users[msg.chat.id].currentState = "weapons";
};

const weaponMatSearch = (msg) => {
	states.users[msg.chat.id].currentState = "weaponmats";
};

const matSearch = (msg) => {
	states.users[msg.chat.id].currentState = "mats";
};
/***END "SEARCH" STATE FUNCTIONS***/

/***FUNCTIONS FOR USERS WITH ALTERNATE STATES***/
const characterQuery = (msg) => {

	//find the sanitized name of a character
	//gets keys from localization, iterates through each key to test message against value
	//key is the sanitized name of the character
	const key = Object.keys(locale.localize.characters).find(key => locale.localize.characters[key] === msg.text);

	//if the key is undefined or null, prompt the user again
	if( key == null ) {
		client.sendMessage(msg.chat.id, "Please use the list popup to select a character.");
		charactersSearch(msg);
	}

	//find the localized name of the material of the searched character using the sanitized character name (key)
	const mat = Object.values(materials.character).find(mat => materials.character[key] === mat);

	//find the sanitized name of a material
	const matSan = Object.keys(locale.localize.talent_materials).find(matSan => locale.localize.talent_materials[matSan] === mat);

	//find the days that the material is available
	const days = Object.values(matDays.talent_materials).find(days => matDays.talent_materials[matSan] === days);

	client.sendMessage(msg.chat.id, `${msg.text}'s talent ascension material is ${mat} which is available on ${days.join(", ")}, and Sunday`);
};

const characterMatQuery = (msg) => {
	client.sendMessage(msg.chat.id, "Functionality has yet to be added!");
};

const weaponsQuery = (msg) => {
	client.sendMessage(msg.chat.id, "Functionality has yet to be added!");
};

const weaponMatQuery = (msg) => {
	client.sendMessage(msg.chat.id, "Functionality has yet to be added!");
};

const matQuery = (msg) => {
	client.sendMessage(msg.chat.id, "Functionality has yet to be added!");
};
/***END ALTERNATE STATE FUNCTIONS***/

//Sends a list of all the characters in the game
const characterList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Characters in Genshin:\n-----------------------------------------------------\n${lists.characterList.join("\n")}`);
};

//Sends a list of all the swords in the game
const swordList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Swords in Genshin:\n-----------------------------------------------------\n${lists.swordList.join("\n")}`);
};

//Sends a lsit of all the claymores in the game
const claymoreList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Claymores in Genshin:\n-----------------------------------------------------\n${lists.claymoreList.join("\n")}`);
};

//Sends a list of all the polearms in the game
const polearmList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Polearms in Genshin:\n-----------------------------------------------------\n${lists.polearmList.join("\n")}`);
};

//Sends a list of all the bows in the game
const bowList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Bows in Genshin:\n-----------------------------------------------------\n${lists.bowList.join("\n")}`);
};

//Sends a list of all the catalysts in the game
const catalystList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Catalysts in Genshin:\n-----------------------------------------------------\n${lists.catalystList.join("\n")}`);
};

//Sends a list of talent level up materials in a message, each one having its own line
const talentMatsList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Talent Materials in Genshin:\n-----------------------------------------------------\n${lists.talentMatList.join("\n")}`);
};

//Sends a list of weapon ascencion materials in a message, each one having its own line
const weaponMatsList = (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Weapon Materials in Genshin:\n-----------------------------------------------------\n${lists.weaponMatList.join(" Set\n")}`);
};

//Will eventually set up a timer to remind users of ascension material availability on the days that they are available
const setReminder = (msg) => {
	if( states.users[msg.chat.id] ) {
		states.users[msg.chat.id].currentState = "reminder";
		console.log(states.users);
	}
	else { 
		states.users[msg.chat.id] = new User("reminder", Date.now()); 
		console.log(states.users);
	}

	client.sendMessage(msg.chat.id, "Functionality has yet to be added!");
};

//Functions for Users in a "set_reminder" state

//Saving this stuff for personal use later, and this is a convenient place for them
//[wepMats.map(matName => materials.localization.weapon_materials[matName])]

// client.on("message", (msg) => {
// 	for()
// 	if(msg.text.toString() === )
// });

// client.sendMessage(msg.chat.id, "Welcome", {
// 	"reply_markup": {
// 		"keyboard": formatting.characterLocal
// 	}
//});

client.on("polling_error", (error) => { console.log(error); });