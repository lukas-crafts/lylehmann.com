import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroConfig, AstroIntegration } from "astro";

import configBuilder, { type Config } from "./utils/configBuilder";
import loadConfig from "./utils/loadConfig";

export default ({
  config: _themeConfig = "src/config.yaml",
} = {}): AstroIntegration => {
  let cfg: AstroConfig;
  return {
    name: "astrowind-integration",

    hooks: {
      "astro:config:setup": async ({
        // command,
        config,
        // injectRoute,
        // isRestart,
        logger,
        updateConfig,
        addWatchFile,
      }) => {
        const buildLogger = logger.fork("astrowind");

        const rawJsonConfig = (await loadConfig(_themeConfig)) as Config;
        const { SITE, I18N, METADATA, APP_BLOG, UI, ANALYTICS } =
          configBuilder(rawJsonConfig);

        // Generate a real config file instead of using virtual modules
        const configContent = `
export const SITE = ${JSON.stringify(SITE, null, 2)};
export const I18N = ${JSON.stringify(I18N, null, 2)};
export const METADATA = ${JSON.stringify(METADATA, null, 2)};
export const APP_BLOG = ${JSON.stringify(APP_BLOG, null, 2)};
export const UI = ${JSON.stringify(UI, null, 2)};
export const ANALYTICS = ${JSON.stringify(ANALYTICS, null, 2)};
`;

        // Write the config to a real file
        const rootPath = fileURLToPath(config.root);
        const configPath = path.join(
          rootPath,
          "src/generated/astrowind-config.ts",
        );
        const configDir = path.dirname(configPath);

        if (!fs.existsSync(configDir)) {
          fs.mkdirSync(configDir, { recursive: true });
        }

        if (fs.existsSync(configPath)) {
          const currentContent = fs.readFileSync(configPath, "utf8");
          if (currentContent !== configContent) {
            fs.writeFileSync(configPath, configContent, "utf8");
          }
        } else {
          fs.writeFileSync(configPath, configContent, "utf8");
        }

        updateConfig({
          site: SITE.site,
          base: SITE.base ?? "/",
          trailingSlash: "never",
          // ...
          vite: {
            resolve: {
              alias: {
                "astrowind:config": configPath,
              },
            },
          },
        });

        if (typeof _themeConfig === "string") {
          addWatchFile(new URL(_themeConfig, config.root));

          buildLogger.info(`Astrowind \`${_themeConfig}\` has been loaded.`);
        } else {
          buildLogger.info(`Astrowind config has been loaded.`);
        }
      },
      "astro:config:done": async ({ config }) => {
        cfg = config;
      },

      "astro:build:done": async ({ logger }) => {
        const buildLogger = logger.fork("astrowind");
        buildLogger.info("Updating `robots.txt` with `sitemap-index.xml` ...");

        try {
          const outDir = cfg.outDir;
          const publicDir = cfg.publicDir;
          const sitemapName = "sitemap-index.xml";
          const sitemapFile = new URL(sitemapName, outDir);
          const robotsTxtFile = new URL("robots.txt", publicDir);
          const robotsTxtFileInOut = new URL("robots.txt", outDir);

          const hasIntegration =
            Array.isArray(cfg?.integrations) &&
            cfg.integrations?.find((e) => e?.name === "@astrojs/sitemap") !==
              undefined;
          const sitemapExists = fs.existsSync(sitemapFile);

          if (hasIntegration && sitemapExists) {
            const robotsTxt = fs.readFileSync(robotsTxtFile, {
              encoding: "utf8",
              flag: "a+",
            });
            const sitemapUrl = new URL(
              sitemapName,
              String(new URL(cfg.base, cfg.site)),
            );
            const pattern = /^Sitemap:(.*)$/m;

            if (!pattern.test(robotsTxt)) {
              fs.writeFileSync(
                robotsTxtFileInOut,
                `${robotsTxt}${os.EOL}${os.EOL}Sitemap: ${sitemapUrl}`,
                {
                  encoding: "utf8",
                  flag: "w",
                },
              );
            } else {
              fs.writeFileSync(
                robotsTxtFileInOut,
                robotsTxt.replace(pattern, `Sitemap: ${sitemapUrl}`),
                {
                  encoding: "utf8",
                  flag: "w",
                },
              );
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
          /* empty */
        }
      },
    },
  };
};
