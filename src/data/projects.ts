export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  author?: string;
  excerpt?: string;
  category?: string;
  cover?: string;
  ogImage?: string;
  publishDate?: string;
  metadata?: Record<string, any>;
  content?: string;
  hero?: {
    title: string;
    subtitle: string;
    image: { src: string; alt: string; width?: number; height?: number };
  };
  features?: Array<{ title: string; description: string; icon: string }>;
  stats?: Array<{ title: string }>;
  steps?: Array<{ title: string; description: string; icon: string }>;
  designElements?: Array<{ title: string; description: string; icon: string }>;
  outcomes?: Array<{ title: string }>;
  insights?: Array<{ title: string; description: string; icon: string }>;
  faqs?: Array<{ title: string; description: string }>;
}

export const projects: Project[] = [
  {
    id: "azulverdoso-case-study",
    title: "Azulverdoso",
    description: "A website that shows handmade ceramics and makes it easy for people to see and buy them.",
    image: "/assets/images/Azulverdoso-home-hero.png",
    tags: ["Web", "Shop", "Design", "Accessibility"],
    hero: {
      title: "Azulverdoso: Crafting a Digital Home for Artisanal Ceramics",
      subtitle: "Transforming an artisanal brand's online presence through thoughtful UI/UX design",
      image: {
        src: "https://images.pexels.com/photos/7948434/pexels-photo-7948434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "Mexican Halloween Souvenirs"
      }
    },
    features: [
      { title: "Limited Online Presence", description: "Reliance on Facebook as the sole platform for online visibility", icon: "tabler:world" },
      { title: "Product Showcase Constraints", description: "Inability to display the full range of artisanal ceramics and restored objects", icon: "tabler:photo" },
      { title: "Lack of E-commerce", description: "Absence of an online sales platform to reach a broader customer base", icon: "tabler:shopping-cart" }
    ],
    stats: [
      { title: "Easy Navigation" },
      { title: "High-Quality Product Images" },
      { title: "Secure Online Purchases" },
      { title: "Detailed Product Information" }
    ],
    steps: [
      { title: "Research", description: "Analyzed Azulverdoso's Facebook presence, studied competitor websites, and conducted a business interview with Yola Santos.", icon: "tabler:search" },
      { title: "Ideation", description: "Created mood boards to capture Azulverdoso's aesthetic and sketched initial concepts for website layout and functionality.", icon: "tabler:bulb" },
      { title: "Prototyping", description: "Developed low-fidelity wireframes, mid-fidelity prototypes, and high-fidelity mockups using Adobe XD.", icon: "tabler:lego" },
      { title: "Testing", description: "Gathered feedback from Yola Santos and iterated on designs based on user and stakeholder input.", icon: "tabler:test-pipe" }
    ],
    designElements: [
      { title: "Brand Colors", description: "Utilized Azulverdoso's brand colors to maintain consistency across the website", icon: "tabler:palette" },
      { title: "Typography", description: "Selected fonts that align with the brand's artistic aesthetic", icon: "tabler:typography" },
      { title: "Homepage Showcase", description: "Designed a visually striking homepage to feature ceramic pieces", icon: "tabler:home" },
      { title: "Online Gallery", description: "Created an online gallery to display the full range of Azulverdoso products", icon: "tabler:photo" },
      { title: "E-commerce Functionality", description: "Implemented e-commerce features for direct sales", icon: "tabler:shopping-cart" },
      { title: "About Page", description: "Developed an about page highlighting Yola Santos' artistic process and brand story", icon: "tabler:info-circle" }
    ],
    outcomes: [
      { title: "User-Friendly Website" },
      { title: "E-commerce Solution" },
      { title: "Product Showcase" },
      { title: "Online Presence" }
    ],
    insights: [
      { title: "Balancing Aesthetics and Functionality", description: "Creating a visually appealing website that also serves as an effective e-commerce platform requires careful consideration of both design and user experience elements.", icon: "tabler:palette" },
      { title: "Iterative Design Process", description: "The importance of gathering and incorporating feedback from stakeholders and potential users cannot be overstated in achieving a successful final product.", icon: "tabler:refresh" },
      { title: "Adobe XD Proficiency", description: "Gained practical experience in using Adobe XD for end-to-end UX/UI design, from wireframing to high-fidelity prototypes.", icon: "tabler:brand-adobe-xd" },
      { title: "Artisanal Brand Representation", description: "Learned how to effectively translate a brand's unique aesthetic and story into a digital format, preserving its artisanal essence while embracing modern e-commerce capabilities.", icon: "tabler:brush" }
    ],
    faqs: [
      { title: "What was the main goal of the Azulverdoso website design project?", description: "To create a dedicated website for Azulverdoso, showcasing their artisanal ceramics and expanding their customer base beyond Facebook. The site aimed to authentically represent Mexican artisanal aesthetics while appealing to an international audience." },
      { title: "How was the e-commerce functionality addressed in the project?", description: "While full e-commerce implementation wasn't finalized in this phase, the design laid the groundwork for future integration. This aspect remains crucial for further improvement, allowing direct online sales and expanding Azulverdoso's global reach." },
      { title: "Was responsive design considered in the project?", description: "Yes, responsive design was a key focus to ensure accessibility. The website was designed to be fully functional on mobile devices, allowing users to view and potentially order Yola's products from smartphones and tablets, enhancing the overall user experience." },
      { title: "What was the key challenge in this project?", description: "Navigating intercultural communication and design preferences was our primary challenge. We faced language barriers and time zone differences with Yola, the Mexican artist. Ruben, as Yola's brother, played a crucial role in bridging these gaps, acting as both an illustrator and cultural liaison to ensure effective communication and authentic representation of Azulverdoso's brand." }
    ]
  },
  {
    id: "brushbuddy-case-study",
    title: "BrushBuddy",
    description: "An app that makes brushing your teeth fun and easy for kids.",
    image: "/assets/images/BrushingBuddy-home-hero.png",
    cover: "/assets/images/BrushingBuddy-home-hero.png",
    tags: ["App", "Kids", "Mobile", "Game"],
    hero: {
      title: "BrushBuddy: A Fun and Educational Toothbrushing Experience",
      subtitle: "Transforming toothbrushing into a playful and engaging activity for children",
      image: { src: "/assets/images/BrushingBuddy-home-hero.png", alt: "BrushBuddy app showing gamification and music integration features" }
    },
    features: [
      { title: "Educational Content Development", description: "Creating engaging and educational content that is both entertaining and informative for children.", icon: "tabler:book" },
      { title: "Interactive Game Design", description: "Developing a user-friendly interface that allows children to easily navigate and interact with the app.", icon: "tabler:device-gamepad-2" },
      { title: "Cross-Platform Compatibility", description: "Ensuring the app works seamlessly across different mobile devices and operating systems.", icon: "tabler:device-laptop" }
    ],
    stats: [
      { title: "Engaging and Fun Gameplay" },
      { title: "High-Quality Illustrations" },
      { title: "Easy-to-Understand Navigation" },
      { title: "Safe and Secure Environment" }
    ],
    steps: [
      { title: "Research", description: "Studied existing toothbrushing apps and children's app design trends to understand user expectations and preferences.", icon: "tabler:search" },
      { title: "Ideation", description: "Created mood boards and sketches to define the app's visual style and user flow. Focused on a cartoonish, playful design.", icon: "tabler:bulb" },
      { title: "Prototyping", description: "Developed low-fidelity wireframes and mid-fidelity prototypes using Adobe XD to refine the user flow and visual design.", icon: "tabler:lego" },
      { title: "Testing", description: "Gathered feedback from children and parents to iterate on the design and content based on user feedback.", icon: "tabler:test-pipe" }
    ],
    designElements: [
      { title: "Cartoonish Design", description: "Utilized a cartoonish and playful design language to appeal to children's visual preferences.", icon: "tabler:palette" },
      { title: "Colorful Animations", description: "Added engaging animations and transitions to make the app more interactive and entertaining.", icon: "tabler:live-photo" },
      { title: "Easy-to-Use Navigation", description: "Designed a simple and intuitive navigation structure that children can easily grasp.", icon: "tabler:navigation" },
      { title: "Safe and Secure Environment", description: "Implemented robust security measures and parental controls to ensure a safe and secure experience for children.", icon: "tabler:shield" }
    ],
    outcomes: [
      { title: "Engaging and Educational App" },
      { title: "Positive User Feedback" },
      { title: "Cross-Platform Compatibility" },
      { title: "Safe and Secure Environment" }
    ],
    insights: [
      { title: "Insights and Lessons Learned", description: "Key takeaways from the BrushBuddy development project:", icon: "tabler:bulb" },
      { title: "User-Centered Design", description: "Designing for children requires a playful, intuitive, and safe approach.", icon: "tabler:user" },
      { title: "Iterative Testing", description: "Frequent feedback from real users (children and parents) is crucial.", icon: "tabler:refresh" }
    ],
    faqs: [
      { title: "What was the main goal of the BrushBuddy app?", description: "To make toothbrushing fun and educational for children, encouraging healthy habits through gamification." },
      { title: "How was safety addressed?", description: "The app includes parental controls and robust privacy measures to ensure a safe environment for kids." }
    ]
  },
  {
    id: "fashion-museum-case-study",
    title: "Fashion Museum",
    description: "A website for a museum that shows fashion history in a fun and simple way.",
    image: "/assets/images/FHM-home-hero.png",
    cover: "/assets/images/FHM-home-hero.png",
    ogImage: "/assets/images/FHM-home-hero.png",
    tags: ["Museum", "Web", "Design", "Content"],
    author: "Lukas Yair Lehmann",
    hero: {
      title: "Fashion Heritage Museum App - UX Design Concept",
      subtitle: "A comprehensive exploration of digital solutions for museum visitor experiences",
      image: { src: "/assets/images/FHM-home-hero.png", alt: "A comprehensive exploration of digital solutions for museum visitor experiences" }
    },
    features: [
      { title: "Information Overload", description: "Museums often overwhelm visitors with too much information", icon: "tabler:info-circle" },
      { title: "Navigation Complexity", description: "Visitors struggle to understand exhibit layouts", icon: "tabler:map" },
      { title: "Limited Interaction", description: "Minimal engagement with exhibit content", icon: "tabler:device-mobile" }
    ],
    steps: [
      { title: "Team Research", description: "Conducted interviews and surveys with museum visitors", icon: "tabler:search" },
      { title: "Collaborative Ideation", description: "Brainstormed and created low-fidelity wireframes together", icon: "tabler:brain" },
      { title: "Mid-Fidelity Prototyping", description: "Developed shared prototype to validate core concepts", icon: "tabler:device-desktop" },
      { title: "Design Divergence", description: "Team split to create two unique high-fidelity versions", icon: "tabler:git-branch" }
    ],
    designElements: [
      { title: "Mobile App Concept", description: "Personalized, portable museum guide for individual visitors", icon: "tabler:device-mobile" },
      { title: "Museum Touchscreen Version", description: "Interactive in-museum digital interface for exhibit exploration", icon: "tabler:device-tablet" },
      { title: "Shared Design Principles", description: "Consistent user experience across different interfaces", icon: "tabler:puzzle" },
      { title: "Accessibility Focus", description: "Inclusive design for diverse user needs", icon: "tabler:accessible" }
    ],
    insights: [
      { title: "Why did we split into two versions?", description: "To explore different design solutions and learn from diverse approaches to the same problem.", icon: "tabler:chevron-right" },
      { title: "What was the biggest design challenge?", description: "Creating a digital experience that enhances, not replaces, the physical museum visit.", icon: "tabler:chevron-right" },
      { title: "What did we learn?", description: "The importance of user-centered design and collaborative problem-solving.", icon: "tabler:chevron-right" }
    ]
  },
  {
    id: "mettacafe-case-study",
    title: "Metta Cafe",
    description: "A website for a café in Munich where you can eat, relax, and do yoga. Easy to use for everyone.",
    image: "/assets/images/METTA-home-hero.png",
    cover: "/assets/images/METTA-home-hero.png",
    ogImage: "/assets/images/METTA-home-hero.png",
    tags: ["Cafe", "Web", "Yoga", "Food"],
    author: "Lukas Lehmann & Beyza Özsel",
    hero: {
      title: "Metta Cafe - Bridging Digital and Physical Experiences in Munich",
      subtitle: "How we transformed a unique Munich venue combining café, bakery and yoga into an engaging digital experience through thoughtful UX design.",
      image: { src: "/assets/images/METTA-home-hero.png", alt: "Metta Cafe digital transformation hero" }
    },
    features: [
      { title: "Limited Online Presence", description: "No dedicated platform for showcasing offerings", icon: "tabler:world" },
      { title: "Complex Information Structure", description: "Multiple services requiring clear organization", icon: "tabler:stack-2" },
      { title: "Booking Friction", description: "No online system for yoga classes", icon: "tabler:calendar-x" },
      { title: "Dietary Information Access", description: "Difficulty finding vegan and gluten-free options", icon: "tabler:leaf" }
    ],
    stats: [
      { title: "60% Online booking for Yoga classes" },
      { title: "37% Menu and Dietary information" },
      { title: "Mobile-friendly menu access" },
      { title: "Class schedule & product information" }
    ],
    steps: [
      { title: "Empathize", description: "Conducted interviews with yoga practitioners and café regulars. Analyzed pain points in accessing venue information and services.", icon: "tabler:users" },
      { title: "Define", description: "Created personas including The Health-Conscious Professional and The Yoga Enthusiast. Mapped user journeys across different services.", icon: "tabler:user" },
      { title: "Ideate", description: "Integrated booking system for yoga classes, dietary filter system for menu items, and mobile-first design approach.", icon: "tabler:bulb" },
      { title: "Prototype & Test", description: "Created interactive prototypes for both web and mobile. Conducted usability testing with target user groups.", icon: "tabler:device-desktop" }
    ],
    designElements: [
      { title: "Unified Experience", description: "Created a seamless connection between the three core offerings - café, bakery, and yoga studio - while maintaining distinct identity for each service.", icon: "tabler:link" },
      { title: "Accessibility First", description: "Implemented clear dietary labeling and intuitive navigation to ensure all users could easily find relevant information and services.", icon: "tabler:accessible" },
      { title: "Mobile Optimization", description: "Developed a responsive design that prioritizes mobile users while maintaining full functionality across all devices.", icon: "tabler:device-mobile" }
    ],
    outcomes: [
      { title: "Smart Booking System" },
      { title: "Dietary Filters" },
      { title: "Product Showcase" },
      { title: "Mobile Experience" }
    ],
    insights: [
      { title: "What was the biggest challenge in designing for multiple services?", description: "Balancing the distinct needs of each service while maintaining a cohesive user experience proved both challenging and rewarding. It taught us the importance of information architecture in complex systems.", icon: "tabler:scale" },
      { title: "How did user research impact the final design?", description: "User insights led to crucial features like dietary filters and mobile optimization, showing how direct user input shapes better solutions.", icon: "tabler:search" },
      { title: "What was the most valuable team learning?", description: "Collaborating closely with Beyza taught us the value of diverse perspectives in solving complex design challenges.", icon: "tabler:users" },
      { title: "How did this project influence your approach to UX design?", description: "This project reinforced the importance of designing for real user needs while balancing business objectives and technical constraints.", icon: "tabler:target" }
    ]
  },
  {
    id: "lieferando-case-study",
    title: "Lieferando",
    description: "A mobile app that helps you order food from your favorite restaurants. Easy to use for everyone.",
    image: "/assets/images/Lieferando-home-hero.png",
    tags: ["App", "Food", "Mobile", "Delivery"],
    hero: {
      title: "Lieferando: Redesigning the Food Delivery Experience",
      subtitle: "Creating a more intuitive and streamlined ordering process for a food delivery platform",
      image: { src: "/assets/images/Lieferando-home-hero.png", alt: "Food delivery app" }
    },
    features: [
      { title: "Responsive Design", description: "Ensuring the website is fully functional and visually appealing across all device sizes.", icon: "tabler:device-laptop" },
      { title: "User Feedback Integration", description: "Developing a system to effectively collect and incorporate user feedback.", icon: "tabler:message-2" },
      { title: "Visual Appeal", description: "Creating a more visually appealing and engaging interface to increase user retention.", icon: "tabler:eye" }
    ],
    stats: [
      { title: "Easy Online Ordering" },
      { title: "High-Quality Product Images" },
      { title: "Secure Online Purchases" },
      { title: "Detailed Product Information" }
    ],
    steps: [
      { title: "Research", description: "Studied Lieferando's existing platform, user research, and competitor websites to understand user needs and design trends.", icon: "tabler:search" },
      { title: "Ideation", description: "Created mood boards and sketches to define the website's visual style and user flow. Focused on a modern, minimalist design with a strong emphasis on accessibility and usability.", icon: "tabler:bulb" },
      { title: "Prototyping", description: "Developed low-fidelity wireframes and mid-fidelity prototypes using Adobe XD to refine the user flow and visual design.", icon: "tabler:lego" },
      { title: "Testing", description: "Gathered feedback from Lieferando staff and users to iterate on the design and content based on user feedback.", icon: "tabler:test-pipe" }
    ],
    designElements: [
      { title: "Modern Minimalist Design", description: "Utilized a modern, minimalist design language to create a clean and professional look.", icon: "tabler:palette" },
      { title: "Responsive Grid System", description: "Implemented a responsive grid system to ensure content is displayed optimally across all device sizes.", icon: "tabler:layout-grid" },
      { title: "Interactive Galleries", description: "Designed interactive image galleries with smooth transitions and zoom capabilities.", icon: "tabler:photo" },
      { title: "Filter and Search", description: "Implemented advanced filtering and search functionality to help users find specific items easily.", icon: "tabler:search" },
      { title: "Accessible Design", description: "Focused on accessibility, ensuring that all features are usable by people with disabilities.", icon: "tabler:wheelchair" },
      { title: "User Feedback Integration", description: "Designed a system to effectively collect and incorporate user feedback, including a dedicated feedback section and a streamlined feedback form.", icon: "tabler:message-2" }
    ],
    outcomes: [
      { title: "User-Friendly Website" },
      { title: "E-commerce Solution" },
      { title: "Product Showcase" },
      { title: "Online Presence" }
    ],
    insights: [
      { title: "User-Centric Design", description: "Understanding and incorporating user feedback is crucial in creating a successful and engaging app. User preferences and comfort are paramount.", icon: "tabler:user-check" },
      { title: "Cross-Platform Development", description: "Gained experience in developing for multiple platforms (iOS, Android) and ensuring consistent user experience across devices.", icon: "tabler:device-laptop" },
      { title: "Adobe XD Proficiency", description: "Practical experience in using Adobe XD for end-to-end UX/UI design, from wireframing to high-fidelity prototypes.", icon: "tabler:brand-adobe-xd" },
      { title: "Brand Representation", description: "Learned how to effectively translate a brand's unique aesthetic and story into a digital format, preserving its essence while embracing modern e-commerce capabilities.", icon: "tabler:brush" }
    ],
    faqs: [
      { title: "What is the main purpose of the Lieferando redesign?", description: "The main purpose of the Lieferando redesign is to create a more intuitive and streamlined ordering process for a food delivery platform, improving user experience and increasing conversion rates." },
      { title: "Is the website and mobile app accessible?", description: "Yes, both the website and mobile app are designed with accessibility in mind. They include features like alt text for images, keyboard navigation, and ARIA labels for screen readers." },
      { title: "Can users order food and beverages online?", description: "Yes, users can easily order food and beverages online through the website or mobile app. The platform supports various payment methods and includes a secure checkout process." },
      { title: "How is the feedback integrated?", description: "The feedback is integrated through a dedicated feedback section and a streamlined feedback form. Users can provide suggestions, report issues, or share their overall experience." }
    ]
  },
  {
    id: "focusbuddy-case-study",
    title: "FocusBuddy",
    description: "A Mac app that helps you stay focused and get things done. Great for anyone who finds it hard to concentrate.",
    tags: ["App", "Focus", "Mac", "Accessibility"],
    cover: "/assets/images/FocusBuddy-home-hero.png",
    hero: {
      title: "FocusBuddy: A Safe Space for Focus and Accountability",
      subtitle: "A macOS app that fosters focus, accountability, and connection for neurodivergent users.",
      image: { src: "/assets/images/FocusBuddy-home-hero.png", alt: "Screenshot of FocusBuddy macOS app UI" }
    },
    features: [
      { icon: "tabler:focus-2", title: "Distraction-Free Sessions", description: "Guided focus sessions with customizable timers and gentle reminders to help users stay on track." },
      { icon: "tabler:users", title: "Accountability Partner", description: "Connect with a friend or coach for real-time check-ins and shared focus sessions." },
      { icon: "tabler:wheelchair", title: "Accessible by Design", description: "High-contrast UI, keyboard navigation, and screen reader support for all users." },
      { icon: "tabler:users", title: "Community Support", description: "Join a supportive community of users with similar goals and challenges." }
    ],
    stats: [
      { title: "1,200+ Users" },
      { title: "10,000+ Focus Sessions Completed" },
      { title: "45 min Avg. Session Length" },
      { title: "100% Accessibility Score" }
    ],
    steps: [
      { title: "Research & Interviews", description: "Conducted interviews with neurodivergent users to understand their focus challenges and needs.", icon: "tabler:search" },
      { title: "Prototyping", description: "Designed and iterated on wireframes and interactive prototypes in Figma.", icon: "tabler:bulb" },
      { title: "Development", description: "Built the app using React, Electron, and TypeScript with a focus on accessibility.", icon: "tabler:code" },
      { title: "Testing & Feedback", description: "Gathered feedback from beta users and improved the app based on real-world use.", icon: "tabler:test-pipe" }
    ],
    designElements: [
      { title: "Gentle Color Palette", description: "Soft blues and purples reduce visual stress and support focus.", icon: "tabler:palette" },
      { title: "Large, Clear Typography", description: "Readable fonts and clear hierarchy for users with dyslexia or ADHD.", icon: "tabler:typography" },
      { title: "Minimal UI", description: "Only essential controls are visible during focus sessions to reduce distractions.", icon: "tabler:eye-off" }
    ],
    outcomes: [
      { title: "Improved focus and productivity for neurodivergent users." },
      { title: "Positive feedback on accessibility and community features." },
      { title: "Adopted by several ADHD coaching groups." }
    ],
    insights: [
      { title: "Social Presence Matters", description: "Users reported that knowing someone else was present—even virtually—helped them stay accountable.", icon: "tabler:users" },
      { title: "Accessibility is Non-Negotiable", description: "Accessible design choices benefited all users, not just those with disabilities.", icon: "tabler:wheelchair" }
    ],
    faqs: [
      { title: "Is FocusBuddy only for neurodivergent users?", description: "No, anyone who wants to improve their focus and accountability can benefit from FocusBuddy." },
      { title: "Does FocusBuddy work offline?", description: "Yes, core focus features work offline. Community and accountability features require an internet connection." }
    ],
    links: [
      { label: "Website", url: "https://focusbuddy.app" },
      { label: "GitHub", url: "https://github.com/lylehmann/focusbuddy" }
    ]
  },
  {
    id: "julio-digital-makeover-case-study",
    title: "Julio",
    description: "A website for a musician to share music and connect with fans. Simple and fun to use.",
    image: "/assets/images/Julio-home-hero.png",
    tags: ["Web", "Music", "Artist", "Design"],
    hero: {
      title: "Drumming Up Success - Julio's Digital Makeover",
      subtitle: "How a talented Cuban percussionist and teacher set the stage for an impactful digital presence with a strategic website concept.",
      image: { src: "/assets/images/Julio-home-hero.png", alt: "Julio digital makeover hero" }
    },
    features: [
      { title: "No Online Presence", description: "Julio lacked a website and cohesive digital strategy.", icon: "tabler:world-off" },
      { title: "Dual Audience Challenge", description: "Needed to target both music students and performance clients.", icon: "tabler:users" },
      { title: "Brand Clarity", description: "Required clear messaging to position Julio as both teacher and performer.", icon: "tabler:message" }
    ],
    stats: [
      { title: "Market Analysis for Vienna" },
      { title: "4 Detailed Personas" },
      { title: "Comprehensive Website Blueprint" },
      { title: "Operational Plan Ready for Relaunch" }
    ],
    steps: [
      { title: "Analyse", description: "Conducted market and competitor analysis, defined target audiences, and performed SWOT analysis.", icon: "tabler:search" },
      { title: "Strategy", description: "Developed a roadmap to position Julio as an expert in Afro-Cuban percussion, defined goals, personas, and creative vision.", icon: "tabler:bulb" },
      { title: "Operational Concepts", description: "Outlined actionable steps: website structure, backlink strategies, testimonials, events calendar, press kit, FAQs, pricing, and course descriptions.", icon: "tabler:checklist" },
      { title: "Planning & Evaluation", description: "Created a detailed timeline, cost plan, and KPIs for monitoring success.", icon: "tabler:calendar-stats" }
    ],
    designElements: [
      { title: "Cuban Heritage Emphasis", description: "Core messaging and visuals aligned with Julio's Cuban roots.", icon: "tabler:music" },
      { title: "Responsive Website Structure", description: "Blueprint for a site with distinct sections for lessons and performances.", icon: "tabler:layout" },
      { title: "Content Strategy", description: "Strategic content for both student and performance audiences.", icon: "tabler:notes" }
    ],
    outcomes: [
      { title: "Market and Competitor Analysis" },
      { title: "Personas and Content Strategy" },
      { title: "Website Blueprint and Operational Plan" }
    ],
    insights: [
      { title: "Main Challenge", description: "Balancing content for two distinct audiences: students and performance clients.", icon: "tabler:scale" },
      { title: "Intercultural Communication", description: "Collaboration required translation and cultural sensitivity.", icon: "tabler:language" },
      { title: "Accessibility Improvements", description: "Future improvements include screen reader compatibility, color contrast, and transcripts for media.", icon: "tabler:eye" },
      { title: "Outcome", description: "A structured approach built a strong digital presence, ready for relaunch after relocation.", icon: "tabler:rocket" }
    ],
    faqs: [
      { title: "What was the main challenge of this project?", description: "Creating a website that effectively targeted two distinct audiences: performance clients and students." },
      { title: "What intercultural challenges did you face?", description: "Julio mostly spoke in Spanish, so Isabella helped with translation to ensure clear communication." },
      { title: "What further improvements can be made?", description: "Enhancing accessibility: screen reader compatibility, color contrast, and transcripts for audio/video content." },
      { title: "What was the outcome of the project?", description: "A comprehensive plan and blueprint for Julio's digital presence, ready to be relaunched in his new location." }
    ]
  },
  {
    id: "obi-chatbot-case-study",
    title: "OBI Chatbot",
    description: "We made OBI's brand friendlier and added a chatbot that helps people find what they need and answers questions online.",
    image: "/assets/images/Timo-home-hero.png",
    tags: ["Brand", "Service", "Chatbot", "Support"],
    hero: {
      title: "Redefining Customer Support for OBI with AI-Driven Chatbots",
      subtitle: "Discover how we conceptualized a chatbot that transforms the DIY experience for a tech-savvy audience, using the Branded Interaction Framework.",
      image: { src: "/assets/images/Timo-home-hero.png", alt: "Timo Tüftler OBI chatbot hero image" }
    },
    features: [
      { title: "Limited After-Hours Support", description: "Customers needed help beyond traditional business hours.", icon: "tabler:clock" },
      { title: "Inconsistent Communication", description: "Disjointed messaging diluted the brand experience.", icon: "tabler:message-2" },
      { title: "High Volume of Inquiries", description: "Manual responses weren’t scalable.", icon: "tabler:users-group" }
    ],
    stats: [
      { title: "Efficient Customer Communication" },
      { title: "Strengthening Brand Values" },
      { title: "Personalized Recommendations" },
      { title: "Reducing Customer Service Costs" }
    ],
    steps: [
      { title: "Discover", description: "Analyzed competitors like Hornbach and Bauhaus. Mapped OBI’s brand identity with Brand Filters and Limbic Maps. Created personas like 'The DIY Enthusiast' to align with target users.", icon: "tabler:search" },
      { title: "Define", description: "Identified gaps in customer support. Crafted a chatbot persona aligned with OBI’s values. Mapped conversational flows using Miro.", icon: "tabler:target" },
      { title: "Ideate", description: "Developed story maps to visualize the user journey. Ensured scalability for future use cases like DIY guides and voice integration.", icon: "tabler:bulb" },
      { title: "Prototype & Test", description: "Created interactive prototypes and conducted usability testing with target user groups.", icon: "tabler:device-desktop" }
    ],
    designElements: [
      { title: "User-Centered Design", description: "Personas and customer journeys ensured usability for OBI’s tech-savvy customers.", icon: "tabler:user" },
      { title: "Brand Alignment", description: "Reflects OBI’s approachable, innovative identity through tone and visuals.", icon: "tabler:brand-hipchat" },
      { title: "Seamless Integration", description: "Real-time connections to product databases and customer profiles.", icon: "tabler:plug" },
      { title: "Future-Proof Scalability", description: "Designed to adapt for voice assistance and in-store deployment.", icon: "tabler:microphone" }
    ],
    outcomes: [
      { title: "Conceptualized Timo Tüftler chatbot for OBI" },
      { title: "Framework-driven design process" },
      { title: "Scalable, brand-aligned customer support vision" }
    ],
    insights: [
      { title: "Biggest Challenge", description: "Aligning user needs, business goals, and technological capabilities.", icon: "tabler:scale" },
      { title: "Frameworks Shaped the Concept", description: "Tools like Limbic Maps and Value Proposition Canvas provided structure and clarity.", icon: "tabler:map" },
      { title: "Collaboration Lessons", description: "Diverse brand analyses revealed opportunities to innovate in the market.", icon: "tabler:users" },
      { title: "Service Design Understanding", description: "Reinforced the value of designing services that are both functional and emotionally engaging.", icon: "tabler:heart" }
    ],
    faqs: [
      { title: "What was the main goal of the OBI Chatbot project?", description: "To conceptualize an AI-driven chatbot that transforms the DIY experience for OBI’s tech-savvy customers, using the Branded Interaction Framework." },
      { title: "What was the biggest challenge?", description: "Aligning user needs, business goals, and technological capabilities." },
      { title: "How did frameworks shape the concept?", description: "Frameworks like Limbic Maps and Value Proposition Canvas provided structure and clarity to the design process." },
      { title: "What did collaboration teach the team?", description: "Diverse brand analyses and teamwork revealed new opportunities for innovation in customer support." },
      { title: "How did this project influence your understanding of service design?", description: "It reinforced the value of designing services that are both functional and emotionally engaging." }
    ]
  }
]; 
