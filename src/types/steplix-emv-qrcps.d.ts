/**
 * Type definitions for steplix-emv-qrcps
 * Library for generating QRCode in EMV specification format
 */

// ============================================================================
// Common Types
// ============================================================================

export type DataType = "binary" | "raw";

export interface TLVObject {
    dataWithType(dataType: DataType, indent: string): string;
    toString(): string;
}

// ============================================================================
// Merchant Types
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MerchantTLV extends TLVObject {}

export interface MerchantUnreservedTemplate {
    dataWithType(dataType: DataType, indent: string): string;
    toString(): string;
    setGloballyUniqueIdentifier(v: string): void;
    addContextSpecificData(id: string, v: string): void;
}

export interface MerchantPaymentSystemSpecific {
    dataWithType(dataType: DataType, indent: string): string;
    toString(): string;
    setGloballyUniqueIdentifier(v: string): void;
    addPaymentSystemSpecific(id: string, v: string): void;
}

export interface MerchantAccountInformation {
    dataWithType(dataType: DataType, indent: string): string;
    toString(): string;
    setGloballyUniqueIdentifier(v: string): void;
    addPaymentNetworkSpecific(id: string, v: string): void;
}

export interface MerchantInformationLanguageTemplate {
    dataWithType(dataType: DataType, indent: string): string;
    toString(): string;
    validate(): boolean;
    setLanguagePreference(v: string): void;
    setMerchantName(v: string): void;
    setMerchantCity(v: string): void;
    addRFUforEMVCo(id: string, v: string): void;
}

export interface MerchantAdditionalDataFieldTemplate {
    dataWithType(dataType: DataType, indent: string): string;
    toString(): string;
    setBillNumber(v: string): void;
    setMobileNumber(v: string): void;
    setStoreLabel(v: string): void;
    setLoyaltyNumber(v: string): void;
    setReferenceLabel(v: string): void;
    setCustomerLabel(v: string): void;
    setTerminalLabel(v: string): void;
    setPurposeTransaction(v: string): void;
    setAdditionalConsumerDataRequest(v: string): void;
    addRFUforEMVCo(id: string, v: string): void;
    addPaymentSystemSpecific(
        id: string,
        v: MerchantPaymentSystemSpecific,
    ): void;
}

export interface MerchantEMVQR {
    dataWithType(dataType: DataType): string;
    toBinary(): string;
    rawData(): string;
    generatePayload(): string;
    validate(): boolean;
    setPayloadFormatIndicator(v: string): void;
    setPointOfInitiationMethod(v: string): void;
    setMerchantCategoryCode(v: string): void;
    setTransactionCurrency(v: string): void;
    setTransactionAmount(v: string): void;
    setTipOrConvenienceIndicator(v: string): void;
    setValueOfConvenienceFeeFixed(v: string): void;
    setValueOfConvenienceFeePercentage(v: string): void;
    setCountryCode(v: string): void;
    setMerchantName(v: string): void;
    setMerchantCity(v: string): void;
    setPostalCode(v: string): void;
    setCRC(v: string): void;
    setAdditionalDataFieldTemplate(
        v: MerchantAdditionalDataFieldTemplate,
    ): void;
    setMerchantInformationLanguageTemplate(
        v: MerchantInformationLanguageTemplate,
    ): void;
    addMerchantAccountInformation(
        id: string,
        v: MerchantAccountInformation,
    ): void;
    addUnreservedTemplates(id: string, v: MerchantUnreservedTemplate): void;
    addRFUforEMVCo(id: string, v: string): void;
}

export interface MerchantParser {
    toEMVQR(qrcodeValue: string): MerchantEMVQR;
}

// Merchant Builder Functions
export type MerchantTLVBuilder = (
    tag: string,
    length: string | number,
    value: string,
) => MerchantTLV;
export type MerchantAdditionalDataFieldTemplateBuilder =
    () => MerchantAdditionalDataFieldTemplate;
export type MerchantEMVQRBuilder = () => MerchantEMVQR;
export type MerchantInformationLanguageTemplateBuilder =
    () => MerchantInformationLanguageTemplate;
export type MerchantAccountInformationBuilder =
    () => MerchantAccountInformation;
export type MerchantPaymentSystemSpecificBuilder =
    () => MerchantPaymentSystemSpecific;
