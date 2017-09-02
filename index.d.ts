interface Promise<T> {
    do(fn: (val: T) => any): Promise<T>;
}
