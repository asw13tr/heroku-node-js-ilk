const db = require('../../db');
const bcryptjs = require('bcryptjs');
const mDatas = { layout:'panel/layout' }

// USERS INDEX
module.exports.index = (request, response) => {
    db.connect(function(err){
        db.query("SELECT * FROM users ORDER BY created_at DESC", function(err, result, fields){
            if(err) throw err;
            let datas = {
                title: 'Üye Listesi',
                users: result,
                ...mDatas
            }
            response.render('panel/users/index', datas);

        });
    });
}


// USERS CREATE
module.exports.create = (request, response) => {
    let datas = {
        title: 'Hesap Oluştur',
        ...mDatas
    }
    response.render('panel/users/create', datas);
}

// USERS SAVE
module.exports.save = (request, response) => {
    if(request.method === "POST"){
        db.connect(function(err){
            if(err){ console.log(err); }
            let newUser = {
                username: request.body.username,
                password: bcryptjs.hashSync(request.body.password, 7),
                email: request.body.email,
                fullname: request.body.fullname,
                description: request.body.description,
                status: (request.body.status? request.body.status : 1),
                level: (request.body.level? request.body.level : 1),
            }
            db.query("INSERT INTO users SET ?", newUser, function(error, result, fields){
                if(error)
                    throw error;
                else
                    response.redirect('/aswpanel/users');
            });

        });
    }else{
        response.redirect('/aswpanel/users');
    }
}



// USER EDİT
module.exports.edit = (request, response) => {
    var userID = request.params.id;
    if(!userID){
        response.redirect('/aswpanel/users');
    }else{
        db.connect((err)=>{
            //if(err){ response.send(err); }
            db.query("SELECT * FROM users WHERE id=? LIMIT 1", userID, (err, result, fields)=>{
                if(err) throw err;
                let datas = {user:result[0], ...mDatas};
                response.render('panel/users/edit', datas);
            });
        });
    }
}




// USER UPDATE
module.exports.update = (request, response) => {
    if(request.method === "POST"){
        let userID = request.params.id;
        if(!userID){
            response.redirect('/aswpanel/users');
        }else{
            let updateData = {
                email: request.body.email,
                fullname: (!request.body.fullname? '' : request.body.fullname),
                description: (!request.body.description? '' : request.body.description),
                status: (!request.body.status? 1 : request.body.status),
                level: (!request.body.level? 1 : request.body.level)
            }
            if(request.body.password){
                updateData['password'] = bcryptjs.hashSync(request.body.password, 7);
            }
            db.connect(err => {
                db.query("UPDATE users SET ? WHERE id=?", [updateData, userID], (err, result, fields)=>{
                    response.redirect('/aswpanel/user/edit/'+userID);
                });
            });
        }
    }else{
        response.redirect('/aswpanel/users');
    }
}





// USER DESTROY
module.exports.destroy = (request, response) => {
    if(request.method==="POST"){
        let userID = request.params.id;
        if(!userID){
            response.redirect('/aswpanel/users');
        }else{
            db.connect(err => {
                db.query("DELETE FROM users WHERE id=?", userID, (err, result, fields) => {
                    response.redirect('/aswpanel/users');
                });
            });
        }
    }else{
        response.redirect('/aswpanel/users');
    }
}
