import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

export default defineConfig({
  plugins: [
    //deno(),
    sveltekit()
  ],
  server: {
    host:true,
    watch: {
      usePolling: true, // 👈 これが必須です（変更を定期チェックする）
      interval: 1000     // チェックの間隔（ミリ秒）
    }
  }
});
