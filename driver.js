const CLIENT = require("node-telegram-bot-api");
const config = require("./JSON/config.json");
const client = new CLIENT(config.token, { polling: true });

const {States, User} = require("./userStatesObj.js");

const lists = require("./lists.js");
const days = require("./days.js");
const commands = [["/info"], ["/search"], ["/charcters_list"], ["/swords_list"], ["/claymores_list"], ["/polearms_list"], ["/bows_list"], ["/catalysts_list"], ["/talent_materials_list"], ["/weapon_materials_list"]];

let states = new States();
//Sends a list of all the commands in a message
client.onText(/\/start/, (msg) => {

	client.sendMessage(msg.chat.id, "Welcome!", {
		"reply_markup": {
			"keyboard": commands
		}
	});	

});

//Will send a message with information of some kind? I haven't decided yet
client.onText(/\/info/, (msg) => {
	client.sendMessage(msg.chat.id, "Functionatlity has yet to be added!");
});

/***Functions for users in a "search" state***/
//Will eventually allow users to search for various combinations of materials/the characters and weapons they correspond to
//and/or characters/weapons and the materials they need
client.onText(/\/search/, (msg) => {
	let user = new userState(msg.chat.id, "search", Date.now());
	if( msg.chat.id in states.users ) {
		
	}
	
	states.users[msg.chat.id] = new User();

	client.sendMessage(msg.chat.id, "What would you like to search by?", {
		"reply_markup": {
			"keyboard": ["Characters", "Weapons", "Character Materials", "Weapon Materials"]
		}
	});

	client.on("message", `${days.matDay(msg, client)}`);
});

client.onText(/\/Characters/) {

}

client.onText(/\/Weapons/) {}

client.onText(/\/Character Materials/) {}

client.onText(/\/Weapon Materials/) {}
//end "search" state functions

//Sends a list of all the characters in the game
client.onText(/\/characters_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Characters in Genshin:\n-----------------------------------------------------\n${lists.characterList.join("\n")}`);
});

//Sends a list of all the swords in the game
client.onText(/\/swords_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Swords in Genshin:\n-----------------------------------------------------\n${lists.swordList.join("\n")}`);
});

//Sends a lsit of all the claymores in the game
client.onText(/\/claymores_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Claymores in Genshin:\n-----------------------------------------------------\n${lists.claymoreList.join("\n")}`);
});

//Sends a list of all the polearms in the game
client.onText(/\/polearms_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Polearms in Genshin:\n-----------------------------------------------------\n${lists.polearmList.join("\n")}`);
});

//Sends a list of all the bows in the game
client.onText(/\/bows_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Bows in Genshin:\n-----------------------------------------------------\n${lists.bowList.join("\n")}`);
});

//Sends a list of all the catalysts in the game
client.onText(/\/catalysts_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Catalysts in Genshin:\n-----------------------------------------------------\n${lists.catalystList.join("\n")}`);
});

//Sends a list of talent level up materials in a message, each one having its own line
client.onText(/\/talent_materials_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Talent Materials in Genshin:\n-----------------------------------------------------\n${lists.talentMatList.join("\n")}`);
});

//Sends a list of weapon ascencion materials in a message, each one having its own line
client.onText(/\/weapon_materials_list/, (msg) => {
	client.sendMessage(msg.chat.id, `List of All the Weapon Materials in Genshin:\n-----------------------------------------------------\n${lists.weaponMatList.join(" Set\n")}`);
});

//Will eventually set up a timer to remind users of ascension material availability on the days that they are available
client.onText(/\/setReminder/, (msg) => {
	client.sendMessage(msg.chat.id, "Functionality has yet to be added!");
});


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