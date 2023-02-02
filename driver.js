const CLIENT = require("node-telegram-telegrabot-api");
const config = require("./JSON/config.json");
const materials = require("./JSON/materials.json");
const client = new CLIENT(config.token, { polling: true });
// let wepMats = Object.keys(materials.weapon_materials);
// for(let item in materials.weapon_materials) { console.log(item); wepMats.push(item); console.log(wepMats);} 



client.on("message", (msg) => {

	if (msg.text.toString().toLowerCase().startsWith("hi")) {
		client.sendMessage(msg.chat.id, "hello there");
	}

});

client.onText(/\/start/, (msg) => {

	let vertKeyboardArray = [];
	vertKeyboardArray = verticalize();



	client.sendMessage(msg.chat.id, "Welcome", {
		"reply_markup": {
			"keyboard": vertKeyboardArray
		}
	});
	
});

//[wepMats.map(matName => materials.localization.weapon_materials[matName])]

client.on("message", (msg) => {

});

client.on("polling_error", (error) => {

	console.log(error);

});

// let userMaterials = [];
// for(let item in materials.weapon_materials) {
// 	userMaterials.push(item);
// }

// console.log(`It's time to farm ${userMaterials.map(matName => materials.localization[matName]).join(' and ')}!`);

let verticalize = () => {
	let tempArr = [];
	const sortedKeys = Object.values(materials.localization.weapon_materials).sort();

	for( let i = 0; i < sortedKeys.length; i+=2) {
		if( i + 1 >= sortedKeys.length ) {
			tempArr.push([sortedKeys.at(i)]);
		} 
		else {
			tempArr.push(sortedKeys.slice(i, i+2));
		}
	}

	return tempArr;
};