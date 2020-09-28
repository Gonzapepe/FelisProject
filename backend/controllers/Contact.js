const User = require('../database/user');

exports.contacts = async (req,res)=>{
    // ! Buscar el usuario a añadir
    const { email } = req.body;
    const user = await User.findOne({email}, (err) => {
        if(err) {
            res.status(400).send("Error al encontrar el usuario");
            return;
        }
    });
    
    // ! Buscar el usuario que añade
    const user_searcher = await User.findById(req.user.id);

    // ! Validar que no sea el mismo usuario
    if(req.user.id == user._id){
        res.status(400).send("Ingrese un usuario válido");
    }

    // ! Guardar contactos en el array
    user_searcher.contacts.push(user._id);
    user_searcher.save();

    res.status(200).send("Contacto añadido");
}
