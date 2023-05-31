module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack: (config) => {
    // Add a rule to handle the cpufeatures.node file
    config.module.rules.push({
      test: /\/node_modules\/cpu-features\/build\/Release\/cpufeatures\.node$/,
      use: {
        loader: 'file-loader',
      },
    });

    return config;
  },
};
