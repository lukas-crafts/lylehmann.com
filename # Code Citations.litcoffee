# Code Citations

## License: MIT
https://github.com/woliveiras/blog/blob/6c69f8d59960e8135fbae38107563b6e8f43add8/src/content/config.ts

```
z.string().optional(),
        ignoreTitleTemplate: z.boolean().optional(),
        canonical: z.string().url().optional(),
        robots: z
          .object({
            index: z.boolean().optional(),
            follow: z.boolean().optional(),
          })
          .optional(),
        description: z.string().optional(),
        openGraph: z
          .object({
            url: z.string().optional(),
            siteName: z.string().optional(),
            images: z
              .array(
                z.object({
                  url: z.string(),
                  width: z.number().optional(),
                  height: z.number().optional(),
                }),
              )
              .optional(),
            locale: z.string().optional(),
            type: z.string().optional(),
          })
          .optional(),
        twitter: z
          .object({
            handle: z.string().optional(),
            site: z.string().optional(),
            cardType: z.string().optional(),
          })
          .optional(),
      })
      .optional()
```


## License: unbekannt
https://github.com/tieppt/tiepptwind/blob/54d01a16e90cdbfe27b9f92f49a448769685b87d/src/content/config.ts

```
z.string().optional(),
        ignoreTitleTemplate: z.boolean().optional(),
        canonical: z.string().url().optional(),
        robots: z
          .object({
            index: z.boolean().optional(),
            follow: z.boolean().optional(),
          })
          .optional(),
        description: z.string().optional(),
        openGraph: z
          .object({
            url: z.string().optional(),
            siteName: z.string().optional(),
            images: z
              .array(
                z.object({
                  url: z.string(),
                  width: z.number().optional(),
                  height: z.number().optional(),
                }),
              )
              .optional(),
            locale: z.string().optional(),
            type: z.string().optional(),
          })
          .optional(),
        twitter: z
          .object({
            handle: z.string().optional(),
            site: z.string().optional(),
            cardType: z.string().optional(),
          })
          .optional(),
      })
      .optional()
```


## License: MIT
https://github.com/woliveiras/blog/blob/6c69f8d59960e8135fbae38107563b6e8f43add8/src/content/config.ts

```
() =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              }),
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    }
```


## License: unbekannt
https://github.com/tieppt/tiepptwind/blob/54d01a16e90cdbfe27b9f92f49a448769685b87d/src/content/config.ts

```
() =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              }),
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    }
```

