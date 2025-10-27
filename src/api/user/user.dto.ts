export type UserSignUpDto = {
    username: string;
    password: string;
    isInitWallet: boolean;
};

export type UserSignInDto = {
    username: string;
    password: string;
};
