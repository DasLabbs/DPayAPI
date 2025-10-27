type ModelName =
    | "currency"
    | "kyc"
    | "kycLog"
    | "network"
    | "order"
    | "permission"
    | "privateKeyPart"
    | "product"
    | "role"
    | "transaction"
    | "user"
    | "wallet";

type Action =
    | "create"
    | "getSingle"
    | "getList"
    | "update"
    | "softDelete"
    | "hardDelete";

export type PermissionName = `${ModelName}:${Action}`;
