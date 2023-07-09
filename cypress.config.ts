import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: false,
  screenshotOnRunFailure: false,
  retries: {
    openMode: 1,
    runMode: 1
  },
  env: {
    baseUrl: "http://localhost:3000",
    create_user_api: "1e4e2224430117b4c8ccc461b5237843"
  }
});
