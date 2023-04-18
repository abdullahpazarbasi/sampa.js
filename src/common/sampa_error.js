export class SampaError extends Error {
    code;

    constructor(code, message) {
        super(message);
        this.code = code;
    }

    toString() {
        return `${this.message} [${this.code}]`;
    }
}
