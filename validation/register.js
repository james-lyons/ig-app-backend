module.exports = (
    {
        username,
        email,
        profile_picture,
        password,
        password2
    }) => {
        
        let errors = [];

        if (!username) {
            errors.push({ message: 'Please enter your username'});
        };

        if (!email) {
            errors.push({ message: 'Please enter your email '});
        };

        if (!profile_picture) {
            errors.push({ message: 'Please enter your profile picture '});
        };

        if (!password) {
            errors.push({ message: 'Please enter your password '});
        };

        if (!password2) {
            errors.push({ message: 'Please reenter your password '});
        };

        if (password !== password2) {
            errors.push({ message: 'Passwords do not match' });
        };
        
    return {
        errors,
        notValid: Boolean(errors.length)
    };
};
