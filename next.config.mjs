import nextra from "nextra";

const withNextra = nextra({
    staticImage: true,
});

const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/ia-portfolio' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/ia-portfolio' : '',
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true // GitHub Pages does not support Next.js image optimization
    },
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