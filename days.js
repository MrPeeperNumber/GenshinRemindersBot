// const CLIENT = require("node-telegram-bot-api");
// const config = require("./JSON/config.json");
// const client = new CLIENT(config.token, { polling: true });

const days = require("./JSON/matDays.json");
const localize = require("./JSON/localization.json");

const talentLocal = localize.talent_materials;
const weaponMatLocal = localize.weapon_materials;

const talentDays = days.talent_materials;
const weaponDays = days.weapon_materials;

exports.matDay = function(msg, client) {

	console.log(msg);
	client.sendMessage(msg.chat.id, `The ${msg.text} set is available on ${msg.text}`);

};

// msg object contents
//{
// 	message_id: 303,
// 	from: {
// 	  id: 709418098,
// 	  is_bot: false,
// 	  first_name: 'Jake',
// 	  last_name: 'Owlsky',
// 	  username: 'Jake_Whitetail',
// 	  language_code: 'en'
// },
// chat: {
// 	  id: 709418098,
// 	  first_name: 'Jake',
// 	  last_name: 'Owlsky',
// 	  username: 'Jake_Whitetail',
// 	  type: 'private'
// 	},
// 	date: 1677284413,
// 	text: '/search',
// 	entities: [ { offset: 0, length: 7, type: 'bot_command' } ]
//}