import { AbiItem } from "@shared/ types";
import { AbiCoder, Log } from "ethers";

export const decodeEvent = <T>(log: Log, abi: AbiItem[]) => {
    const indexedAbi = abi.filter((abi) => abi.indexed);
    const nonIndexedAbi = abi.filter((abi) => !abi.indexed);

    const abiDecoder = new AbiCoder();

    const indexedDecoded = decodeIndexedEvent(log, indexedAbi, abiDecoder);
    const nonIndexedDecoded = decodeNonIndexedEvent(
        log,
        nonIndexedAbi,
        abiDecoder,
    );

    const event = {
        ...indexedDecoded,
        ...nonIndexedDecoded,
    } as T;

    return event;
};

const decodeIndexedEvent = (log: Log, abi: AbiItem[], abiDecoder: AbiCoder) => {
    const decoded = abiDecoder.decode(
        abi.map((abi) => abi.internalType),
        "0x" + log.topics.slice(1).join("").replaceAll("0x", ""),
    );
    return Object.fromEntries(
        Array.from(decoded.values()).map((value, index) => [
            abi[index].name,
            value,
        ]),
    );
};

const decodeNonIndexedEvent = (
    log: Log,
    abi: AbiItem[],
    abiDecoder: AbiCoder,
) => {
    const decoded = abiDecoder.decode(
        abi.map((abi) => abi.internalType),
        log.data,
    );
    return Object.fromEntries(
        Array.from(decoded.values()).map((value, index) => [
            abi[index].name,
            value,
        ]),
    );
};
