const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // 参考：https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
    new WorkboxPlugin.GenerateSW({
      // 预缓存除了图片的其他所有资源
      // 与其预先缓存网站上的所有图片，这样会占用大量的缓存空间，不如在使用时进行缓存，并限制缓存的图片的数量。
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // 运行时缓存
      runtimeCaching: [
        // 1、缓存图片
        // 图片在网页中占了很大的比重。使用这条规则可以从缓存中快速提供图片
        // 同时确保你不会无限期地缓存它们，消耗你的用户的存储空间。
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'yj:images',
            expiration: {
              // 缓存数量
              maxEntries: 1000,
              // 缓存天数
              maxAgeSeconds: 30 * 24 * 60 * 60
            }
          }
        },

        // 2、缓存字体
        {
          // Cache Google Fonts with a stale-while-revalidate strategy, with
          // a maximum number of entries.
          // registerRoute(
          //   ({url}) => url.origin === 'https://fonts.googleapis.com' ||
          //              url.origin === 'https://fonts.gstatic.com',
          //   new StaleWhileRevalidate({
          //     cacheName: 'google-fonts',
          //     plugins: [
          //       new ExpirationPlugin({maxEntries: 20}),
          //     ],
          //   }),
          // );
          urlPattern: /\.(?:eot|ttf|woff|woff2)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'yj:fonts',
            expiration: {
              // 缓存数量
              maxEntries: 1000,
              // 缓存天数
              maxAgeSeconds: 30 * 24 * 60 * 60
            }
          }
        },

        // 3、缓存JavaScript和CSS
        {
        // registerRoute(
        //   ({request}) => request.destination === 'script' ||
        //                  request.destination === 'style',
        //   new StaleWhileRevalidate()
        // );
          urlPattern: ({ request }) => ['script', 'style'].includes(request.destination),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'yj:js-css'
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
