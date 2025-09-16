import nextra from "nextra";

const withNextra = nextra({

});

const nextConfig = {
    staticImage: true,
    basePath: process.env.NODE_ENV === 'production' ? '/ia-portfolio' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/ia-portfolio' : '',
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
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