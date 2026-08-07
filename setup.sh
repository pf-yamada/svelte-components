cat << EOF > ./deno.json
{
  "nodeModulesDir": "auto",
  "tasks": {
    "dev": "deno run -A npm:vite --open",
    "build": "deno run -A npm:vite build",
    "preview": "deno run -A npm:vite preview --open",
    "prepare": "deno run -A npm:@sveltejs/kit/svelte-kit sync || echo ''",
    "check": "deno run -A npm:@sveltejs/kit/svelte-kit sync && deno run -A npm:svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "deno run -A npm:@sveltejs/kit/svelte-kit sync && deno run -A npm:svelte-check --tsconfig ./tsconfig.json --watch"
  }
}
EOF

deno add npm:vite
deno add npm:@deno/vite-plugin
deno add npm:@sveltejs/vite-plugin-svelte
deno add npm:@sveltejs/kit
deno add npm:svelte
deno add npm:svelte-check
deno add npm:@sveltejs/adapter-static

mkdir -p ./src/routes
mkdir -p ./src/lib
mkdir ./static

cat << EOF > ./vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

export default defineConfig({
  plugins: [
    deno(),
    sveltekit()
  ]
});
EOF
cat << EOF > ./svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};

export default config;
EOF
cat << EOF > ./tsconfig.json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "strict": true
  }
}
EOF
echo "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAtJREFUCNdjGAUkCQABLAABwXDTkAAAAABJRU5ErkJggg==" | base64 -d > ./static/favicon.png
cat << EOF > ./src/app.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
EOF
cat << EOF > ./src/routes/+page.svelte
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
EOF
echo "export const prerender = true;" > ./src/routes/+layout.ts