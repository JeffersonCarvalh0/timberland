const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'demo', 'src', 'index.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, 'demo', 'dist'),
        filename: 'bundle.js'
    }
};
