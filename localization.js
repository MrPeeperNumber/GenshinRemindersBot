//These are for listing various information in the Telegram keyboard in pairs

const localize = require("./JSON/localization.json");

const verticalize = (keys) => {
	const tempArr = [];
	const sortedKeys = Object.values(keys).sort();

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

// const vertKeyboardArray = verticalize();
const characterLocal = verticalize(localize.characters);
const talentLocal = verticalize(localize.talent_materials);
const swordLocal = verticalize(localize.weapon.sword);
const claymoreLocal = verticalize(localize.weapon.claymore);
const polearmLocal = verticalize(localize.weapon.polearm);
const bowLocal = verticalize(localize.weapon.bow);
const catalystLocal = verticalize(localize.weapon.catalyst);
const weaponMatLocal = verticalize(localize.weapon_materials);

exports.localize = localize;
exports.characterLocal = characterLocal;
exports.talentLocal = talentLocal;
exports.swordLocal = swordLocal;
exports.claymoreLocal = claymoreLocal;
exports.polearmLocal = polearmLocal;
exports.bowLocal = bowLocal;
exports.catalystLocal = catalystLocal;
exports.weaponMatLocal = weaponMatLocal;
exports.verticalize = verticalize;