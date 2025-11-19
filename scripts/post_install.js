const fs = require("node:fs");
const path = require("node:path");

const main = () => {
    const typeSrcPath = path.resolve(
        __dirname,
        "..",
        "src",
        "types/steplix-emv-qrcps.d.ts"
    )

    const libDir = path.resolve(
        __dirname,
        "..",
        "node_modules",
        "steplix-emv-qrcps",
    )

    const destPath = path.join(libDir, "index.d.ts");

    if (fs.existsSync(libDir)) {
        fs.copyFileSync(typeSrcPath, destPath);
        const packageJson = JSON.parse(fs.readFileSync(path.join(libDir, "package.json"), "utf8"));
        packageJson.types = "index.d.ts";
        fs.writeFileSync(path.join(libDir, "package.json"), JSON.stringify(packageJson, null, 2));
    }
}

main()