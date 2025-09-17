import nextra from "nextra";

const withNextra = nextra({
    staticImage: true,
});

// Use GitHub Actions environment or NODE_ENV
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isProd = process.env.NODE_ENV === 'production' || isGitHubActions;

// Extract repo name from GITHUB_REPOSITORY (format: "owner/repo-name")
const repoName = process.env.GITHUB_REPOSITORY ?
    process.env.GITHUB_REPOSITORY.split('/')[1] : 'ia-portfolio';

const basePath = isProd ? `/${repoName}` : '';

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS);
console.log('GITHUB_REPOSITORY:', process.env.GITHUB_REPOSITORY);
console.log('repoName:', repoName);
console.log('isProd:', isProd);
console.log('basePath will be:', basePath);

const nextConfig = {
    basePath: basePath,
    assetPrefix: basePath,
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath, // Make basePath available to client-side
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