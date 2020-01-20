const path = require('path');
module.exports.path = path;

module.exports.requireController = (controllerFile='') => {
    return require(path.join(__dirname, 'controllers/'+controllerFile));
}

module.exports.requireModel = (modelName='') => {
    return require(path.join(__dirname, 'models/'+modelName));
}
