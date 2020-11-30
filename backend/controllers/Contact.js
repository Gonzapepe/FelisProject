const { User } = require('../database/user');


// * PENDING CONTACTS
exports.pendingContacts = async(req, res) => {
    try {
        const  { id } = req.params;


        const pendingContacts = await User.findById(id, (err, user) => {
            const getPendingContacts = user.pendingContacts;

            if(err) {
                return res.status(400).send("Hubo un error al obetner los contactos");
            }

            getPendingContacts.forEach(async userId => {
                console.log(userId);

                const pendingUser = await User.findById(userId, (err, user) => {
                    if(err) {
                        return res.status(400).send("Hubo un error al obetner el usuario");
                    }
                    console.log(user);
                });
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en el servidor");
    }
}



exports.sendFriendRequest = async(req, res) => {   
    try {
       const { email } = req.body;
       const { id } = req.user;

       // ! Verificación
       if(!email) return res.status(400).send("Ingrese un email");

       // * Mandar solicitud al usuario
        // * Buscar el usuario para añadir
        const user = await User.findOne({email}, (err) => {
            if(err) return res.status(400).send("Error al buscar el usuario");
        });

        if(!user) return res.status(400).send("No existe el usuario en cuestión.");
        
        // * Buscar usuario solicitante
        const userAdder = await User.findById(id, (err) => {
            if(err) return res.status(400).send("Error al buscar al usuario solicitante");
        });

        if(!userAdder) return res.status(400).send("No hay usuario solicitante");

        // * Validacion que no sea el mismo usuario
        if(user._id.toString() === userAdder._id.toString()) return res.status(400).send("No puede agregarse asi mismo");

        // * Una vez aceptado como amigo no se puede mandar solicitud de nuevo
        let isFriend = false;

        userAdder.contacts.forEach(userId => {
            if(userId.toString() === user._id.toString()) {
                isFriend = true;
            }
        });

        if(isFriend === true) {
            return res.status(400).send("Este usuario ya es tu amigo");
        } else {

        // * Agregar el usuario como contacto pendiente
        if(userAdder.pendingContacts.length === 0) {
            // * Usuario al que se añade
            await User.findByIdAndUpdate(user._id, {$push: {pendingContacts: userAdder._id.toString()}}, {upsert: true, new: true});

            // * Usuario que añade
            await User.findByIdAndUpdate(userAdder._id, {$push: {pendingContacts: user._id.toString()}}, {upsert: true, new: true});

            res.status(200).send("Solicitud enviada satisfactoriamente");
        } else {
            let alreadySended = false;

            userAdder.pendingContacts.forEach(userId => {
                if(userId.toString() === user._id.toString()) 
                alreadySended = true;
            });

            if(alreadySended === true) {
                return res.status(400).send("Este usuario ya fue añadido");
            } else {
                // * Usuario al que se añade
                await User.findByIdAndUpdate(user._id, {$push: {pendingContacts: userAdder._id.toString()}}, {upsert: true, new: true});

                // * Usuario que añade
                await User.findByIdAndUpdate(userAdder._id, {$push: {pendingContacts: user._id.toString()}}, {upsert: true, new: true});

                res.status(200).send("Solicitud enviada satisfactoriamente");
            }
        }
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
}


exports.acceptFriend = async(req,res) => {
    try {
        const { id } = req.params;
        
        // * Aceptar solicitud de amistad
            // * Buscar usuario que acepta
            const userAccepter = await User.findById(req.user.id, (err) => {
                if(err) return res.status(400).send("Error al buscar el usuario");
            });

            if(!userAccepter) return res.status(400).send("No existe el usuario correspondiente");

            // * Buscar el usuario aceptado
            const userAccepted = await User.findById(id, (err) => {
                if(err) return res.status(400).send("Error al buscar el usuario");
            });

            if(!userAccepted) return res.status(400).send("No existe el usuario correspondiente");

            if(userAccepter.contacts.length === 0){
                // * Usuario que acepta
                await User.findByIdAndUpdate(userAccepter._id, {$push: {contacts: userAccepted._id.toString()}, $pull: {pendingContacts: userAccepted._id.toString()}}, {upsert: true, new: true});

                // * Usuario que es aceptado
                await User.findByIdAndUpdate(userAccepted._id, {$push: {contacts: userAccepter._id.toString()}, $pull: {pendingContacts: userAccepter._id.toString()}}, {upsert: true, new: true});

                res.status(200).send("Usuario aceptado satisfactoriamente");
            } else {
                let alreadyAccepted = false;

                userAccepter.contacts.forEach(userId => {
                    if(userId.toString() === userAccepted._id.toString())
                        alreadyAccepted = true;
                });

                if(alreadyAccepted === true) {
                    return res.status(400).send("Usuario anteriormente aceptado");
                } else {
                    // * Usuario que acepta
                    await User.findByIdAndUpdate(userAccepter._id, {$push: {contacts: userAccepted._id.toString()}, $pull: {pendingContacts: userAccepted._id.toString()}}, {upsert: true, new: true});

                    // * Usuario que es aceptado
                    await User.findByIdAndUpdate(userAccepted._id, {$push: {contacts: userAccepter._id.toString()}, $pull: {pendingContacts: userAccepter._id.toString()}}, {upsert: true, new: true});

                    res.status(200).send("Usuario aceptado satisfactoriamente");
                }
            }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error en el servidor");
    }
}

exports.declineFriend = async(req, res) => {
    try {
        const { id } = req.params;
        
        // * Declinar solicitud de amistad
            // * Buscar usuario que declina
            const userDecliner = await User.findById(req.user.id, (err) => {
                if(err) return res.status(400).send("Error al buscar el usuario");
            });

            if(!userDecliner) return res.status(400).send("No existe el usuario correspondiente");

            // * Buscar el usuario declinado
            const userDeclined = await User.findById(id, (err) => {
                if(err) return res.status(400).send("Error al buscar el usuario");
            });

            if(!userDeclined) return res.status(400).send("No existe el usuario correspondiente");

            let declined = false;
        
            userDecliner.pendingContacts.filter(userId => {
                if(userId.toString() === userDeclined._id.toString())
                    declined = true
            });

            userDeclined.pendingContacts.filter(userId => {
                if(userId.toString() === userDecliner._id.toString())
                    declined = true
            });

            if(declined === true) {
                // * Usuario que declina
                await User.findByIdAndUpdate(req.user.id, {$pull: {pendingContacts: userDeclined._id.toString()}});
                
                // * Usuario declinado
                await User.findByIdAndUpdate(id, {$pull: {pendingContacts: userDecliner._id.toString()}});

                res.status(200).send("Usuario declinado satisfactoriamente");
            }

    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error en el servidor");
    }
}

// * Already FRIEND
exports.deleteFriend = async (req, res) => {
    try {
        // * ID del usuario a eliminar
        const { id } = req.params;
        
        // * Eliminar contacto
            // * Buscar usuario que elimina
            const userDeleter = await User.findById(req.user.id, (err) => {
                if(err) return res.status(400).send("Error al buscar el usuario");
            });

            if(!userDeleter) return res.status(400).send("No existe el usuario correspondiente");

            // * Buscar el usuario es eliminado
            const userDeleted = await User.findById(id, (err) => {
                if(err) return res.status(400).send("Error al buscar el usuario");
            });

            if(!userDeleted) return res.status(400).send("No existe el usuario correspondiente");

            // * Eliminar usuario
            let deleteUser = false;
        
            userDeleter.contacts.filter(userId => {
                if(userId.toString() === userDeleted._id.toString())
                    deleteUser = true
            });

            userDeleted.contacts.filter(userId => {
                if(userId.toString() === userDeleter._id.toString())
                    deleteUser = true
            });

            if(deleteUser === true) {
                // * Usuario que declina
                await User.findByIdAndUpdate(req.user.id, {$pull: {contacts: userDeleted._id.toString()}});
                
                // * Usuario declinado
                await User.findByIdAndUpdate(id, {$pull: {contacts: userDeleter._id.toString()}});

                res.status(200).send("Contacto eliminado satisfactoriamente");
            }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
}