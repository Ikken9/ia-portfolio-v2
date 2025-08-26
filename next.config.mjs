import nextra from "nextra";

const withNextra = nextra({

});

const nextConfig = {
    basePath: process.env.PAGES_BASE_PATH,
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    distDir: "out",
    async redirects() {
        return []
    },
    webpack: (config) => {
        config.module.rules.push(
            { test: /\.md$/, use: "raw-loader" },
            {
                test: /\.mdx$/,
                use: [
                    {
                        loader: "@mdx-js/loader",
                        options: { providerImportSource: "@mdx-js/react" },
                    },
                ],
            }
        );
        return config;
    }
};

export default withNextra(nextConfig);
