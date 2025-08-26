import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import {
    ArrowLeft,
    Calendar,
    Tag,
    FileText,
    Clock,
    User,
    ChevronRight
} from 'lucide-react'
import remarkGfm from 'remark-gfm'   // 🔹 ADD THIS

/* -------------------------------
   Shared MDX Components
-------------------------------- */
const components = {
    h1: props => (
        <h1
            className="text-4xl font-bold mb-6 text-white border-b-2 border-purple-500/30 pb-4"
            {...props}
        />
    ),
    h2: props => (
        <h2 className="text-3xl font-bold mb-4 mt-8 text-purple-300" {...props} />
    ),
    h3: props => (
        <h3 className="text-2xl font-bold mb-3 mt-6 text-purple-200" {...props} />
    ),
    p: props => (
        <p className="mb-4 text-gray-300 leading-relaxed" {...props} />
    ),
    ul: props => (
        <ul
            className="list-disc list-inside mb-4 text-gray-300 space-y-1"
            {...props}
        />
    ),
    ol: props => (
        <ol
            className="list-decimal list-inside mb-4 text-gray-300 space-y-1"
            {...props}
        />
    ),
    li: props => <li className="ml-4" {...props} />,
    code: props => (
        <code
            className="bg-gray-800 border border-purple-500/30 px-2 py-1 text-sm text-purple-300"
            {...props}
        />
    ),
    pre: props => (
        <pre className="bg-gray-900 border-2 border-purple-500/30 p-4 overflow-x-auto mb-6 text-sm">
      <code className="text-green-400" {...props} />
    </pre>
    ),
    blockquote: props => (
        <blockquote
            className="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-4"
            {...props}
        />
    ),
    a: props => (
        <a
            className="text-purple-400 hover:text-purple-300 underline transition-colors"
            {...props}
        />
    ),
    img: props => (
        <img
            className="border-2 border-purple-500/30 max-w-full h-auto my-4"
            {...props}
        />
    ),
    table: props => (
        <div className="overflow-x-auto mb-6">
            <table
                className="min-w-full border-2 border-purple-500/30"
                {...props}
            />
        </div>
    ),
    thead: props => (
        <thead className="bg-gray-900 text-purple-300" {...props} />
    ),
    tbody: props => <tbody {...props} />,
    tr: props => (
        <tr className="hover:bg-gray-800 transition-colors" {...props} />
    ),
    th: props => (
        <th
            className="border border-purple-500/30 bg-gray-800 px-4 py-2 text-left text-purple-300"
            {...props}
        />
    ),
    td: props => (
        <td
            className="border border-purple-500/30 px-4 py-2 text-gray-300"
            {...props}
        />
    )
}
/* -------------------------------
   Helpers for Index Page
-------------------------------- */
async function getMDXFiles() {
    const docsDir = path.join(process.cwd(), 'docs')

    function readDirRecursively(dir, baseDir = '') {
        const files = []
        const items = fs.readdirSync(dir)

        for (const item of items) {
            const fullPath = path.join(dir, item)
            const relativePath = path.join(baseDir, item)

            if (fs.statSync(fullPath).isDirectory()) {
                files.push(...readDirRecursively(fullPath, relativePath))
            } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
                const content = fs.readFileSync(fullPath, 'utf8')
                const stats = fs.statSync(fullPath)

                // Extract frontmatter
                const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
                let metadata = {}

                if (frontmatterMatch) {
                    const frontmatter = frontmatterMatch[1]
                    frontmatter.split('\n').forEach(line => {
                        const [key, ...valueParts] = line.split(':')
                        if (key && valueParts.length) {
                            const value = valueParts
                                .join(':')
                                .trim()
                                .replace(/^['"]|['"]$/g, '')
                            metadata[key.trim()] = value
                        }
                    })
                }

                // Extract title if not in frontmatter
                if (!metadata.title) {
                    const titleMatch = content.match(/^#\s+(.+)$/m)
                    metadata.title = titleMatch
                        ? titleMatch[1]
                        : item.replace(/\.(md|mdx)$/, '')
                }

                files.push({
                    name: item,
                    path: relativePath.replace(/\.(md|mdx)$/, ''),
                    fullPath: relativePath,
                    category: baseDir || 'root',
                    metadata,
                    lastModified: stats.mtime,
                    size: stats.size
                })
            }
        }

        return files
    }

    try {
        return readDirRecursively(docsDir)
    } catch (error) {
        console.error('Error reading docs directory:', error)
        return []
    }
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date))
}

/* -------------------------------
   Helpers for MDX Rendering
-------------------------------- */
async function getMDXContent(mdxPath) {
    const docsDir = path.join(process.cwd(), 'docs')
    const fullPath = path.join(docsDir, `${mdxPath}.mdx`)
    const mdPath = path.join(docsDir, `${mdxPath}.md`)

    let filePath = null
    if (fs.existsSync(fullPath)) filePath = fullPath
    else if (fs.existsSync(mdPath)) filePath = mdPath
    else return null

    try {
        const content = fs.readFileSync(filePath, 'utf8')
        const stats = fs.statSync(filePath)

        // Extract frontmatter
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
        let metadata = {}
        let mdxContent = content

        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1]
            mdxContent = content.replace(frontmatterMatch[0], '').trim()

            frontmatter.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split(':')
                if (key && valueParts.length) {
                    const value = valueParts
                        .join(':')
                        .trim()
                        .replace(/^['"]|['"]$/g, '')
                    metadata[key.trim()] = value
                }
            })
        }

        if (!metadata.title) {
            const titleMatch = mdxContent.match(/^#\s+(.+)$/m)
            metadata.title = titleMatch ? titleMatch[1] : path.basename(mdxPath)
        }

        return { content: mdxContent, metadata, stats, filePath }
    } catch (err) {
        console.error('Error reading MDX:', err)
        return null
    }
}

