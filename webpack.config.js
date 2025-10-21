import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "build/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                silenceDeprecations: [
                  "mixed-decls",
                  "color-functions",
                  "global-builtin",
                  "import",
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
};
