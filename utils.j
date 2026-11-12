const fs = require("fs");
const path = require("path");

module.exports = {
    getText(message) {
        return message?.text || message?.caption || "";
    },

    getUserID(message) {
        return String(message?.from?.id || "");
    },

    getChatID(message) {
        return String(message?.chat?.id || "");
    },

    getName(user) {
        return [user?.first_name, user?.last_name]
            .filter(Boolean)
            .join(" ");
    },

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    readJSON(file, fallback = {}) {
        try {
            return JSON.parse(fs.readFileSync(file, "utf8"));
        } catch {
            return fallback;
        }
    },

    writeJSON(file, data) {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }
};
