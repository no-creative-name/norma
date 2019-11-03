const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack')

module.exports = {
    entry: path.join(__dirname, '/src/main.ts'),
    output: {
        filename: 'dist/index.js',
        path: __dirname,
        library: 'headlessCmsAdapter',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [
        new DtsBundleWebpack({
            name: 'headless-cms-adapter',
            main: 'dist/main.d.ts',
            out: 'index.d.ts',
            removeSource: true
        })
    ]
}