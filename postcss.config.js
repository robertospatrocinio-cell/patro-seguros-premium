export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: [
              "default",
              {
                discardComments: { removeAll: true },
                mergeRules: true,
                mergeLonghand: true,
                minifySelectors: true,
                normalizeWhitespace: true,
                reduceIdents: false,
                zindex: false,
              },
            ],
          },
        }
      : {}),
  },
};
