import { Runtime } from "webextension-polyfill";
import * as Comlink from "comlink";
export declare type PortResolver = (id: string) => ResolvablePort;
export declare type PortDeserializer = (id: string) => MessagePort;
export declare type ResolvablePort = Promise<Runtime.Port> | Runtime.Port | string;
export declare function createEndpoint(port: Runtime.Port, resolvePort?: PortResolver, deserializePort?: PortDeserializer): Comlink.Endpoint;
export declare function forward(messagePort: MessagePort, extensionPort: ResolvablePort, resolvePort?: PortResolver, deserializePort?: PortDeserializer): Promise<void>;
export declare function isMessagePort(port: {
    name: string;
}): boolean;
