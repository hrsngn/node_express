'use strict';
const User = require('../models/User');
const CONSTANTA = require('../globals/constanta');
var jwt = require('jsonwebtoken');

class AuthService{
    constructor(){}

    signIn(req){
        return new Promise((resolve,reject)=>{
            //TODO: verify password length,etc

            //TODO: find user in LDAP
            let user = new User(req.body.name,req.body.password);
            //TODO: decrypt user password from DB and change this dummy function
            if(user.password=="Btpn201*" && user.name=='test'){
                var token = jwt.sign({ name: user.name }, CONSTANTA.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                resolve(token);
            }else{
                return reject({message:"Wrong user or password",status:400})
            }
        });
    }

    //TODO: move this function to middleware
    verify(req){
        return new Promise((resolve,reject)=>{
            var token = req.headers['bearer'];
            if (!token) {
                return reject({ message: 'No token provided.',status:400});
            }
            jwt.verify(token, CONSTANTA.secret, function(err, decoded) {
                if (err){
                    // console.log("error mas");
                    return reject({ message: 'Failed to authenticate token.',status:500 });
                }


                //TODO: find user in DB, check roles, etc.

                resolve({decoded : decoded});
            });
        });
    }
}

module.exports = AuthService;