import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';


require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,

  retries: 1,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],

    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
      },
    ],
    
  ],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/#Photo%20Manager',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201'        // ":" is "if" , "?" is "then"
           : process.env.STAGING === '1' ? 'http://localhost:4202'
           : 'http://localhost:4200',

    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 50000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'DEV',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4201'
      },
    },

    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox', 
        video: {
          mode: 'on',
          size: {width: 1920, height: 1080}
        }
      },
    },

    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
    }

  ],
});
