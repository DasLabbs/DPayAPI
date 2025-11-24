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

    // Check if both source file and lib directory exist before proceeding
    if (fs.existsSync(typeSrcPath) && fs.existsSync(libDir)) {
        fs.copyFileSync(typeSrcPath, destPath);
        const packageJson = JSON.parse(fs.readFileSync(path.join(libDir, "package.json"), "utf8"));
        packageJson.types = "index.d.ts";
        fs.writeFileSync(path.join(libDir, "package.json"), JSON.stringify(packageJson, null, 2));
    } else {
        // Silently skip if files don't exist (e.g., during Docker build before all files are copied)
        if (!fs.existsSync(typeSrcPath)) {
            console.warn(`Warning: Type definition file not found at ${typeSrcPath}, skipping postinstall step.`);
        }
        if (!fs.existsSync(libDir)) {
            console.warn(`Warning: Library directory not found at ${libDir}, skipping postinstall step.`);
        }
    }
}

main()