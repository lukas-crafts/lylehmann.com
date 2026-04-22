---
name: lylehmann.com
version: 1.0.0
description: Personal brand identity using Tailwind CSS v4 with hex colors.

colors:
  background: "#09090b"
  foreground: "#fafafa"
  muted: "#a1a1aa"
  border: "#27272a"
  primary: "#10b981"
  secondary: "#3b82f6"
  accent: "#10b981"

typography:
  font-sans: "Inter, ui-sans-serif, system-ui, sans-serif"
  font-heading: "Outfit, ui-sans-serif, system-ui, sans-serif"
  
  h1: { fontSize: "3rem", fontWeight: "800", letterSpacing: "-0.05em" }
  h2: { fontSize: "2rem", fontWeight: "700", letterSpacing: "-0.025em" }
  h3: { fontSize: "1.5rem", fontWeight: "600" }
  body: { fontSize: "1rem", lineHeight: "1.6" }
  small: { fontSize: "0.875rem" }

rounded:
  sm: "0.125rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
  "2xl": "1rem"
  full: "9999px"

spacing:
  scale: "4px"
  container: "80rem"

components:
  button-primary:
    backgroundColor: "#fafafa"
    textColor: "#09090b"
    rounded: "full"
    padding: "0.5rem 1.25rem"
  
  button-accent:
    backgroundColor: "#10b981"
    textColor: "#ffffff"
    rounded: "1rem"
    padding: "1rem 1.5rem"
  
  card:
    backgroundColor: "#09090b"
    textColor: "#fafafa"
    rounded: "1rem"
    padding: "1rem"
---

# Overview
Lukas Yair Lehmann's personal brand identity uses **Tailwind CSS v4** with a dark mode aesthetic.

# Colors
- **Primary:** Emerald `#10b981` - brand accent
- **Background:** `#09090b` - dark surface (zinc-950)
- **Foreground:** `#fafafa` - high contrast text (zinc-50)
- **Muted:** `#a1a1aa` - secondary text (zinc-400)
- **Border:** `#27272a` - subtle borders (zinc-800)

# Typography
- **Headings:** Outfit (tight tracking, bold weights)
- **Body:** Inter (readable, accessible)

# Components
- **Buttons:** High-contrast (white on dark) or brand-accent (white on emerald)
- **Cards:** Dark surface with subtle borders