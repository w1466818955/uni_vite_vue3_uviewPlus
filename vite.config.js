import { resolve } from "path"
import { loadEnv, defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import TransformPages from "uni-read-pages-vite"
import AutoImport from "unplugin-auto-import/vite"
import viteCDNPlugin from "vite-plugin-cdn-import"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

const pathResolve = (pathStr) => resolve(__dirname, pathStr)

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: "./", // 开发或生产环境服务的公共基础路径
    // 定义全局变量
    define: {
      "process.env": {},
      ROUTES: new TransformPages().routes // 注入路由表
    },
    // 配置跨域
    server: {
      // host: "127.0.0.1", // 主机名
      port: 3000, // 端口
      hmr: true, // 开启热更新
      open: false, // 启动后打开浏览器
      // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      overlay: {
        warnings: false,
        errors: true
      },
      //自定义代理规则
      proxy: {
        "/api": {
          target: "https://test.xxx.com",
          changOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    // 生产环境配置
    build: {
      outDir: "dist", // 打包目录
      assetsDir: "assets", // 静态资源目录
      cssCodeSplit: true, //css 拆分
      sourcemap: false, // 构建后是否生成 sourcemap 文件
      assetsInlineLimit: 5000, //小于该值 图片将打包成Base64
      minify: "terser", // 必须开启：使用terserOptions才有效果
      rollupOptions: {
        // 入口文件
        input: {
          index: resolve(__dirname, "index.html")
        },
        // 输出配置
        output: {
          compact: true, // 去除打包后的空格
          entryFileNames: "assets/[name].[hash].js",
          chunkFileNames: "assets/[name].[hash].js",
          assetFileNames: "assets/[name].[hash].[ext]"
        }
      },
      terserOptions: {
        compress: {
          drop_console: true, //生产环境时移除console
          drop_debugger: true //生产环境时移除debugger
        }
      }
    },
    // 配置别名
    resolve: {
      alias: {
        "@": resolve("src"),
        api: resolve("src/api"),
        views: resolve("src/views"),
        assets: resolve("src/assets"),
        components: resolve("src/components")
      },
      extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名，可以自己增减
    },
    transpileDependencies: ["uview-plus"], // uview-plus 框架
    // 插件
    plugins: [
      uni(), // uni-app插件
      // 自动导入
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        imports: [
          "vue",
          "uni-app",
          "pinia",
          {
            from: "uni-mini-router",
            imports: ["createRouter", "useRouter", "useRoute"]
          }
        ],
        dts: "src/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          globalsPropValue: true
        }
      }),
      // cdn加速插件
      viteCDNPlugin({
        modules: [
          {
            name: "lodash", // 需要 cdn 加速的依赖名称
            var: "_", // 全局分配给模块的变量，Rollup 需要这个变量名称
            path: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js" // 指定 CDN 上的加载路径
          }
        ]
      }),
      // svg图标插件
      createSvgIconsPlugin({
        iconDirs: [pathResolve("./src/static/svgs")], // 指定需要缓存的图标文件夹
        symbolId: "icon-[dir]-[name]" // 指定symbolId格式
      })
    ]
  })
}
