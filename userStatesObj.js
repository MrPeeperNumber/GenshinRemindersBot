class States {
	users = {};

	constructor() {};

	deleteState(id) {
		delete this.users[id];
	}
}

class User {

	//Constructor
	constructor(state, time) {
		this.currentState = state;
		this.timeCreated = time;
	}

	//Getters
	get getState() { return this.currentState; }
	get getTime() { return this.timeCreated; }

}

exports.States = States;
exports.User = User;