/**
 * @ruleName document-service
 * @description
 *
 * Instead of the default document object, you should prefer the AngularJS wrapper service $document.
 * [Y180](https://github.com/johnpapa/angular-styleguide#style-y180)
 */
module.exports = function(context) {

    'use strict';

    return {

        'MemberExpression': function(node) {
            if(node.object.name === 'document' || (node.object.name === 'window' && node.property.name === 'document')){
                context.report(node, 'You should use the $document service instead of the default document object', {});
            }
        }
    };

};

module.exports.schema = [
    // JSON Schema for rule options goes here
];