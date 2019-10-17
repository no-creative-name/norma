const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/try.ts'),
    output: {
        filename: 'dist/try.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
}