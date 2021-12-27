const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const VotePost = require('../models/VotePostModel.js');
const Comment = require('../models/CommentModel.js');
const VoteComment = require('../models/VoteCommentModel.js');

const bcrypt = require('bcryptjs');
const saltRounds = 10;


const userController = {

    checkUserExistence: function(req, res) {
        if(req.body.querytype == 'login') {

            db.findOne(User, { email: req.body.email }, {}, function(result) {

                if(result) {
                    bcrypt.compare(req.body.password, result.password, function(err, equal) {
                        if(equal) {

                            req.session.logged = true;
                            req.session.userid = result.userid;
                            req.session.username = result.username;
                            req.session.email = result.email;
                            req.session.profileimg = result.profileimg;

                            res.send( result );

                        } else {
                            errMessage = {
                                error: 'wrong password'
                            }
                            //console.log( 'wrong password' );
                            res.send( errMessage ); //send nothing lmao
                        }
                    });
                } else {
                    errMessage = {
                        error: 'email does not exist in database'
                    }
                    // console.log( 'user tried to log in with non-existent email' );
                    res.send( errMessage ); //send nothing lmao
                }
                
            });
        } else if (req.body.querytype == 'signup') {
            var entry = {
                username: req.body.username,
            }
            db.findOne(User, entry, {}, function(result) {
                if(result == null) {
                    entry = {
                        email: req.body.email
                    }
                    db.findOne(User, entry, {}, function(result) {
                        res.send(result);
                    });
                } else {
                    res.send(result);
                }
            });
        }
    },

    createUser: function(req, res) {
        db.findMany(User, {}, {}, { sort: {userid: -1} }, function(result) {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            var entry = {
                userid: result[0].userid + 1,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                datecreated: Date.now(),
                profileimg: '1Kz2WwLDLgigjQXk2AzcrRV0Ohm6VuWO9',
                bio: 'e m p t y   b i o   :(',
            }
            db.insertOne(User, entry, function(flag){
                req.session.logged = true;
                req.session.userid = entry.userid;
                req.session.username = entry.username;
                req.session.email = entry.email;
                req.session.profileimg = entry.profileimg;
                res.send(entry);
            });
        });

            
            
        });

    },

    updateSettings: function(req, res) {

        if(!req.body.username=='') {
            var newusername = req.body.username;

            db.updateOne(User, { userid: req.session.userid }, {$set: {username: newusername}}, function(result) {
                console.log('User database: ' + result);
            }); 
            db.updateMany(Post, { ownerid: req.session.userid }, {$set: {ownerusername: newusername}}, function(result) {
                console.log('Post database: ' + result);
            });
            db.updateMany(Comment, { ownerid: req.session.userid }, {$set: {ownerusername: newusername}}, function(result) {
                console.log('Comment database: ' + result);
            });
            db.updateMany(VotePost, { voteowner: req.session.username }, {$set: {voteowner: newusername}}, function(result) {
                console.log('VotePost database: ' + result);
            });
            db.updateMany(VoteComment, { voteowner: req.session.username }, {$set: {voteowner: newusername}}, function(result) {
                console.log('VoteComment update: ' + result);
            });
            req.session.username = newusername;
            res.send(req.session.username);
        }

        if(!req.body.email=='') {
            var newemail = req.body.email;

            db.updateOne(User, { userid: req.session.userid }, {$set: {email: newemail}}, function(result) {
                console.log('User database: ' + result);
            }); 
            req.session.email = newemail;
        }

        if(!req.body.password=='') {
            var newpassword = req.body.password;
            bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                db.updateOne(User, { userid: req.session.userid }, {$set: {password: hash}}, function(result) {
                    console.log('User database: ' + result);
                });
            });
        }

        if(!req.body.bio=='') {
            var newbio = req.body.bio;

            db.updateOne(User, { userid: req.session.userid }, {$set: {bio: newbio}}, function(result) {
                console.log('User database: ' + result);
            }); 
        }

        if(!req.body.profileimg=='') {
            var newprofileimg = req.body.profileimg;

            db.updateOne(User, { userid: req.session.userid }, {$set: {profileimg: newprofileimg}}, function(result) {
                console.log('User database: ' + result);
            });
            db.updateMany(Post, { ownerid: req.session.userid }, {$set: {profileimg: newprofileimg}}, function(result) {
                console.log('Post database: ' + result);
            });
            req.session.profileimg = newprofileimg;
            res.send(req.session.profileimg);
        }

        res.send(req.session);
    },

    logOut: function(req, res) {
        req.session.destroy(function(err) {
            if(err) throw err;
        });
    },

    deleteAccount: function(req, res) {
        let sess = req.session;
        db.deleteOne(User, { userid: req.session.userid }, function(result) {
            db.deleteMany(Comment, { ownerid: req.session.userid }, function(flag) {
                db.deleteMany(Post, { ownerid: req.session.userid }, function(flag) {
                    db.deleteMany(VoteComment, { voteowner: req.session.username }, function(flag) {
                        db.deleteMany(VotePost, { voteowner: req.session.username }, function(flag) {
                            res.send(flag);
                            req.session.destroy(function(err) {
                                if(err) throw err;
                            });
                        });
                    });
                });
            });
        });
    }

}

module.exports = userController;