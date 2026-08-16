// movbdQA.js
// 100 question & answer pairs about the MovBD website.
// Used by ChatWidget for fully frontend, no-backend FAQ matching.
// `keywords` are extra match hints (English + common Banglish terms users type).

const movbdQA = [
  // ---------- General / About ----------
  {
    q: "What is MovBD?",
    a: "MovBD is a movie platform where you can browse, watch, and download movies across many genres, all in one place.",
    keywords: ["what is movbd", "about movbd", "movbd ki", "site ki", "website ki"],
  },
  {
    q: "Is MovBD free to use?",
    a: "Yes, browsing and using MovBD is free. You just need to create an account to unlock features like watchlist and reviews.",
    keywords: ["free", "cost", "price", "taka lagbe", "free kina"],
  },
  {
    q: "Which country is MovBD based in?",
    a: "MovBD is built for movie lovers in Bangladesh, with local language support and content relevant to Bangladeshi audiences.",
    keywords: ["country", "bangladesh", "kothay", "location"],
  },
  {
    q: "Do I need to sign up to watch movies?",
    a: "You can browse movies without an account, but signing up lets you save a watchlist, rate movies, and get a personalized experience.",
    keywords: ["sign up dorkar", "account lagbe", "login lagbe"],
  },
  {
    q: "How do I contact MovBD support?",
    a: "You can reach us through the Contact page — send a message via the form, or reach out through our Facebook or WhatsApp links.",
    keywords: ["contact", "support", "help", "jogajog"],
  },
  {
    q: "Where is the Contact page?",
    a: "You'll find the Contact page in the navigation menu, or directly at the /contact URL.",
    keywords: ["contact page", "contact kothay"],
  },
  {
    q: "Does MovBD have a physical office I can visit?",
    a: "MovBD is an online platform. Our Contact page shows our general location (Dhaka, Bangladesh) with a map, but we mainly operate online.",
    keywords: ["office", "address", "location visit"],
  },
  {
    q: "What's on the About page?",
    a: "The About page tells the MovBD story, our mission, key stats, and what makes the platform different — clean design and a real movie community.",
    keywords: ["about page", "about ki ache"],
  },

  // ---------- Account / Auth ----------
  {
    q: "How do I create an account?",
    a: "Click 'Sign Up' in the top navigation bar, fill in your name, email, and password, and you're ready to go.",
    keywords: ["create account", "sign up", "register", "account kivabe banabo", "registration"],
  },
  {
    q: "How do I log in?",
    a: "Click 'Login' in the navbar, enter your registered email and password, and you'll be signed in.",
    keywords: ["login", "log in", "sign in", "login kivabe"],
  },
  {
    q: "I forgot my password. What do I do?",
    a: "Use the 'Forgot Password' option on the login page to reset it via your registered email.",
    keywords: ["forgot password", "password vule gechi", "reset password"],
  },
  {
    q: "How do I change my password?",
    a: "Go to your Profile page, enter a new password in the 'New Password' field, confirm it, and save changes.",
    keywords: ["change password", "password change korbo", "update password"],
  },
  {
    q: "How do I update my name or email?",
    a: "Go to your Profile page, edit the Name or Email field, and click 'Save Changes'.",
    keywords: ["update name", "change email", "edit profile"],
  },
  {
    q: "How do I change my profile picture?",
    a: "On your Profile page, click the avatar circle to upload a new photo — it updates instantly as a preview before you save.",
    keywords: ["profile picture", "avatar change", "chobi change"],
  },
  {
    q: "Can I show or hide my password while typing?",
    a: "Yes, on the Profile page's password fields there's an eye icon to toggle between hidden and visible password text.",
    keywords: ["show password", "hide password", "password dekhte chai"],
  },
  {
    q: "How do I log out?",
    a: "Click your avatar in the top-right corner of the navbar and select 'Logout' from the dropdown menu.",
    keywords: ["logout", "log out", "sign out"],
  },
  {
    q: "Is my account information secure?",
    a: "Yes, MovBD uses secure authentication practices, and passwords are never stored in plain text.",
    keywords: ["secure", "safe account", "security"],
  },
  {
    q: "Can I delete my account?",
    a: "Currently account deletion isn't self-service in the app — please contact support via the Contact page and we'll help you out.",
    keywords: ["delete account", "account delete korbo"],
  },

  // ---------- Browsing / Movies ----------
  {
    q: "How do I find movies to watch?",
    a: "Go to the Movies page from the navbar to browse the full catalog, or use Home page sections like 'Latest Movies' and 'Browse by Genre'.",
    keywords: ["find movies", "movie khujbo", "browse movies"],
  },
  {
    q: "How do I search for a specific movie?",
    a: "Use the search bar in the navbar, or the Search filter on the Movies page — type the movie title and results update automatically.",
    keywords: ["search movie", "movie search", "khujbo kivabe"],
  },
  {
    q: "Can I filter movies by genre?",
    a: "Yes, the Movies page has a Genre filter in the sidebar — click any genre tag to filter instantly.",
    keywords: ["filter genre", "genre filter", "genre diye khujbo"],
  },
  {
    q: "Can I filter movies by quality?",
    a: "Yes, you can filter by quality options like CAM, HD, FHD, 4K, and BluRay from the Movies page sidebar.",
    keywords: ["quality filter", "hd movie", "4k movie", "quality diye"],
  },
  {
    q: "How can I sort the movie list?",
    a: "Use the 'Sort By' dropdown on the Movies page — choose Newest First, Oldest First, Top Rated, or Release Year.",
    keywords: ["sort movies", "sort by", "newest movie"],
  },
  {
    q: "How do I clear all filters?",
    a: "Click the 'Clear' button next to Filters on the Movies page sidebar to reset search, genre, and quality filters.",
    keywords: ["clear filters", "reset filter", "filter clear"],
  },
  {
    q: "Why does pagination sometimes not change pages?",
    a: "That was a known bug where clicking page numbers reset back to page 1 — it has since been fixed so page navigation now works correctly.",
    keywords: ["pagination bug", "page click hoy na", "page 2 e jai na"],
  },
  {
    q: "How many movies are shown per page?",
    a: "The Movies page shows 16 movies per page by default, with pagination at the bottom to browse further.",
    keywords: ["movies per page", "koyta movie ase"],
  },
  {
    q: "What genres are available on MovBD?",
    a: "MovBD includes Action, Drama, Comedy, Thriller, Romance, Horror, Sci-Fi, and Animation, among others.",
    keywords: ["genres list", "kon kon genre", "genre ki ki"],
  },
  {
    q: "How do I see movie details like rating and duration?",
    a: "Click on any movie card to open its detail page, which shows rating, release year, duration, language, and description.",
    keywords: ["movie details", "movie info", "duration dekhbo"],
  },
  {
    q: "What does the star rating on a movie mean?",
    a: "The star rating shows the average score from user reviews. If a movie has no ratings yet, it's marked 'New'.",
    keywords: ["star rating", "rating mane ki", "average rating"],
  },
  {
    q: "Can I watch a trailer before downloading?",
    a: "Yes, movie detail pages include trailer previews so you can check the film out before downloading.",
    keywords: ["trailer dekhbo", "trailer preview", "watch trailer"],
  },
  {
    q: "How often are new movies added?",
    a: "New movies are added regularly — check the 'Latest Movies' section on the Home page to see what's new.",
    keywords: ["new movies", "koto din por movie ashe", "update movie"],
  },
  {
    q: "What is shown in the Hero section on the homepage?",
    a: "The Home page hero section rotates through featured movies with a poster, title, rating, and quick 'Watch Now' / 'More Info' buttons.",
    keywords: ["hero section", "homepage banner"],
  },

  // ---------- Watchlist ----------
  {
    q: "What is the Watchlist feature?",
    a: "Watchlist lets you save movies you want to watch later. Just click the bookmark icon on any movie card.",
    keywords: ["watchlist ki", "watchlist feature", "save movie"],
  },
  {
    q: "How do I add a movie to my watchlist?",
    a: "Click the watchlist/bookmark icon on a movie card or on the movie detail page — it toggles on and off.",
    keywords: ["add watchlist", "watchlist e add korbo"],
  },
  {
    q: "Do I need to be logged in to use the watchlist?",
    a: "Yes, you need an account. If you try to add a movie to your watchlist while logged out, you'll be asked to log in first.",
    keywords: ["watchlist login lagbe", "login chara watchlist"],
  },
  {
    q: "How do I view my watchlist?",
    a: "Click 'Watchlist' from your profile dropdown menu in the navbar, or go directly to the /watchlist page.",
    keywords: ["watchlist page", "watchlist dekhbo"],
  },
  {
    q: "How do I remove a movie from my watchlist?",
    a: "Click the same bookmark icon again on the movie card — it will remove it from your watchlist instantly.",
    keywords: ["remove watchlist", "watchlist theke remove"],
  },
  {
    q: "Is there a limit to how many movies I can save?",
    a: "No, there's no limit — you can save as many movies as you like to your watchlist.",
    keywords: ["watchlist limit", "koyta save korte parbo"],
  },

  // ---------- Ratings / Reviews ----------
  {
    q: "Can I rate a movie?",
    a: "Yes, on any movie's detail page you can leave a star rating and write a review if you're logged in.",
    keywords: ["rate movie", "rating dibo", "review dibo"],
  },
  {
    q: "Can I edit or delete my review?",
    a: "Yes, you can edit or remove your own reviews from the movie detail page where you posted them.",
    keywords: ["edit review", "delete review", "review change"],
  },
  {
    q: "Do reviews affect the movie's overall rating?",
    a: "Yes, the average rating shown on each movie is calculated from all the user ratings submitted for it.",
    keywords: ["review effect rating", "average rating kivabe hoy"],
  },
  {
    q: "Can I see other users' reviews?",
    a: "Yes, all public reviews for a movie are visible on its detail page for everyone to read.",
    keywords: ["other reviews dekhbo", "sobar review"],
  },

  // ---------- Downloads / Quality ----------
  {
    q: "How do I download a movie?",
    a: "Open the movie's detail page and choose your preferred quality — a download link will be available there.",
    keywords: ["download movie", "download kivabe", "download link"],
  },
  {
    q: "What quality options are available for download?",
    a: "MovBD offers multiple qualities: CAM, HD, FHD, 4K, and BluRay, depending on the movie.",
    keywords: ["download quality", "quality options"],
  },
  {
    q: "Are downloads free?",
    a: "Yes, downloading movies on MovBD doesn't cost anything.",
    keywords: ["download free", "download taka lagbe"],
  },
  {
    q: "Why is a download link not working?",
    a: "This can happen if a link has expired or is temporarily down. Please use the Contact page to report the broken link so we can fix it.",
    keywords: ["download link kaj kore na", "broken link", "link error"],
  },
  {
    q: "Do I need an account to download movies?",
    a: "Browsing is open to everyone, but we recommend logging in for a smoother, more personalized download experience.",
    keywords: ["download login lagbe"],
  },
  {
    q: "Is it safe to download from MovBD?",
    a: "Yes, MovBD aims to provide safe, malware-free download links with no forced redirects.",
    keywords: ["download safe", "virus ache naki", "malware"],
  },

  // ---------- Site Navigation ----------
  {
    q: "What pages are available on MovBD?",
    a: "MovBD includes Home, Movies, About, Contact, Login, Register, Watchlist, and Profile pages, plus an Admin dashboard for administrators.",
    keywords: ["pages list", "koto page ache"],
  },
  {
    q: "Where is the Home page?",
    a: "The Home page is the main landing page at the root URL '/', featuring hero banners, latest movies, and genre browsing.",
    keywords: ["home page", "homepage kothay"],
  },
  {
    q: "Where is the Movies page?",
    a: "You can access the full movie catalog at the '/movies' URL, or by clicking 'Movies' in the navbar.",
    keywords: ["movies page kothay"],
  },
  {
    q: "How do I get back to the homepage quickly?",
    a: "Click the MovBD logo in the top-left corner of the navbar from any page.",
    keywords: ["home e jabo", "logo click"],
  },
  {
    q: "Is MovBD mobile friendly?",
    a: "Yes, MovBD is fully responsive and works well on phones, tablets, and desktops.",
    keywords: ["mobile friendly", "mobile e chole", "responsive"],
  },
  {
    q: "Does MovBD have a mobile app?",
    a: "Currently MovBD is a web platform accessible from any browser. Please check with support for any app plans.",
    keywords: ["mobile app ache", "app ache kina"],
  },

  // ---------- Admin ----------
  {
    q: "What is the Admin Dashboard?",
    a: "The Admin Dashboard is a management panel available only to administrators, for managing movies, users, and site content.",
    keywords: ["admin dashboard", "admin panel"],
  },
  {
    q: "Can regular users access the Admin panel?",
    a: "No, the Admin panel is restricted — only accounts marked as admin can access it. Regular users are redirected to the homepage.",
    keywords: ["admin access", "admin dekhte parbo"],
  },
  {
    q: "How do I become an admin?",
    a: "Admin access is granted by the site owner/team directly, not through self-service signup. Contact support if you need admin access.",
    keywords: ["admin hobo kivabe", "admin banabo"],
  },

  // ---------- Chat Widget ----------
  {
    q: "How does this chat work?",
    a: "This chat is a built-in assistant that answers common questions about MovBD directly, without needing to contact support.",
    keywords: ["chat kivabe kaj kore", "ei chat ki"],
  },
  {
    q: "Can the chat answer anything?",
    a: "The chat covers common MovBD questions. For anything more specific or account-related, please use the Contact page.",
    keywords: ["chat shob answer dibe", "chat limit"],
  },
  {
    q: "Is my chat conversation saved?",
    a: "This chat currently runs locally in your browser session and isn't stored on our servers.",
    keywords: ["chat save hoy", "chat history"],
  },
  {
    q: "Can I talk to a real person instead of the chat?",
    a: "Yes, use the Contact page form, or reach us via Facebook or WhatsApp for a real person to help.",
    keywords: ["real person", "manush er sathe kotha bolbo"],
  },

  // ---------- Contact / Social ----------
  {
    q: "What social media is MovBD on?",
    a: "MovBD is reachable through Facebook and WhatsApp — links are available on the Contact page.",
    keywords: ["social media", "facebook page", "whatsapp"],
  },
  {
    q: "How do I message MovBD on WhatsApp?",
    a: "Click the WhatsApp icon on the Contact page — it opens a chat directly with our WhatsApp number.",
    keywords: ["whatsapp message", "whatsapp e message"],
  },
  {
    q: "How do I find MovBD on Facebook?",
    a: "Click the Facebook icon on the Contact page to go straight to our Facebook page.",
    keywords: ["facebook e MovBD", "fb page"],
  },
  {
    q: "How long does it take to get a reply from support?",
    a: "Our team usually replies within 24 hours after you submit a message through the Contact form.",
    keywords: ["reply koto time", "koto shomoy lagbe"],
  },
  {
    q: "Can I request a movie to be added?",
    a: "Yes, use the Contact form and mention the movie you'd like added — we review all requests.",
    keywords: ["movie request", "movie add korte bolbo"],
  },
  {
    q: "How do I report a bug on the site?",
    a: "Please use the Contact page to describe the bug in detail — screenshots help us fix it faster.",
    keywords: ["bug report", "problem report", "site e problem"],
  },
  {
    q: "Can I report inappropriate content?",
    a: "Yes, please contact us immediately via the Contact page with details, and we'll review and act on it.",
    keywords: ["report content", "objectionable content"],
  },

  // ---------- Notifications / Toasts ----------
  {
    q: "What do the pop-up messages (toasts) mean?",
    a: "Small pop-ups appear after actions like login, watchlist updates, or errors, confirming what just happened.",
    keywords: ["toast message", "popup message", "notification ki"],
  },
  {
    q: "Why did I get a 'Please login to use watchlist' message?",
    a: "That message appears when you try to use the watchlist feature while logged out — simply log in first.",
    keywords: ["login to use watchlist message"],
  },

  // ---------- Language / Localization ----------
  {
    q: "Is MovBD available in Bengali?",
    a: "Some movie titles include Bengali translations, and our support team can assist you in Bangla as well.",
    keywords: ["bangla ache", "bengali language"],
  },
  {
    q: "Can I search movies using Bengali titles?",
    a: "If a movie has a Bengali title stored, it may appear in results, though search primarily matches the main title field.",
    keywords: ["bangla title search"],
  },

  // ---------- Performance / Technical ----------
  {
    q: "The site is loading slowly. What should I do?",
    a: "Try refreshing the page or checking your internet connection. If the issue persists, let us know via the Contact page.",
    keywords: ["site slow", "load hocche na", "slow loading"],
  },
  {
    q: "The site isn't loading at all. What do I do?",
    a: "Please check your internet connection first, then try again in a few minutes. If it's still down, report it via Contact or our social pages.",
    keywords: ["site down", "site open hocche na"],
  },
  {
    q: "Which browsers does MovBD support?",
    a: "MovBD works on all modern browsers like Chrome, Firefox, Edge, and Safari.",
    keywords: ["browser support", "kon browser"],
  },
  {
    q: "Why can't I see any movies loading on the Movies page?",
    a: "This might be a temporary loading issue — try refreshing. If it continues, please report it via the Contact page.",
    keywords: ["movie load hocche na", "movies page empty"],
  },

  // ---------- Policies ----------
  {
    q: "Does MovBD have a privacy policy?",
    a: "Yes, MovBD respects user privacy and only uses your data to provide site features like login and watchlist. Contact us for detailed policy documents.",
    keywords: ["privacy policy", "data safe"],
  },
  {
    q: "Does MovBD have terms of service?",
    a: "General usage terms apply to keep the platform safe and fair for everyone. Reach out via Contact for the full terms.",
    keywords: ["terms of service", "rules ache"],
  },
  {
    q: "Is my email shared with anyone?",
    a: "No, your email is used only for account access and communication — it's not shared with third parties.",
    keywords: ["email share hoy", "email safe"],
  },

  // ---------- Misc / Fun ----------
  {
    q: "Who built MovBD?",
    a: "MovBD was built by a small team passionate about movies and clean, simple web design.",
    keywords: ["ke banaise", "who made movbd", "developer"],
  },
  {
    q: "What does MovBD stand for?",
    a: "MovBD combines 'Movies' with 'BD' (Bangladesh), reflecting the platform's focus on serving Bangladeshi movie fans.",
    keywords: ["movbd mane ki", "name meaning"],
  },
  {
    q: "Can I suggest a new feature?",
    a: "Absolutely — send your feature suggestions through the Contact page, we love hearing ideas from users.",
    keywords: ["feature suggest korbo", "new feature chai"],
  },
  {
    q: "Is there a dark mode?",
    a: "MovBD's design is already built with a sleek dark theme by default across the whole site.",
    keywords: ["dark mode", "dark theme ache"],
  },
  {
    q: "Can I use MovBD outside Bangladesh?",
    a: "Yes, MovBD is accessible from anywhere with internet access, though it's designed primarily for Bangladeshi users.",
    keywords: ["bangladesh er baire use", "outside bd"],
  },
  {
    q: "How do I switch between login and register forms?",
    a: "Both Login and Register pages have a link at the bottom to switch to the other — e.g. 'Don't have an account? Sign up'.",
    keywords: ["login theke register", "switch login register"],
  },
  {
    q: "What happens if I enter the wrong password too many times?",
    a: "You can simply try again or use the 'Forgot Password' option to reset your password securely.",
    keywords: ["wrong password baar baar", "onek try dilam"],
  },
  {
    q: "Can I use the same email for multiple accounts?",
    a: "No, each email can only be registered to one MovBD account.",
    keywords: ["ekta email diye multiple account"],
  },
  {
    q: "Why do some movies show 'New' instead of a rating?",
    a: "A movie shows 'New' when it hasn't received any user ratings yet — it will show a numeric score once reviews come in.",
    keywords: ["new keno lekha", "rating dekhaye na"],
  },
  {
    q: "How is the 'Latest Movies' section on the homepage decided?",
    a: "It shows the 12 most recently added movies, sorted by newest first.",
    keywords: ["latest movies section", "kivabe select hoy"],
  },
  {
    q: "Can I filter by release year?",
    a: "Yes, use the 'Release Year' sort option on the Movies page to arrange movies chronologically.",
    keywords: ["release year filter", "shal diye khujbo"],
  },
  {
    q: "What does the badge on a movie card mean (like HD, 4K)?",
    a: "That badge shows the available quality for that movie, e.g. HD, FHD, 4K, CAM, or BluRay.",
    keywords: ["badge ki mane", "quality badge"],
  },
  {
    q: "Why is the hero banner changing automatically?",
    a: "The homepage hero section auto-rotates through featured movies every few seconds — you can also click the dots to jump to a specific one.",
    keywords: ["banner change hoy keno", "hero auto change"],
  },
  {
    q: "Can I pause the hero banner rotation?",
    a: "There's no manual pause button currently, but clicking a specific dot will jump to that movie directly.",
    keywords: ["banner pause korbo"],
  },
  {
    q: "How can I see how many total movies are on the site?",
    a: "The Movies page header shows the total movie count, e.g. '350 movies found', which updates with your filters.",
    keywords: ["total koyta movie", "koto movie ase site e"],
  },
  {
    q: "Does searching update results instantly?",
    a: "Yes, the search and filters on the Movies page update the results live as you type or select options.",
    keywords: ["search instant hoy", "typing er shathe shathe"],
  },
  {
    q: "What happens if no movies match my filters?",
    a: "You'll see an empty state message with a 'Clear Filters' button so you can quickly reset and try again.",
    keywords: ["kono movie pai na", "no results"],
  },
  {
    q: "Is there a way to see trending or popular movies?",
    a: "The Home page highlights trending and featured titles; sorting by 'Top Rated' on the Movies page also surfaces popular picks.",
    keywords: ["trending movies", "popular movies"],
  },
  {
    q: "Can guests (not logged in) rate movies?",
    a: "No, you need to be logged in to submit ratings or reviews — this keeps reviews tied to real accounts.",
    keywords: ["guest rating dite parbe", "login chara rating"],
  },
  {
    q: "How do I know if I'm logged in?",
    a: "If logged in, your avatar (photo or initials) appears in the top-right of the navbar instead of Login/Sign Up buttons.",
    keywords: ["login ache kina bujhbo kivabe"],
  },
  {
    q: "What's shown in my profile dropdown menu?",
    a: "Your dropdown shows your name and email, plus links to Watchlist, Profile, Admin Panel (if applicable), and Logout.",
    keywords: ["dropdown menu ki ache", "profile menu"],
  },
  {
    q: "Can I use MovBD without JavaScript enabled?",
    a: "No, MovBD is a JavaScript-powered web app, so JavaScript needs to be enabled in your browser to use it.",
    keywords: ["javascript off", "js chara"],
  },
  {
    q: "How is MovBD different from other movie sites?",
    a: "MovBD focuses on a clean, fast, ad-light experience with genuine reviews, easy filtering, and a design built around simplicity.",
    keywords: ["onno site theke alada", "difference"],
  },
  {
    q: "Can I recommend MovBD to friends?",
    a: "Of course! Sharing the site link or a specific movie page with friends is a great way to spread the word.",
    keywords: ["friend ke recommend korbo", "share korbo"],
  },
  {
    q: "How do I share a specific movie with someone?",
    a: "Just copy the movie's detail page URL from your browser and share it directly.",
    keywords: ["movie link share korbo"],
  },
  {
    q: "Can I bookmark the site for quick access?",
    a: "Yes, use your browser's bookmark feature (Ctrl+D or Cmd+D) to save MovBD for quick access anytime.",
    keywords: ["bookmark korbo browser e"],
  },
  {
    q: "Thank you / thanks",
    a: "You're welcome! Let me know if there's anything else about MovBD I can help with.",
    keywords: ["thanks", "thank you", "dhonnobad"],
  },
  {
    q: "Hello / hi",
    a: "Hi there! 👋 I'm the MovBD assistant. Ask me anything about movies, your account, downloads, or the site in general.",
    keywords: ["hi", "hello", "hey", "assalamualaikum", "salam"],
  },
];

export default movbdQA;