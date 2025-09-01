import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path for deployment (adjust if deploying to a subdirectory)
  base: "/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Build optimizations
  build: {
    // Output directory
    outDir: "dist",

    // Generate source maps for debugging in production
    sourcemap: mode === 'development',

    // Minify for production
    minify: mode === 'production' ? 'esbuild' : false,

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for better optimization
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-dialog', '@radix-ui/react-popover'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'query-vendor': ['@tanstack/react-query'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },

        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },

        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // Asset handling
    assetsInlineLimit: 4096, // 4kb - inline smaller assets as base64
  },

  // Preview server configuration (for production preview)
  preview: {
    port: 4173,
    host: "::",
  },

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
    ],
  },
}));