export type MerchantUnreservedTemplateBuilder =
    () => MerchantUnreservedTemplate;

// Merchant Constants
export interface MerchantConstants {
    ADDITIONAL_FIELD: {
        AdditionalIDBillNumber: string;
        AdditionalIDMobileNumber: string;
        AdditionalIDStoreLabel: string;
        AdditionalIDLoyaltyNumber: string;
        AdditionalIDReferenceLabel: string;
        AdditionalIDCustomerLabel: string;
        AdditionalIDTerminalLabel: string;
        AdditionalIDPurposeTransaction: string;
        AdditionalIDAdditionalConsumerDataRequest: string;
        AdditionalIDRFUforEMVCoRangeStart: string;
        AdditionalIDRFUforEMVCoRangeEnd: string;
        AdditionalIDPaymentSystemSpecificTemplatesRangeStart: string;
        AdditionalIDPaymentSystemSpecificTemplatesRangeEnd: string;
    };
    DATA_TYPE: {
        BINARY: string;
        RAW: string;
    };
    ID: {
        IDPayloadFormatIndicator: string;
        IDPointOfInitiationMethod: string;
        IDMerchantAccountInformationRangeStart: string;
        IDMerchantAccountInformationRangeEnd: string;
        IDMerchantCategoryCode: string;
        IDTransactionCurrency: string;
        IDTransactionAmount: string;
        IDTipOrConvenienceIndicator: string;
        IDValueOfConvenienceFeeFixed: string;
        IDValueOfConvenienceFeePercentage: string;
        IDCountryCode: string;
        IDMerchantName: string;
        IDMerchantCity: string;
        IDPostalCode: string;
        IDAdditionalDataFieldTemplate: string;
        IDCRC: string;
        IDMerchantInformationLanguageTemplate: string;
        IDRFUForEMVCoRangeStart: string;
        IDRFUForEMVCoRangeEnd: string;
        IDUnreservedTemplatesRangeStart: string;
        IDUnreservedTemplatesRangeEnd: string;
    };
    MERCHANT_ACCOUNT_INFORMATION: {
        MerchantAccountInformationIDGloballyUniqueIdentifier: string;
        MerchantAccountInformationIDPaymentNetworkSpecificStart: string;
        MerchantAccountInformationIDPaymentNetworkSpecificEnd: string;
    };
    MERCHANT_INFORMATION: {
        MerchantInformationIDLanguagePreference: string;
        MerchantInformationIDMerchantName: string;
        MerchantInformationIDMerchantCity: string;
        MerchantInformationIDRFUforEMVCoRangeStart: string;
        MerchantInformationIDRFUforEMVCoRangeEnd: string;
    };
    UNRESERVED_TEMPLATE: {
        UnreservedTemplateIDGloballyUniqueIdentifier: string;
        UnreservedTemplateIDContextSpecificDataStart: string;
        UnreservedTemplateIDContextSpecificDataEnd: string;
    };
}

// ============================================================================
// Consumer Types
// ============================================================================

export interface ConsumerBERTLV {
    dataWithType(dataType: DataType, indent: string): string;
    format(): string;
    setDataApplicationDefinitionFileName(value: string): void;
    setDataApplicationLabel(value: string): void;
    setDataTrack2EquivalentData(value: string): void;
    setDataApplicationPAN(value: string): void;
    setDataCardholderName(value: string): void;
    setDataLanguagePreference(value: string): void;
    setDataIssuerURL(value: string): void;
    setDataApplicationVersionNumber(value: string): void;
    setDataIssuerApplicationData(value: string): void;
    setDataTokenRequestorID(value: string): void;
    setDataPaymentAccountReference(value: string): void;
    setDataLast4DigitsOfPAN(value: string): void;
    setDataApplicationCryptogram(value: string): void;
    setDataApplicationTransactionCounter(value: string): void;
    setDataUnpredictableNumber(value: string): void;
}

export interface ConsumerApplicationSpecificTransparentTemplate {
    setBERTLV(value: ConsumerBERTLV): void;
    format(): string;
    dataWithType(dataType: DataType, indent: string): string;
}

export interface ConsumerCommonDataTransparentTemplate {
    setBERTLV(value: ConsumerBERTLV): void;
    format(): string;
    dataWithType(dataType: DataType, indent: string): string;
}

