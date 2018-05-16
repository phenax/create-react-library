
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const glob = require('glob');
const mustache = require('mustache');
const mkdirp = require('mkdirp');
const {
    compose,
    identity,
    replace,
    toString,
} = require('ramda');

const { PROJECT_ROOT, TEMPLATE_DIRNAME, USER_DIR } = require('./constants');

/*

type Args = {
    boilerplateName :: String
    outDir :: String
    args :: Object<String>
}

type TemplateConfig = {
    ignore :: Regex
    data :: Object<A>
}

type FilePath = String

type TemplateData = Object<A>

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

// getConfig :: String -> A
const getConfig = key => parseArgs()[key];

// isDirectory :: FilePath -> Boolean
const isDirectory = dpath => {
    try {
        return fs.lstatSync(dpath).isDirectory();
    } catch(e) {
        return false;
    }
};

// isFile :: FilePath -> Boolean
const isFile = fpath => {
    try {
        return fs.lstatSync(fpath).isFile();
    } catch(e) {
        return false;
    }
};

// getTemplatePath :: String -> Boolean
const getTemplatePath = templateName => {
    const templatePath =
        path.join(PROJECT_ROOT, 'packages', templateName);
    return isDirectory(templatePath)? templatePath: '';
};

// importModuleConfig :: FilePath -> Function
const importModuleConfig = templatePath => require(templatePath)({
    args: getConfig('args')
});

// joinPathWith :: FilePath -> FilePath -> FilePath
const joinPathWith = p2 => p1 => path.join(p1, p2);

// createFile :: String, FilePath -> _
const createFile = (fileContents, outDir) => {
    mkdirp.sync(path.dirname(outDir));
    fs.writeFileSync(outDir, fileContents);
};

// renderTemplateString :: TemplateData -> String -> _
const renderTemplateString = templateData => content =>
    mustache.render(content, templateData);

// getTemplateFiles -> FilePath -> Array<FilePath>
const getTemplateFiles = templatePath =>
    glob.sync(path.join(templatePath, TEMPLATE_DIRNAME, './**/*'));

// renderTemplateFromFile :: TemplateData -> FilePath -> String
const renderTemplateFromFile = templateData => compose(
    renderTemplateString(templateData),
    toString,
    fs.readFileSync
);

// toOutputTemplatePath :: FilePath -> FilePath -> FilePath
const toOutputTemplatePath = templatePath => replace(
    path.join(templatePath, TEMPLATE_DIRNAME),
    path.join(USER_DIR, getConfig('outDir')),
);


module.exports = {
    log,
    parseArgs,
    getConfig,
    isDirectory,
    isFile,
    getTemplatePath,
    importModuleConfig,
    joinPathWith,
    renderTemplateString,
    createFile,
    getTemplateFiles,
    renderTemplateFromFile,
    toOutputTemplatePath,
};
