import json
import os
from datetime import datetime

# Path to the JSON file
JSON_PATH = "/Users/lukaslehmann/Downloads/GoodLinks-Export-2026-03-16-10-59.json"
OUTPUT_PATH = "/Users/lukaslehmann/Developer/lylehmann.com/bookmarks.html"

def load_data(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def format_date(timestamp):
    if not timestamp:
        return ""
    return datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")

def generate_html(data):
    # Sort by addedAt descending
    data.sort(key=lambda x: x.get("addedAt", 0), reverse=True)

    # Get unique tags for filtering
    all_tags = set()
    for item in data:
        for tag in item.get("tags", []):
            all_tags.add(tag)
    sorted_tags = sorted(list(all_tags))

    html_template = """
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookmarks Index</title>
    <!-- Tailwind CSS Play CDN (Optimized for development/standalone) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            primary: '#10b981', // Emerald
                            dark: '#09090b', // Zinc 950
                        }
                    }
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        @layer base {
            body {
                @apply bg-brand-dark text-zinc-100 antialiased;
            }
        }
        .glass {
            @apply bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 shadow-xl;
        }
        .bookmark-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .bookmark-card:hover {
            @apply transform -translate-y-1 shadow-2xl border-emerald-500/30;
        }
    </style>
</head>
<body class="min-h-screen p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <header class="mb-12 text-center animate-fade-in">
            <h1 class="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                My Bookmarks
            </h1>
            <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
                A curated collection of {count} links across tech, design, and philosophy.
            </p>
        </header>

        <!-- Search and Filter Bar -->
        <div class="sticky top-4 z-50 mb-8">
            <div class="glass p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
                <div class="relative w-full">
                    <input type="text" id="searchInput" placeholder="Search keywords, titles, or tags..." 
                           class="w-full bg-zinc-800/50 border border-zinc-700 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                    <svg class="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div class="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <button onclick="filterByTag('all')" class="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium whitespace-nowrap active-tag-btn">All</button>
                    <!-- Tags will be dynamically handled or pre-rendered if small, but with 1400 items, we might want a dropdown or search-based tag filter -->
                    <select id="tagSelect" class="bg-zinc-800 border border-zinc-700 p-2 rounded-lg focus:outline-none">
                        <option value="all">Filter by Tag</option>
                        {tag_options}
                    </select>
                </div>
            </div>
            <div id="stats" class="text-xs text-zinc-500 mt-2 px-4 flex justify-between">
                <span id="resultCount">Showing {count} items</span>
                <span>Sorted by Most Recent</span>
            </div>
        </div>

        <!-- Bookmarks Grid -->
        <div id="bookmarksGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmark_items}
        </div>
    </div>

    <!-- Script to handle search and filtering -->
    <script>
        const searchInput = document.getElementById('searchInput');
        const tagSelect = document.getElementById('tagSelect');
        const grid = document.getElementById('bookmarksGrid');
        const cards = Array.from(grid.getElementsByClassName('bookmark-item'));
        const resultCount = document.getElementById('resultCount');

        function filter() {
            const query = searchInput.value.toLowerCase();
            const tag = tagSelect.value;
            let visibleCount = 0;

            cards.forEach(card => {
                const title = card.dataset.title.toLowerCase();
                const summary = card.dataset.summary.toLowerCase();
                const tags = card.dataset.tags.toLowerCase();
                const matchesSearch = title.includes(query) || summary.includes(query) || tags.includes(query);
                const matchesTag = tag === 'all' || tags.includes(tag.toLowerCase());

                if (matchesSearch && matchesTag) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            resultCount.textContent = `Showing ${visibleCount} items`;
        }

        searchInput.addEventListener('input', filter);
        tagSelect.addEventListener('change', filter);

        // Initial animation
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i < 50 ? i * 20 : 0); // Only animate first 50 for performance
        });
    script>
</body>
</html>
"""

    tag_options = "".join([f'<option value="{tag}">{tag}</option>' for tag in sorted_tags])

    bookmark_items = []
    for item in data:
        title = item.get("title", "Untitled")
        url = item.get("url", "#")
        summary = item.get("summary", "")
        tags = item.get("tags", [])
        added_at = format_date(item.get("addedAt"))
        tags_str = ", ".join(tags)
        
        tag_badges = "".join([f'<span class="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] border border-zinc-700">{tag}</span>' for tag in tags])

        item_html = f"""
        <div class="bookmark-item bookmark-card glass p-5 rounded-2xl flex flex-col justify-between" 
             data-title="{title.replace('"', '&quot;')}" 
             data-summary="{summary.replace('"', '&quot;')}" 
             data-tags="{tags_str.replace('"', '&quot;')}">
            <div>
                <div class="flex justify-between items-start mb-3">
                    <span class="text-zinc-500 text-[10px] font-mono">{added_at}</span>
                    <div class="flex flex-wrap gap-1 justify-end">
                        {tag_badges}
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-2 group">
                    <a href="{url}" target="_blank" class="hover:text-emerald-400 transition-colors line-clamp-2">
                        {title}
                    </a>
                </h3>
                <p class="text-zinc-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {summary}
                </p>
            </div>
            <div class="flex items-center justify-between border-t border-zinc-800/50 pt-4 mt-2">
                <span class="text-xs text-zinc-600 truncate max-w-[150px]">{url}</span>
                <a href="{url}" target="_blank" class="p-2 rounded-lg bg-zinc-800 hover:bg-emerald-500/20 text-emerald-400 transition-all">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 012-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
        """
        bookmark_items.append(item_html)

    final_html = html_template.format(
        count=len(data),
        tag_options=tag_options,
        bookmark_items="".join(bookmark_items)
    )

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(final_html)
    
    print(f"Generated {OUTPUT_PATH} with {len(data)} items.")

if __name__ == "__main__":
    try:
        data = load_data(JSON_PATH)
        generate_html(data)
    except Exception as e:
        print(f"Error: {e}")
