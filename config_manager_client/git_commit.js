import { exec } from "child_process";

function commitChanges(message) {
    return new Promise((resolve, reject) => {
        exec(
            `git add ./build && git commit -m "${message}"`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                console.log(stdout);
                console.error(stderr);
                resolve();
            }
        );
    });
}

if (process.argv.length !== 3) {
    console.error("ERROR - Usage: node commit.js <message>");
    process.exit(1);
}

commitChanges(process.argv[2])
    .then(() => console.log("Commit successful"))
    .catch((error) => console.error("Commit failed:", error));
