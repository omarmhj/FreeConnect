module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' }

    if (err.message.includes('pseudo'))
        errors.pseudo = "pseudo incorrect or already exists";

    if (err.message.includes('email'))
        errors.email = "Email incorrect";

    if (err.message.includes('password'))
        errors.password = "password must contain minimum 6 character";

    if (err.code == 1100 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "this pseudo already exist";

    if (err.code == 1100 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "this email already exist";

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email"))
        errors.email = "Email inconnu";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe ne correspond pas"

    return errors
}

module.exports.uploadErrors = (err) => {
    let errors = { format:'', maxSize: ""};

    if (err.message.includes('invalid file'))
    errors.format = "Format incompatible";

    if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

    return errors
}