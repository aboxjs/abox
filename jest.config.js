/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    "transform": {
        ".(js|ts)": "babel-jest"
    },
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "testRegex": "(/test/.*\\.spec.ts)$"
}
