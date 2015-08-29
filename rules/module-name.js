/**
 * @ruleName module-name
 * @description
 *
 * When you create a new module, its name should start with the parameter you can define in your config object.
 * The second parameter can be a Regexp wrapped in quotes.
 * You can not prefix your modules by "ng" (reserved keyword for AngularJS modules) ("module-name":  [2, "ng"])  [Y127](https://github.com/johnpapa/angular-styleguide#style-y127)
 */
module.exports = function(context) {

    'use strict';

    var utils = require('./utils/utils');

    return {

        'CallExpression': function(node) {

            var prefix = context.options[0],
                convertedPrefix; // convert string from JSON .eslintrc to regex

            if(prefix === undefined) {
                return;
            }

            convertedPrefix = utils.convertPrefixToRegex(prefix);

            if (utils.isAngularModuleDeclaration(node)) {
               var name = node.arguments[0].value;

                if(name !== undefined && name.indexOf('ng') === 0){
                    context.report(node, 'The {{module}} module should not start with "ng". This is reserved for AngularJS modules', {
                        module: name
                    });
                } else if(name !== undefined && !convertedPrefix.test(name)){
                    if(typeof prefix === 'string' && !utils.isStringRegexp(prefix)){
                        context.report(node, 'The {{module}} module should be prefixed by {{prefix}}', {
                             module: name,
                             prefix: prefix
                         });
                    } else {
                        context.report(node, 'The {{module}} module should follow this pattern: {{prefix}}', {
                            module: name,
                            prefix: prefix.toString()
                        });
                    }
                }
            }
        }
    };
};