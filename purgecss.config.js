module.exports = {
  content: ["./src/**/*.{astro,ts,tsx,jsx,js,html}"],
  css: ["./public/tailwind-out.css"],
  safelist: [
    // Dynamic or pattern-based classes
    /^btn-/, // e.g., btn-primary, btn-secondary
    /^bg-/, // e.g., bg-primary, bg-secondary, bg-neutral, bg-gradient, etc.
    /^text-/, // e.g., text-primary, text-muted, text-heading, etc.
    /^md:/, // Responsive classes
    /^lg:/,
    /^xl:/,
    /^2xl:/,
    /^rtl:/, // RTL support classes
    /^dark:/, // Dark mode classes
    /^motion-safe:/, // Motion-safe classes
    /^intersect-/, // Intersection observer animation classes
    /^font-/, // Font classes
    /^rounded-/, // Border radius
    /^border-/, // Border classes
    /^shadow-/, // Shadow classes
    /^gap-/, // Gap utilities
    /^flex/, // Flex utilities
    /^grid/, // Grid utilities
    // Add any other patterns or specific classes you know are used dynamically
  ],
  output: "./public/purged-tailwind.css",
};
