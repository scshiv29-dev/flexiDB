module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack: (config) => {
    // Add a rule to handle the cpufeatures.node file
    config.module.rules.push({
      test: /\.node$/,
      use: {
        loader: 'file-loader',
      },
    });

    return config;
  },
};
