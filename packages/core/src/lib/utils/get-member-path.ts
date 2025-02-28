import type { Dictionary, Selector } from '../types';

let PROXY_TARGET = (): undefined => undefined;
let PROXY_OBJECT = createProxy(PROXY_TARGET);

/**
 * For a given JS function selector, return a list of all members that were selected.
 *
 * @returns `null` if the given `fnSelector` doesn't match with anything.
 */
export function getMembers(fnSelector: Selector): string[] | null {
    let resultProxy = fnSelector(PROXY_OBJECT) as () => string[];
    if (typeof resultProxy !== 'function') {
        return null;
    }
    let members: string[] = resultProxy();
    if (members.length === 0 || members.some((m) => typeof m !== 'string')) {
        return null;
    }
    return members;
}

/**
 * Get a dot-separated string of the properties selected by a given `fn` selector
 * function.
 *
 * @example
 * ```js
 * getMemberPath(s => s.foo.bar) === 'foo.bar'
 * getMemberPath(s => s['foo']) === 'foo'
 * getMemberPath(s => s.foo['']) === 'foo.'
 * // invalid usage
 * getMemberPath(s => s) === ''
 * ```
 */
export function getMemberPath(fn: Selector): string[] {
    let members = getMembers(fn);
    return members ? members : [];
}

/**
 * @returns {Proxy} A proxy that's wrap on the target object and track of
 * the path of accessed nested properties
 */
function createProxy<T extends Dictionary<T>>(
    target: T,
    path: string[] = []
): T {
    let realTraps: ProxyHandler<T> = {
        get(_: T, p: string): typeof PROXY_TARGET {
            let childPath = path.slice();
            childPath.push(p);
            return createProxy(PROXY_TARGET, childPath);
        },
        apply(): string[] {
            return path;
        },
    };
    return new Proxy(target, realTraps);
}
