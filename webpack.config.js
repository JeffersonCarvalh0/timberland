const path = require('path')

module.exports = {
    entry:  {
        'binary-search-tree': path.resolve(__dirname, 'demos', 'binary-search-tree', 'src', 'index.ts'),
    },
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
        path: path.resolve(__dirname, 'demos'),
        filename: '[name]/dist/index.js'
    }
};
