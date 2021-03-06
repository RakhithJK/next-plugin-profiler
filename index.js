module.exports = ({ isEnabled = false }) => {
  return (nextConfig = {}) => {
    return {
      ...nextConfig,
      webpack(config, options) {
        if (!options.defaultLoaders) {
          throw new Error(
            "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
          );
        }

        const { dev } = options;

        if (!dev && isEnabled) {
          config.resolve.alias[`react-dom$`] = `react-dom/profiling`;
          config.resolve.alias[
            `scheduler/tracing`
          ] = `scheduler/tracing-profiling`;
        }

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      }
    };
  };
};
