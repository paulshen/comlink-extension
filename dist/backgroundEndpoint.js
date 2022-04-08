import browser from "webextension-polyfill";
import { forward, isMessagePort, createEndpoint } from "./adapter";
const portCallbacks = new Map();
const ports = new Map();
async function serializePort(id) {
    if (!portCallbacks.has(id)) {
        portCallbacks.set(id, []);
    }
    const callbacks = portCallbacks.get(id);
    return new Promise((resolve) => {
        callbacks.push((port) => resolve(port));
    });
}
function deserializePort(id) {
    const port = ports.get(id);
    const { port1, port2 } = new MessageChannel();
    forward(port2, port, serializePort, deserializePort);
    return port1;
}
browser.runtime.onConnect.addListener((port) => {
    var _a;
    if (!isMessagePort(port))
        return;
    ports.set(port.name, port);
    (_a = portCallbacks.get(port.name)) === null || _a === void 0 ? void 0 : _a.forEach((cb) => cb(port));
});
export function createBackgroundEndpoint(port) {
    return createEndpoint(port, serializePort, deserializePort);
}
//# sourceMappingURL=backgroundEndpoint.js.map