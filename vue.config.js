const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports={
    lintOnSave: false,
    devServer: {
        port: 8080,
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: 'http://211.149.252.202:2019',
                secure: false,
                changeOrigin: true,
                pathRewrite:{'^/api':''}
            }
        }
    }
}
