const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../database");

module.exports = async function loadData() {
    fs.mkdirSync(dataDir, { recursive: true });

    const files = {
        users: "users.json",
        groups: "groups.json",
        threads: "threads.json"
    };

    for (const [key, filename] of Object.entries(files)) {
        const file = path.join(dataDir, filename);

        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, "{}");
        }

        try {
            global.GoatBot.data[key] =
                JSON.parse(fs.readFileSync(file, "utf8"));
        } catch {
            global.GoatBot.data[key] = {};
        }
    }

    console.log("Database loaded.");
};
