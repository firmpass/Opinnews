module.exports = function (app, db) {
//CRUD

app.get('api/all', function (req, res) {
   db.Userpost.findAll({}).then(function (result) {
      res.json(result); 
   }); 
});

app.post('api/new', function (req, res) {
    db.Userpost.create({
        userName: req.body.userName,
        newPost: req.body.newPost,
        legit: req.body.legit,
        seemslegit: req.body.seemslegit,
        fakeNews: req.body.fakeNews        
    }).then(function (result) {
        res.json(result);
    });    
});

app.put('api/update/;id', function (req, res) {
    db.Userpost.update({
        userName: req.body.userName
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    });
});

app.delete('api/delete/:id', function (req, res) {
    db.Userpost,destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    });
})
}