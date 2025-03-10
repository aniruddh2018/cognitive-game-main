let userConfig = {}

try {
  // If `v0-user-next.config.mjs` exports default, we grab it:
  const importedUserConfig = await import('./v0-user-next.config.mjs');
  userConfig = importedUserConfig.default ?? {};
} catch (error) {
  // If the file doesn't exist or there's some other error, ignore
  console.info('No user config found or failed to import. Skipping user config.');
}

/** @type {import('next').NextConfig} */
const baseConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

const finalConfig = mergeConfig(baseConfig, userConfig);

export default finalConfig;

function mergeConfig(base, overrides) {
  // shallow-merge approach
  if (!overrides) return base;

  for (const key in overrides) {
    if (
      base[key] &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      base[key] = { ...base[key], ...overrides[key] };
    } else {
      base[key] = overrides[key];
    }
  }

  return base;
}
