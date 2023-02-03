//These are for listing various information in the Telegram keyboard in pairs

const materials = require("./JSON/materials.json");

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
const characterLocal = verticalize(materials.localization.characters);
const talentLocal = verticalize(materials.localization.talent_materials);
const swordLocal = verticalize(materials.localization.weapon.sword);
const claymoreLocal = verticalize(materials.localization.weapon.claymore);
const polearmLocal = verticalize(materials.localization.weapon.polearm);
const bowLocal = verticalize(materials.localization.weapon.bow);
const catalystLocal = verticalize(materials.localization.weapon.catalyst);
const weaponMatLocal = verticalize(materials.localization.weapon_materials);

exports.characterLocal = characterLocal;
exports.talentLocal = talentLocal;
exports.swordLocal = swordLocal;
exports.claymoreLocal = claymoreLocal;
exports.polearmLocal = polearmLocal;
exports.bowLocal = bowLocal;
exports.catalystLocal = catalystLocal;
exports.weaponMatLocal = weaponMatLocal;