const User = require('../database/user');
const Notification = require('../database/notification');

exports.sendNotification = async(req, res) => {   
   try {
        // ! Busco el usuario para añadir
        const { email } = req.body;

        const user = await User.findOne({email}, (err) => {
            if(err) {
                res.status(400).send("Error. User does not exist");
                return;
            }
        });

        if(!user) {
            res.status(400).send("Usuario no encontrado");
            return;
        }

        // ! Buscar el usuario que añade
        const user_searcher = await User.findById(req.user.id);

        // ! Genero la notificación
        var notify = new Notification();

        notify.name = user_searcher.name;
        notify.sendTo = user._id.toString();
        notify.sendFrom = user_searcher._id.toString();
        notify.status = false;

        // ! Busco si existe una notificación con el receptor y el emisor ya guardados en la BD
        var notifications = await Notification.findOne({sendTo: user._id, sendFrom: user_searcher._id}, (err) => {
            if(err) return res.status(400).send("Error al obtener las notificaciones");
        });

        // ! Si no hay notificaciones entonces las guardo
        if(!notifications) {
            // ! GUARDO LOS DATOS EN NOTIFICATIONS
            await notify.save();

            // ! USUARIO QUE MANDA
            await User.findByIdAndUpdate(user_searcher._id, {$push: {pendingContacts: user._id}}, {upsert: true, new: true});

            // ! USUARIO QUE RECIBE
            await User.findByIdAndUpdate(user._id, {$push: {notifications: notify._id, pendingContacts: user_searcher._id}}, {upsert: true, new: true});

            res.status(200).send("Notificación enviada satisfactoriamente");

        } else {
            // ! Sino valido que no haya ningun emisor y receptor iguales en la BD
            let alreadySendTo = false;
            let alreadySendFrom = false;

            notifications.sendTo.forEach(sendToId => {
                if(sendToId.toString() === user._id.toString()){
                    alreadySendTo = true;
                }
            });

            notifications.sendFrom.forEach(sendFromId => {
                if(sendFromId.toString() === user_searcher._id.toString()){
                    alreadySendFrom = true;
                }
            });

            // ! Si hay un emisor y receptor iguales entonces tiro un msj status 400
            if(alreadySendFrom === true && alreadySendTo === true){
                return res.status(400).send("Notificacion ya ha sido enviada anteriormente");
            } else {
                // ! GUARDO LOS DATOS EN NOTIFICATIONS
                await notify.save();

                // ! USUARIO QUE MANDA
                await User.findByIdAndUpdate(user_searcher._id, {$push: {pendingContacts: user._id}}, {upsert: true, new: true});

                // ! USUARIO QUE RECIBE
                await User.findByIdAndUpdate(user._id, {$push: {notifications: notify._id, pendingContacts: user_searcher._id}}, {upsert: true, new: true});
        
                res.status(200).send("Notificación enviada satisfactoriamente");
            }
        }
   } catch (error) {
       console.log(error);
       return res.status(500).send("Hubo un error");
   }
}

exports.removePendingContacts = async (req, res) => {
    try {
          // ! Buscar el usuario a eliminar
            const { email } = req.body;
            const user = await User.findOne({email}, (err) => {
                if(err) {
                    res.status(500).send("Error");
                    return;
                }

            });
            
            if(!user) {
                res.status(400).send("Usuario no encontrado");
                return;
            }

            // ! Validar que no sea el mismo usuario
            if(req.user.id == user._id){
                res.status(400).send("Ingrese un usuario válido");
            }

            const user_searcher = await User.findById(req.user.id);
            
            if(user_searcher.pendingContacts.length === 0){
                res.status(400).send("No tienes amigos, añade uno!");
            } else {
            const userRemoved = user_searcher.pendingContacts.filter(
                (item) => {
                    return item.toString() === user._id.toString()
                }
            );

            await User.findByIdAndUpdate(user_searcher._id, {$pull: {pendingContacts: userRemoved.toString()}}, (err) => {
                if(err){
                    return res.status(500).send("No se pudo eliminar el usuario");
                }

                res.status(200).send("Usuario eliminado");
            });

            }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
}
