const fs = require("fs-extra")

fs.copySync("../shared", ".next/shared", { overwrite: true })

console.log("✅ Shared directory copied!")
