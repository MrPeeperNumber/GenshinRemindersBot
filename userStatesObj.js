class States {
	users = {};

	constructor() {}
}

class User {
	#userID;

	//Constructor
	constructor(id, state, time) {
		this.#userID = id;
		this.currentState = state;
		this.timeCreated = time;
	}

	//Getters
	get getID() 	{ return this.#userID; }
	get getState() { return this.currentState; }
	get getTime() 	{ return this.timeCreated; }

}

exports.States = States;
exports.User = User;