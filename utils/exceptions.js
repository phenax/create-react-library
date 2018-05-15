

class InvalidModuleConfigError extends Error {

    constructor(message) {
        super(`Invalid template config. ${message}`);
    }
}

module.exports = {
    InvalidModuleConfigError,
};
