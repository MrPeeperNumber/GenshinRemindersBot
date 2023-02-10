//These are for listing various types of information in a message format

const localize = require ("./JSON/localization.json");

const populate = (keys)  => {
	const sortedKeys = Object.values(keys).sort();
	return sortedKeys;
};

const characterList = populate(localize.characters);
const swordList = populate(localize.weapon.sword);
const claymoreList = populate(localize.weapon.claymore);
const polearmList = populate(localize.weapon.polearm);
const bowList = populate(localize.weapon.bow);
const catalystList = populate(localize.weapon.catalyst);
const talentMatList = populate(localize.talent_materials);
const weaponMatList = populate(localize.weapon_materials);

exports.characterList = characterList;
exports.swordList = swordList;
exports.claymoreList = claymoreList;
exports.polearmList = polearmList;
exports.bowList = bowList;
exports.catalystList = catalystList;
exports.talentMatList = talentMatList;
exports.weaponMatList = weaponMatList;