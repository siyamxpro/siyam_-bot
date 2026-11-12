const fs = require("fs-extra");
const path = require("path");
const readline = require("readline");
const log = require("./logger/log.js");

let versionBackup;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ ত্যা্ঁহ্ঁ

function recursiveReadDirAndBackup(pathFileOrFolder) {
    const pathFileOrFolderBackup = path.join(
        process.cwd(),
        "backups",
        versionBackup,
        pathFileOrFolder
    );

    const pathFileOrFolderRestore = path.join(
        process.cwd(),
        pathFileOrFolder
    );

    if (fs.lstatSync(pathFileOrFolderBackup).isDirectory()) {
        if (!fs.existsSync(pathFileOrFolderRestore)) {
            fs.mkdirSync(pathFileOrFolderRestore, {
                recursive: true
            });
        }

        const readDir = fs.readdirSync(pathFileOrFolderBackup);

        readDir.forEach(fileOrFolder => {
            recursiveReadDirAndBackup(
                path.join(pathFileOrFolder, fileOrFolder)
            );
        });
    } else {
        fs.copyFileSync(
            pathFileOrFolderBackup,
            pathFileOrFolderRestore
        );
    }
}

(async () => {
    try {
        if (process.argv.length < 3) {
            versionBackup = await new Promise(resolve => {
                rl.question("Input version backup: ", answer => {
                    resolve(answer);
                });
            });
        } else {
            versionBackup = process.argv[2];
        }

        if (!versionBackup) {
            log.error("ERROR", "Please input version backup");
            process.exit(1);
        }

        versionBackup = versionBackup.replace("backup_", "");
        versionBackup = `backup_${versionBackup}`;

        const backupFolder = path.join(
            process.cwd(),
            "backups",
            versionBackup
        );

        if (!fs.existsSync(backupFolder)) {
            log.error(
                "ERROR",
                `Backup folder is not exists (${backupFolder})`
            );
            process.exit(1);
        }

        const files = fs.readdirSync(backupFolder);

        for (const file of files) {
            recursiveReadDirAndBackup(file);
        }

        const packagePath = path.join(
            process.cwd(),
            "package.json"
        );

        const packageJson = require(packagePath);

        packageJson.version = versionBackup.replace("backup_", "");

        fs.writeFileSync(
            packagePath,
            JSON.stringify(packageJson, null, 2)
        );

        log.info(
            "SUCCESS",
            `Restore backup ${versionBackup} success`
        );
    } catch (error) {
        log.error("ERROR", error.message);
        process.exitCode = 1;
    } finally {
        rl.close();
    }
})();
