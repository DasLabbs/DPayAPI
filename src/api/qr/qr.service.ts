import {
    CountryCode,
    CurrencyCode,
    MerchantCategoryCode,
} from "@shared/constant/qr";
import { BaseService } from "@shared/lib/base/service";
import { RequestContext } from "@shared/lib/context";
import { BadRequestError } from "@shared/lib/http/httpError";
import EmvQr from "steplix-emv-qrcps";

import { GenerateQRDto } from "./qr.dto";

export class QRService extends BaseService {
    private getCurrencyCode(currency: string) {
        return (
            CurrencyCode[currency.toUpperCase() as keyof typeof CurrencyCode] ??
            "704"
        );
    }

    private getDefaultMerchantInfo() {
        return {
            merchantName: "Daslabs",
            merchantCity: "Ho Chi Minh City",
            postalCode: "70000",
            countryCode: CountryCode.VN,
            merchantCategoryCode: MerchantCategoryCode.GENERAL,
        };
    }

    async generateQR(_: RequestContext, dto: GenerateQRDto) {
        const emvQr = EmvQr.Merchant.buildEMVQR();

        const merchantInfo = this.getDefaultMerchantInfo();
        const currencyCode = this.getCurrencyCode(dto.currency);

        emvQr.setMerchantName(merchantInfo.merchantName);
        emvQr.setMerchantCity(merchantInfo.merchantCity);
        emvQr.setPostalCode(merchantInfo.postalCode);
        emvQr.setCountryCode(merchantInfo.countryCode);
        emvQr.setMerchantCategoryCode(merchantInfo.merchantCategoryCode);
        emvQr.setTransactionCurrency(currencyCode);
        emvQr.setTransactionAmount(dto.amount.toString());

        const mai = EmvQr.Merchant.buildMerchantAccountInformation();

        mai.setGloballyUniqueIdentifier("A000000727");
        mai.addPaymentNetworkSpecific("01", "000697041801103143964403");
        mai.addPaymentNetworkSpecific("02", "QRIBFTTA");

        emvQr.addMerchantAccountInformation("38", mai);
        return emvQr.generatePayload();
    }

    async parseQRPayload(payload: string) {
        const emvQr = EmvQr.Merchant.Parser.toEMVQR(payload);
        if (!emvQr.validate()) throw new BadRequestError("Invalid QR payload");

        const parsedData = emvQr.rawData().split("\n");
        const amount = parsedData
            .find((data) => data.startsWith("58"))!
            .split(" ")
            .at(-1)!;
        const currency = parsedData
            .find((data) => data.startsWith("59"))!
            .split(" ")
            .at(-1)!;

        return {
            amount,
            currency,
        };
    }
}

const qrService = new QRService();
export default qrService;
