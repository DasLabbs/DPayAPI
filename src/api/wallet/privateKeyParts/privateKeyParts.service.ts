import { PrivateKeyPart } from "@domain/entity";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";
import { combine, split } from "shamir-secret-sharing";

import {
    CombinePrivateKeyPartsDto,
    GeneratePrivateKeyPartsDto,
} from "./privateKeyParts.dto";

export class PrivateKeyPartsService extends BaseService {
    private readonly PRIVATE_KEY_PARTS_COUNT = 3;
    private readonly PRIVATE_KEY_THRESHOLD = 2;

    private toUint8Array(data: string): Uint8Array {
        return new TextEncoder().encode(data);
    }

    private toBase64(data: Uint8Array): string {
        return Buffer.from(data).toString("base64");
    }

    private fromBase64(base64: string): Uint8Array {
        const buffer = Buffer.from(base64, "base64");
        return Uint8Array.from(buffer);
    }

    private async shamirSecretSharing(
        privateKey: string,
        partsCount = this.PRIVATE_KEY_PARTS_COUNT,
        threshold = this.PRIVATE_KEY_THRESHOLD,
    ) {
        try {
            return await split(
                this.toUint8Array(privateKey),
                partsCount,
                threshold,
            );
        } catch (error) {
            console.error(error);
            throw new BadRequestError("Failed to generate private key parts");
        }
    }

    async generatePrivateKeyParts(
        context: RequestContext,
        dto: GeneratePrivateKeyPartsDto,
    ): Promise<PrivateKeyPart[]> {
        const { privateKey, userId } = dto;
        const shares = await this.shamirSecretSharing(privateKey);
        const privateKeyParts = await this.repos.privateKeyPart.create(
            context,
            shares.map((share, index) => ({
                userId,
                partId: index + 1,
                privateKey: this.toBase64(share),
            })),
        );
        return privateKeyParts as PrivateKeyPart[];
    }

    async combinePrivateKeyParts(
        dto: CombinePrivateKeyPartsDto,
    ): Promise<string> {
        const uint8Pk = await combine(
            dto.parts.map((part) => this.fromBase64(part)),
        );
        return new TextDecoder().decode(uint8Pk);
    }
}

const privateKeyPartsService = new PrivateKeyPartsService();
export default privateKeyPartsService;