export interface ConsumerApplicationTemplate {
    setBERTLV(value: ConsumerBERTLV): void;
    addApplicationSpecificTransparentTemplate(
        value: ConsumerApplicationSpecificTransparentTemplate,
    ): void;
    format(): string;
    dataWithType(dataType: DataType, indent: string): string;
}

export interface ConsumerCommonDataTemplate {
    setBERTLV(value: ConsumerBERTLV): void;
    addCommonDataTransparentTemplate(
        value: ConsumerCommonDataTransparentTemplate,
    ): void;
    format(): string;
    dataWithType(dataType: DataType, indent: string): string;
}

export interface ConsumerEMVQR {
    setDataPayloadFormatIndicator(value: string): void;
    addApplicationTemplate(value: ConsumerApplicationTemplate): void;
    addCommonDataTemplate(value: ConsumerCommonDataTemplate): void;
    generatePayload(): string;
    toBinary(): string;
    rawData(): string;
}

// Consumer Builder Functions
export type ConsumerApplicationTemplateBuilder =
    () => ConsumerApplicationTemplate;
export type ConsumerApplicationSpecificTransparentTemplateBuilder =
    () => ConsumerApplicationSpecificTransparentTemplate;
export type ConsumerBERTLVBuilder = () => ConsumerBERTLV;
export type ConsumerCommonDataTemplateBuilder =
    () => ConsumerCommonDataTemplate;
export type ConsumerCommonDataTransparentTemplateBuilder =
    () => ConsumerCommonDataTransparentTemplate;
export type ConsumerEMVQRBuilder = () => ConsumerEMVQR;

// Consumer Constants
export interface ConsumerConstants {
    DATA_TYPE: {
        BINARY: string;
        RAW: string;
    };
    PAYLOAD: {
        IDPayloadFormatIndicator: string;
        IDApplicationTemplate: string;
        IDCommonDataTemplate: string;
        IDApplicationSpecificTransparentTemplate: string;
        IDCommonDataTransparentTemplate: string;
    };
    TAG: {
        TagApplicationDefinitionFileName: string;
        TagApplicationLabel: string;
        TagTrack2EquivalentData: string;
        TagApplicationPAN: string;
        TagCardholderName: string;
        TagLanguagePreference: string;
        TagIssuerURL: string;
        TagApplicationVersionNumber: string;
        TagIssuerApplicationData: string;
        TagTokenRequestorID: string;
        TagPaymentAccountReference: string;
        TagLast4DigitsOfPAN: string;
        TagApplicationCryptogram: string;
        TagApplicationTransactionCounter: string;
        TagUnpredictableNumber: string;
    };
}

// ============================================================================
// Main Module Exports
// ============================================================================

export interface MerchantNamespace {
    /**
     * Builder Objects
     */
    buildTLV: MerchantTLVBuilder;
    buildAdditionalDataFieldTemplate: MerchantAdditionalDataFieldTemplateBuilder;
    buildEMVQR: MerchantEMVQRBuilder;
    buildMerchantInformationLanguageTemplate: MerchantInformationLanguageTemplateBuilder;
    buildMerchantAccountInformation: MerchantAccountInformationBuilder;
    buildPaymentSystemSpecific: MerchantPaymentSystemSpecificBuilder;
    buildUnreservedTemplate: MerchantUnreservedTemplateBuilder;

    /**
     * QRCode Parser
     */
    Parser: MerchantParser;

    /**
     * All available constants
     */
    Constants: MerchantConstants;
}

export interface ConsumerNamespace {
    /**
     * Builder Objects
     */
    buildApplicationTemplate: ConsumerApplicationTemplateBuilder;
    buildApplicationSpecificTransparentTemplate: ConsumerApplicationSpecificTransparentTemplateBuilder;
    buildBERTLV: ConsumerBERTLVBuilder;
    buildCommonDataTemplate: ConsumerCommonDataTemplateBuilder;
    buildCommonDataTransparentTemplate: ConsumerCommonDataTransparentTemplateBuilder;
    buildEMVQR: ConsumerEMVQRBuilder;

    /**
     * All available constants
     */
    Constants: ConsumerConstants;
}

declare const steplixEmvQrcps: {
    Merchant: MerchantNamespace;
    Consumer: ConsumerNamespace;
};

export default steplixEmvQrcps;
