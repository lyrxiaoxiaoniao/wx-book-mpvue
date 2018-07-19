// 添加豆瓣图书
// 1.获取 isbn, openid
// 2.https://api.douban.com/v2/book/isbn/9787536692930
const https = require('https')
module.exports = async ctx => {
    const { isbn, openid } = ctx.request.body
    if (isbn && openid) {
        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJSON(url)
        console.log(bookinfo)
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
