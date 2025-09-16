import nextra from "nextra";

const withNextra = nextra({

});

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    staticImage: true,
    basePath: isProd ? '/ia-portfolio' : '',
    assetPrefix: isProd ? '/ia-portfolio/' : '',
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