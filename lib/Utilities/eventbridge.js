import { EventEmitter } from "events";

if (!document.eventBridge)document.eventBridge = new EventEmitter();

export default document.eventBridge