function calculateReadTime(content) {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
}

/* -------------------------------
   Main Page Component
-------------------------------- */
export default async function DocsPage({ params }) {
    const { mdxPath } = await params
    const pathString = mdxPath?.length ? mdxPath.join('/') : ''

    if (!pathString) {
        const files = await getMDXFiles()
        const categories = [...new Set(files.map(f => f.category))]

        return (
            <div className="min-h-screen bg-black text-white p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="border-b-2 border-purple-500/30 pb-6 mb-8">
                        <h1 className="text-4xl font-bold flex items-center gap-3 mb-4">
                            <span className="text-purple-400">#</span>
                            <span>docs</span>
                            <FileText className="w-8 h-8 text-purple-400" />
                        </h1>
                        <div className="text-gray-400">
                            <span>Found {files.length} documentation files</span>
                            <span className="mx-4">•</span>
                            <span>{categories.length} categories</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-900/50 border-2 border-purple-500/30 p-4">
                            <div className="text-2xl font-bold text-purple-400">
                                {files.length}
                            </div>
                            <div className="text-gray-400 text-sm">Total Files</div>
                        </div>
                        <div className="bg-gray-900/50 border-2 border-green-500/30 p-4">
                            <div className="text-2xl font-bold text-green-400">
                                {categories.length}
                            </div>
                            <div className="text-gray-400 text-sm">Categories</div>
                        </div>
                        <div className="bg-gray-900/50 border-2 border-blue-500/30 p-4">
                            <div className="text-2xl font-bold text-blue-400">
                                {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))}
                            </div>
                            <div className="text-gray-400 text-sm">Total Size</div>
                        </div>
                    </div>

                    {/* File Listing */}
                    {categories.map(category => (
                        <div key={category} className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <span className="text-purple-400">./</span>
                                <span>
                  {category === 'root' ? 'docs' : `docs/${category}`}
                </span>
                                <span className="text-gray-500 text-sm">
                  ({files.filter(f => f.category === category).length} files)
                </span>
                            </h2>

                            <div className="space-y-2">
                                {files
                                    .filter(f => f.category === category)
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map(file => (
                                        <Link
                                            key={file.path}
                                            href={`/docs/${file.path}`}
                                            className="block bg-gray-900/30 border-2 border-gray-100 hover:border-purple-400 transition-all p-4 group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-purple-400" />
                                                        <span className="text-lg text-white group-hover:text-purple-100">
                              {file.metadata.title || file.name}
                            </span>
                                                    </div>
                                                    {file.metadata.description && (
                                                        <span className="text-gray-100 text-base truncate max-w-md">
                              {file.metadata.description}
                            </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    {/*{file.metadata.tags && (*/}
                                                    {/*    <div className="flex items-center gap-1">*/}
                                                    {/*        <Tag className="w-3 h-3" />*/}
                                                    {/*        <span>{file.metadata.tags}</span>*/}
                                                    {/*    </div>*/}
                                                    {/*)}*/}
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{formatDate(file.lastModified)}</span>
                                                    </div>
                                                    <span>{formatFileSize(file.size)}</span>
                                                    <ChevronRight className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const mdxData = await getMDXContent(pathString)
    if (!mdxData) notFound()

    const { content, metadata, stats } = mdxData
    const readTime = calculateReadTime(content)

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            <div className="max-w-4xl mx-auto px-8 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/docs"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to docs</span>
                    </Link>

                    <div className="border-b-2 border-purple-500/30 pb-6">
                        <h1 className="text-4xl font-bold mb-4 text-white">
                            {metadata.title}
                        </h1>

                        {metadata.description && (
                            <p className="text-xl text-gray-400 mb-4">
                                {metadata.description}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(stats.mtime)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{readTime} min read</span>
                            </div>

                            {metadata.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{metadata.author}</span>
                                </div>
                            )}

                            {metadata.tags && (
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    <span>{metadata.tags}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <article className="prose prose-invert max-w-none">
                    <MDXRemote
                        source={content}
                        components={components}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],   // 🔹 ENABLE GFM TABLES
                            },
                        }}
                    />
                </article>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t-2 border-purple-500/30">
                    <div className="bg-gray-900/50 border-2 border-purple-500/30 p-6">
                        <div className="text-purple-400 mb-2">
                            <span className="text-gray-500">piero@portfolio:~/docs$ </span>
                            stat {mdxData.filePath}
                        </div>
                        <div className="text-gray-300 text-sm space-y-1">
                            <div>File: {mdxData.filePath}</div>
                            <div>Size: {stats.size} bytes</div>
                            <div>Modified: {stats.mtime.toISOString()}</div>
                            <div>Words: ~{content.split(/\s+/).length}</div>
                            <div>Reading time: {readTime} minutes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const docsDir = path.join(process.cwd(), 'docs')

    function readDirRecursively(dir, baseDir = '') {
        const files = []
        const items = fs.readdirSync(dir)

        for (const item of items) {
            const fullPath = path.join(dir, item)
            const relativePath = path.join(baseDir, item)

            if (fs.statSync(fullPath).isDirectory()) {
                files.push(...readDirRecursively(fullPath, relativePath))
            } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
                files.push({
                    mdxPath: relativePath.replace(/\.(md|mdx)$/, '').split(path.sep)
                })
            }
        }
        return files
    }

    let params = []
    try {
        params = readDirRecursively(docsDir)
    } catch (err) {
        console.error('Error generating static params:', err)
    }

    return [{ mdxPath: [] }, ...params]
}