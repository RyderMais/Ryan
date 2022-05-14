const Presets = require("../../presets");
const Moment = require("moment");
const { extendWith } = require("lodash");

function translate(language, _message, _input, _replacements) {

    // SYSTEM TREATMENT
    if (!Presets.language) {
        Presets.language = "en-US";
    }
    if (!Presets.languages[language]) {
        console.log(`[Translate]: Language "${language}" not found.`);
        language = "en-US";
    }
    if (!_input) {
        _input = "";
    }
    if (!_replacements) {
        _replacements = [];
    }
    if (!lang[_message]) {
        console.log(`[Translate]: Message "${_message}" not found.`);
        return _message = "[Translate]: Unknown message key to bypass a translation.";
    }

    // TRANSLATION
    const lang = require(`../../languages/${language}`);
    let message = lang[_message];
    let output = message;

    for (let i = 0; i < _replacements.length; i++) {
        const key = Object.keys(_replacements[i])[0];
        const value = _replacements[i][key];
        output = output.replace(`{[${key}]}`, value);
    }

    return output;
}

export default translate;