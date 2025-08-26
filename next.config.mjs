import nextra from "nextra";

const withNextra = nextra({

});

const nextConfig = {
    basePath: process.env.GITHUB_REPOSITORY ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] : '',
    output: "export",
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
