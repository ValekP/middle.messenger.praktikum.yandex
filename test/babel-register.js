require("ignore-styles")
const {JSDOM} = require("jsdom")
const register = require("@babel/register").default
register({extensions: [".ts", ".tsx", ".js", ".jsx"]})

global.window = new JSDOM(`<!DOCTYPE html><main id="root"></main>`,
    {
        url: 'http://localhost/',
    }
).window
global.document = window.document
global.HTMLElement = window.HTMLElement


