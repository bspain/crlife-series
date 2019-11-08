import * as Debug from 'debug';

interface ILOG_MODULE {
    [ key: string ] : string,
    SERVER: string,
    HELPERS: string,
    MODULE_PASSAGES: string,
    MODULE_READINGS: string,
    MODULE_DAILY: string,
    MODULE_CLIENT: string,
    SERVICES_BASE_LOCAL_STORAGE: string,
    SERVICES_DAILYPROVIDER: string,
    SERVICES_DAILYCONTENT_LOCAL_STORAGE: string,
    SERVICES_DAILYCONTENT_AZURE_STORAGE: string,
    SERVICES_NOTES_LOCAL_STORAGE: string,
    SERVICES_PASSAGES_LOCAL_STORAGE: string
}

export const LOG_MODULE : ILOG_MODULE = {
    SERVER: 'app:server',
    HELPERS: 'app:helpers',
    MODULE_PASSAGES: 'app:module:passages',
    MODULE_READINGS: 'app:module:readings',
    MODULE_DAILY: 'app:module:daily',
    MODULE_CLIENT: 'app:module:client',
    SERVICES_BASE_LOCAL_STORAGE: 'app:services:base:localstorage',
    SERVICES_DAILYPROVIDER: 'app:services:dailyprovider',
    SERVICES_DAILYCONTENT_LOCAL_STORAGE: 'app:services:dailycontent:localstorage',
    SERVICES_DAILYCONTENT_AZURE_STORAGE: 'app:services:dailycontent:azurestorage',
    SERVICES_NOTES_LOCAL_STORAGE: 'app:services:notes:localstorage',
    SERVICES_PASSAGES_LOCAL_STORAGE: 'app:services:passages:localstorage'
}

export default class Logger
{
    private _debuggers : Debug.Debugger[];

    constructor() {
        this._debuggers = [];
        for(let key in LOG_MODULE)
        {
            const value = LOG_MODULE[key];
            this._debuggers[<any>value] = Debug(value);
        }        
    }

    debug(module: string, message: string) {
        const _debug = this._debuggers[<any>module];
        _debug(message);
    }

    public get modules() {
        return LOG_MODULE;
    }
}