//These are for listing various types of information in a message format

const materials = require("./JSON/materials.json");

const populate = (keys)  => {
	const sortedKeys = Object.values(keys).sort();
	return sortedKeys;
};

const characterList = populate(materials.localization.characters);
const swordList = populate(materials.localization.weapon.sword);
const claymoreList = populate(materials.localization.weapon.claymore);
const polearmList = populate(materials.localization.weapon.polearm);
const bowList = populate(materials.localization.weapon.bow);
const catalystList = populate(materials.localization.weapon.catalyst);
const talentMatList = populate(materials.localization.talent_materials);
const weaponMatList = populate(materials.localization.weapon_materials);

exports.characterList = characterList;
exports.swordList = swordList;
exports.claymoreList = claymoreList;
exports.polearmList = polearmList;
exports.bowList = bowList;
exports.catalystList = catalystList;
exports.talentMatList = talentMatList;
exports.weaponMatList = weaponMatList;