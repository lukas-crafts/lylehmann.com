
export const SITE = {
  "name": "lylehmann",
  "site": "https://lylehmann.com",
  "base": "/",
  "trailingSlash": false,
  "googleSiteVerificationId": "0huXZJ-6uK_goDlERB78YvAOL04Gfh8oBM6dTztEC0Y"
};
export const I18N = {
  "language": "en",
  "textDirection": "ltr"
};
export const METADATA = {
  "title": {
    "default": "lylehmann",
    "template": "%s - lylehmann"
  },
  "description": "Creating accessible digital experiences that work for everyone. From disability advocacy to UX design, building inclusive solutions that embrace user needs.",
  "robots": {
    "index": true,
    "follow": true
  },
  "openGraph": {
    "type": "website",
    "site_name": "lylehmann",
    "images": [
      {
        "url": "~/assets/images/lylehmann.jpeg",
        "width": 1200,
        "height": 628
      }
    ]
  },
  "twitter": {
    "handle": "@onwidget",
    "site": "@onwidget",
    "cardType": "summary_large_image"
  }
};
export const APP_BLOG = {
  "isEnabled": true,
  "postsPerPage": 6,
  "isRelatedPostsEnabled": true,
  "relatedPostsCount": 4,
  "post": {
    "isEnabled": true,
    "permalink": "/portfolio/%slug%",
    "robots": {
      "index": true,
      "follow": true
    }
  },
  "list": {
    "isEnabled": true,
    "pathname": "portfolio",
    "robots": {
      "index": true,
      "follow": true
    }
  },
  "category": {
    "isEnabled": true,
    "pathname": "category",
    "robots": {
      "index": true,
      "follow": true
    }
  },
  "tag": {
    "isEnabled": true,
    "pathname": "tag",
    "robots": {
      "index": false,
      "follow": true
    }
  }
};
export const UI = {
  "theme": "system"
};
export const ANALYTICS = {
  "vendors": {
    "googleAnalytics": {
      "id": "G-0000000000",
      "partytown": true
    }
  }
};
