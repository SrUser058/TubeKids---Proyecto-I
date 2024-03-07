
const Childs = require('../models/childs.js');

// Insertar un nuevo usuario principal en la BD
const postChilds = async (req, res) => {
    let childs = new Childs();

    //Pasar los datos del request al modelo
    childs.name = req.body.name;
    childs.age = req.body.age;
    childs.pin = req.body.pin;
    childs.father = req.body.father;
    childs.playlist = req.body.playlist;
    childs.avatar = req.body.avatar;

    // Validar que los datos no sean null
    if (childs.name && childs.age && childs.pin && childs.father) {
        await childs.save()
            .then(data => {
                res.status(201);
                res.header({ 'location': `/api/kids/?id=${data.id}` });
            })
            .catch(error => {
                res.status(422);
                console.log('Server error while saving the kids account', error);
                res.json({ errorSend: 422 });
            });
    } else {
        res.status(422);
        console.log('Data error while saving the kids account');
        res.json({ errorSend: 422 });
    }
};

// Obtener los datos del usuario principal de la BD
const getChilds = (req, res) => {
    if (req.params && req.params.id) {
        Childs.findById(req.params.id)
            .then((childs) => {
                res.json(childs);
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
};

// Actualizar los datos de un usuario
const patchChilds = async (req, res) => {
    //Buscar el usuario en la BD
    if (req.params && req.params.id) {
        await Childs.findByIdAndUpdate(req.params.id, childs)
            .then(answer => {
                res.send(answer);
            })
            .catch(err => {
                res.status(422);
                console.log('Error update the user', err);
                res.json({ error: 422 });
            });
    } else {
        res.status(404);
        console.log('Internal error with the data');
        res.json({ error: 404 });
    };
};

// Eliminar los datos de un usuario
const deleteChilds = async (req, res) => {
    if (req.params && req.params.id) {
        await Childs.findByIdAndDelete({ _id: req.params.id })
            .then(answer => {
                res.send(answer);
            })
            .catch(err => {
                res.status(422);
                console.log('Error on delete the user', err);
                res.json({ error: 422 });
            });
    } else {
        res.status(422);
        console.log('No data to delete the user', err);
        res.json({ error: 422 });
    };
};

module.exports = { getChilds, postChilds, patchChilds, deleteChilds };
