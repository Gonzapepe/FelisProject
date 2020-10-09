const User = require('../database/user');

exports.contacts = async (req,res)=>{
    // ! Buscar el usuario a añadir
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

    // ! Si los contactos son ===  cero
    if(user_searcher.contacts.length === 0){
        await User.findByIdAndUpdate(req.user.id, {$push: {contacts: user._id}}, {upsert: true, new: true});
        res.status(200).send("Contacto añadido");
    } else {
        // ! Sino valida
        let duplicated = false;

        user_searcher.contacts.forEach(userId => {
            const user_Id = userId.toString();
            const userToString = user._id.toString();


            if(user_Id == userToString) {
                duplicated = true;    
            }
        });

        if(!duplicated){
            await User.findByIdAndUpdate(req.user.id, {$push: {contacts: user._id}}, {upsert: true, new: true});
            res.status(200).send("Contacto añadido");
        } else {
            res.status(400).send("Error");
            return;
        }
    }
}

exports.delete = async (req, res) => {

}
