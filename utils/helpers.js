
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const { PROJECT_ROOT } = require('./constants');

/*

type Args = {
    boilerplateName :: String
    outDir :: String
    args :: Object<String>
}

type TemplateConfig = {
    templateDirGlob :: String
    data :: Object<A>
}

*/

// log :: String -> A -> A
const log = name => data => {
    console.log(name, data);
    return data;
};

// parseArgs :: () -> Args
const parseArgs = () => {
    const { _: [ boilerplateName ], o: outDir, ...args } = yargs.argv;
    return { boilerplateName, outDir, args };
};

// getConfig :: String -> String
const getConfig = key => parseArgs()[key];

// isDirectory :: String -> Boolean
const isDirectory = dpath => {
    try {
        return fs.lstatSync(dpath).isDirectory();
    } catch(e) {
        return false;
    }
};

// isFile :: String -> Boolean
const isFile = fpath => {
    try {
        return fs.lstatSync(fpath).isFile();
    } catch(e) {
        return false;
    }
};

// getTemplatePath :: String -> Either<String>
const getTemplatePath = templateName => {

    let templatePath =
        path.join(PROJECT_ROOT, 'packages', templateName);

    return isDirectory(templatePath)? templatePath: '';
};

// importModule :: String -> Function
const importModule = require;

// joinPathWith :: String -> String -> String
const joinPathWith = p2 => p1 => path.join(p1, p2);


module.exports = {
    log,
    parseArgs,
    getConfig,
    isDirectory,
    isFile,
    getTemplatePath,
    importModule,
    joinPathWith,
};
