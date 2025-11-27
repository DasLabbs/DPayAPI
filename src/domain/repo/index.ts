import currencyRepo from "./currency.repo";
import kycRepo from "./kyc.repo";
import kycLogRepo from "./kycLog.repo";
import networkRepo from "./network.repo";
import notificationRepo from "./noti.repo";
import orderRepo from "./order.repo";
import permissionRepo from "./permission.repo";
import pointRepo from "./point.repo";
import privateKeyPartRepo from "./privateKeyPart.repo";
import productRepo from "./product.repo";
import roleRepo from "./role.repo";
import transactionRepo from "./transaction.repo";
import userRepo from "./user.repo";
import walletRepo from "./wallet.repo";

const appRepos = {
    user: userRepo,
    wallet: walletRepo,
    network: networkRepo,
    currency: currencyRepo,
    product: productRepo,
    transaction: transactionRepo,
    kyc: kycRepo,
    kycLog: kycLogRepo,
    privateKeyPart: privateKeyPartRepo,
    order: orderRepo,
    role: roleRepo,
    permission: permissionRepo,
    point: pointRepo,
    notification: notificationRepo,
};

export type AppRepos = typeof appRepos;
export default appRepos;
