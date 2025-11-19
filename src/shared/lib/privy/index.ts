import { PrivyClient } from "@privy-io/node";

export class Privy {
    private readonly client: PrivyClient;

    constructor(
        private readonly configs: {
            appId: string;
            appSecret: string;
        },
    ) {
        this.client = new PrivyClient({
            appId: this.configs.appId,
            appSecret: this.configs.appSecret,
        });
    }

    async verifyAccessToken(authToken: string) {
        try {
            const result = await this.client
                .utils()
                .auth()
                .verifyAuthToken(authToken);
            return result;
        } catch {
            return null;
        }
    }

    async verifyIdentityToken(identityToken: string) {
        try {
            const result = await this.client
                .utils()
                .auth()
                .verifyIdentityToken(identityToken);
            return result;
        } catch {
            return null;
        }
    }

    async getUser(id: string) {
        const result = await this.client.users()._get(id);
        return result;
    }
}

const privy = new Privy({
    appId: process.env.PRIVY_APP_ID!,
    appSecret: process.env.PRIVY_APP_SECRET!,
});

export default privy;
