export class xhrLogMessages {
    private static messages: Map<string, string> = new Map();
    static addMessage(object: string, msg: string) {
        xhrLogMessages.messages.set(object, msg);
    }

    static getMessagesAsHeaderString() {
        console.log(this.messages);
        const res = {};
        this.messages.forEach( (v, k) => {
            res[k] = v;
        })
        console.log(res);
        return JSON.stringify(res);
    }

    static clearMessages() {
        this.messages = new Map();
    }
}