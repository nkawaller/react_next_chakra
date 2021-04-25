// window will be undefined if we're on the server
export const isServer = () => typeof window === "undefined";
