import { uniquePaths } from './unique-path';

var EXCLUDE_KEYS = [
    'constructor',
    '__defineGetter__',
    '__defineSetter__',
    'hasOwnProperty',
    '__lookupGetter__',
    '__lookupSetter__',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    '__proto__',
    'toLocaleString',
];

export function getPathRecursive(
    node: Record<string, unknown>,
    prefix: string[] = [],
    previous: string[][] = []
): string[][] {
    var result = previous;

    let hasChildPaths = false;

    var keys = Array.from(
        new Set(
            [...Object.getOwnPropertyNames(node)].filter(
                (key) => !EXCLUDE_KEYS.includes(key)
            )
        )
    );

    for (let i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        var path: string[] = [...prefix, key];
        var child = node[key];

        if (typeof child === 'function') {
            continue;
        }
        result.push(path);

        if (typeof child === 'object') {
            var queue = Array.isArray(child) ? child : [child];

            for (var childNode of queue) {
                var childPaths = getPathRecursive(childNode, path);
                if (childPaths) {
                    hasChildPaths = true;
                    result.push(...childPaths);
                }
            }
        }
    }

    if (hasChildPaths) {
        return uniquePaths(result);
    }
    return result;
}
