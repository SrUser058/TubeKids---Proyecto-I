
const Father = require('../models/father');

// Insertar un nuevo usuario principal en la BD
const postFather = async (req, res) => {
    let father = new Father();

    //Pasar los datos del request al modelo
    father.name = req.body.name;
    father.lastname = req.body.lastname;
    father.nickname = req.body.nickname;
    father.email = req.body.email;
    father.age = req.body.age;
    father.password = req.body.password;
    father.pin = req.body.pin;
    father.country = req.body.country;
    father.birthdate = req.body.birthdate;
    father.avatar = req.body.avatar;

    // Validar que los datos no sean null
    if (father.name && father.nickname && father.lastname && father.email && father.password && father.age && father.pin && father.name && father.country && father.birthdate) {
        await father.save()
            .then(data => {
                res.status(201);
                res.header({ 'location': `/api/father/?id=${data.id}` });
            })
            .catch(error => {
                res.status(422);
                console.log('Server error while saving the new account', error);
                res.json({ errorSend: 422 });
            });
    } else {
        res.status(422);
        console.log('Data error while saving the new account');
        res.json({ errorSend: 422 });
    }
};

const getAllFather = (req,res) => {
    if(req.body.user && req.body.password){
        Father.find()
        .then(fathers => {
            for(let x = 0; x <= fathers.length; x++){
                if(fathers[x].nickname === req.body.user && fathers[x].password === req.body.password) {
                    res.status(202);
                    res.send({verification:true});
                }
            };
        })
        .catch(err => {
            res.status(404);
            console.log('Internal error while search the data',err);
            res.send({error:'Intentelo de nuevo mas tarde'});
        })
    } else {
        res.status(404);
        console.log('Imposible encontrar el usuario ', err);
        res.send({error:404});
    }
};

// Obtener los datos del usuario principal de la BD
const getFather = (req, res) => {
    if (req.params && req.params.id) {
        Father.findById(req.params.id)
            .then((father) => {
                res.json(father);
            })
            .catch(err => {
                res.status(404);
                console.log('Server error obtain the user', err)
                res.json({ error: "The user doesnt exist" })
            });
    } else {
        res.status(404);
        console.log('Internal error with the user data');
        res.json({ error: 404 })
    };
}

// Actualizar los datos de un usuario
const patchFather = (req, res) => {
    //Buscar el usuario en la BD
    if (req.params && req.params.id) {
        Father.findById(req.params.id, async (error, father) => {
            if (err) {
                res.status(404);
                console.log('Error while search the user to patch', err);
                res.json({ error: 404 })
            }
            await Father.findByIdAndUpdate(req.params.id, father)
                .then(answer => {
                    res.send(answer);
                })
                .catch(err => {
                    res.status(422);
                    console.log('Error update the user');
                    res.json({ error:422});
                });
            father.save((err) => {
                if(err){
                    res.status(422);
                    console.log('Server error while saving the user updates',err);
                    res.json({error:422});
                }
                res.status(200);
                res.json(father);
            })
        });
    } else {
        res.status(404);
        console.log('Internal error with the data');
        res.json({error:404});
    };
};

// Eliminar los datos de un usuario
const deleteFather = async (req,res) => {
    if(req.params && req.params.id){
        await Father.findByIdAndDelete({_id:req.params.id})
        .then(answer => {
            res.send(answer);
        })
        .catch(err=>{
            res.status(422);
            console.log('Error on delete the major',err);
            res.json({ error:422});
        });
    };
};

module.exports = {getFather, postFather, patchFather, deleteFather, getAllFather};