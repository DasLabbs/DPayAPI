export const serializeError = (error: unknown): Record<string, unknown> => {
    if (error instanceof Error) {
        return {
            message: error.message,
            name: error.name,
            ...extractErrorStack(error),
        };
    }
    return error as Record<string, unknown>;
};

const extractErrorStack = (error: Error) => {
    const stack = error.stack
        ?.split("\n")[1]
        ?.trim()
        .replace(/[()]/g, "")
        .split("/")
        .at(-1);
    return {
        file: stack?.split(":")[0],
        line: stack?.split(":")[1],
    };
};
