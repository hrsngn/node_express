'use strict';
const MODEL_NAME = 'User';

class User{
    constructor(name,password){
        this.name = name;
        this.password = password;
    }
}

module.exports = User;