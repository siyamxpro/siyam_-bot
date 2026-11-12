const fs = require("fs");
const path = require("path");

const packageFile = path.join(__dirname, "package.json");

function checkProject() {
    if (!fs.existsSync(packageFile)) {
        throw new Error("package.json not found");
    }

    const pkg = require(packageFile);

    if (!pkg.dependencies ||
        !pkg.dependencies["node-telegram-bot-api"]) {
        console.warn("Telegram dependency is missing.");
    }

    console.log("Project update check completed.");
}

checkProject();
