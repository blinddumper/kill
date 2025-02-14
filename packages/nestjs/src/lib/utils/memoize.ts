let defaultKey = 'default';

// eslint-disable-next-line @typescript-eslint/ban-types
export function memoize(fn: Function) {
    let cache: Record<string, unknown> = {};
    return (...args: any[]) => {
        let n =
            args.reduce((key, arg) => {
                let argToConcat =
                    typeof arg === 'string'
                        ? arg
                        : typeof arg === 'object'
                        ? JSON.stringify(arg)
                        : arg.toString();
                return key.concat('|', argToConcat);
            }, '') || defaultKey;
        if (n in cache) {
            return cache[n];
        }

        let result = n === defaultKey ? fn() : fn(...args);
        cache[n] = result;
        return result;
    };
}
