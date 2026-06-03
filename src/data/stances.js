// Trending Stances — Curated data linking famous people to global topics
// stance: 'like' | 'dislike'

export const TOPICS = [
    { id: 'all', label: 'All Topics', emoji: '🌐' },
    { id: 'climate', label: 'Climate Change', emoji: '🌍' },
    { id: 'ai', label: 'AI & Technology', emoji: '🤖' },
    { id: 'crypto', label: 'Crypto & Web3', emoji: '₿' },
    { id: 'social_media', label: 'Social Media', emoji: '📱' },
    { id: 'free_speech', label: 'Free Speech', emoji: '🗣️' },
    { id: 'space', label: 'Space Exploration', emoji: '🚀' },
    { id: 'mental_health', label: 'Mental Health', emoji: '🧠' },
    { id: 'veganism', label: 'Veganism', emoji: '🌱' },
    { id: 'gender_rights', label: 'Gender Rights', emoji: '⚧️' },
    { id: 'war_peace', label: 'War & Peace', emoji: '☮️' },
];

export const stances = [
    // ── CLIMATE CHANGE ──────────────────────────────────────────────
    { id: 1,  personId: 171, topic: 'climate',      stance: 'dislike', quote: "Climate science is often a political agenda, not pure science." },
    { id: 2,  personId: 113, topic: 'climate',      stance: 'like',    quote: "Climate change is the most urgent crisis of our time." },
    { id: 3,  personId: 224, topic: 'climate',      stance: 'like',    quote: "Our house is on fire — we need to act NOW." },
    { id: 4,  personId: 172, topic: 'climate',      stance: 'like',    quote: "Solving climate change requires massive innovation." },
    { id: 5,  personId: 10,  topic: 'climate',      stance: 'like',    quote: "I use my platform to fight for a greener world." },
    { id: 6,  personId: 205, topic: 'climate',      stance: 'dislike', quote: "Climate alarmism is holding economies back." },
    { id: 7,  personId: 226, topic: 'climate',      stance: 'like',    quote: "We owe the next generation a livable planet." },
    { id: 8,  personId: 27,  topic: 'climate',      stance: 'like',    quote: "F1 must lead the charge to net zero." },

    // ── AI & TECHNOLOGY ─────────────────────────────────────────────
    { id: 9,  personId: 171, topic: 'ai',           stance: 'like',    quote: "AI will be the most transformative technology in history." },
    { id: 10, personId: 196, topic: 'ai',           stance: 'like',    quote: "AGI is coming faster than people think." },
    { id: 11, personId: 197, topic: 'ai',           stance: 'like',    quote: "We are at an AI inflection point — compute is everything." },
    { id: 12, personId: 174, topic: 'ai',           stance: 'like',    quote: "AI will reshape every part of our lives." },
    { id: 13, personId: 172, topic: 'ai',           stance: 'like',    quote: "AI is the most important technology of our generation." },
    { id: 14, personId: 205, topic: 'ai',           stance: 'dislike', quote: "AI could end human agency and critical thinking." },
    { id: 15, personId: 250, topic: 'ai',           stance: 'like',    quote: "Machines that think will define the next century." },
    { id: 16, personId: 246, topic: 'ai',           stance: 'dislike', quote: "Artificial Intelligence could be the end of the human race." },

    // ── CRYPTO & WEB3 ───────────────────────────────────────────────
    { id: 17, personId: 171, topic: 'crypto',       stance: 'like',    quote: "Crypto and Bitcoin are the future of money." },
    { id: 18, personId: 198, topic: 'crypto',       stance: 'like',    quote: "Ethereum is the foundation of Web3." },
    { id: 19, personId: 173, topic: 'crypto',       stance: 'dislike', quote: "Crypto doesn't produce anything of value." },
    { id: 20, personId: 189, topic: 'crypto',       stance: 'dislike', quote: "Bitcoin is rat poison squared." },
    { id: 21, personId: 65,  topic: 'crypto',       stance: 'like',    quote: "WAP? More like WAP — Wallet And Portfolio!" },
    { id: 22, personId: 180, topic: 'crypto',       stance: 'like',    quote: "I gave away Bitcoin worth millions — I believe in it." },
    { id: 23, personId: 188, topic: 'crypto',       stance: 'like',    quote: "Crypto is the biggest wealth transfer in human history." },

    // ── SOCIAL MEDIA ────────────────────────────────────────────────
    { id: 24, personId: 174, topic: 'social_media', stance: 'like',    quote: "Social media brings people together like nothing before." },
    { id: 25, personId: 171, topic: 'social_media', stance: 'like',    quote: "X is the digital town square of the world." },
    { id: 26, personId: 62,  topic: 'social_media', stance: 'dislike', quote: "Social media is a highlight reel that damages mental health." },
    { id: 27, personId: 224, topic: 'social_media', stance: 'dislike', quote: "Social media amplifies climate denial and misinformation." },
    { id: 28, personId: 184, topic: 'social_media', stance: 'like',    quote: "TikTok gave ordinary people a global stage." },
    { id: 29, personId: 203, topic: 'social_media', stance: 'dislike', quote: "Social media is making everyone anxious and addicted." },
    { id: 30, personId: 202, topic: 'social_media', stance: 'like',    quote: "Social media is the greatest marketing tool ever built." },

    // ── FREE SPEECH ─────────────────────────────────────────────────
    { id: 31, personId: 171, topic: 'free_speech',  stance: 'like',    quote: "Free speech is the bedrock of democracy." },
    { id: 32, personId: 205, topic: 'free_speech',  stance: 'like',    quote: "Limiting speech is the first step to tyranny." },
    { id: 33, personId: 203, topic: 'free_speech',  stance: 'like',    quote: "Censorship of ideas is a deeply dangerous path." },
    { id: 34, personId: 224, topic: 'free_speech',  stance: 'dislike', quote: "Free speech must have limits when it harms others." },
    { id: 35, personId: 211, topic: 'free_speech',  stance: 'like',    quote: "Truth Social was born from the fight for free speech." },
    { id: 36, personId: 226, topic: 'free_speech',  stance: 'dislike', quote: "Hate speech and free speech are not the same thing." },

    // ── SPACE EXPLORATION ───────────────────────────────────────────
    { id: 37, personId: 171, topic: 'space',        stance: 'like',    quote: "Humanity must become multi-planetary to survive." },
    { id: 38, personId: 172, topic: 'space',        stance: 'like',    quote: "Space colonization is the ultimate long game." },
    { id: 39, personId: 173, topic: 'space',        stance: 'like',    quote: "Blue Origin will make space accessible to everyone." },
    { id: 40, personId: 246, topic: 'space',        stance: 'like',    quote: "Space exploration is in our nature as a species." },
    { id: 41, personId: 189, topic: 'space',        stance: 'dislike', quote: "Space is fine, but let's solve Earth's problems first." },
    { id: 42, personId: 27,  topic: 'space',        stance: 'like',    quote: "I dream of driving on Mars one day." },

    // ── MENTAL HEALTH ───────────────────────────────────────────────
    { id: 43, personId: 62,  topic: 'mental_health', stance: 'like',   quote: "Mental health is health — full stop." },
    { id: 44, personId: 49,  topic: 'mental_health', stance: 'like',   quote: "I withdrew from the Olympics to protect my mind." },
    { id: 45, personId: 50,  topic: 'mental_health', stance: 'like',   quote: "Mental health struggles are nothing to be ashamed of." },
    { id: 46, personId: 122, topic: 'mental_health', stance: 'like',   quote: "Therapy saved my life. Let's normalize it." },
    { id: 47, personId: 206, topic: 'mental_health', stance: 'dislike', quote: "Mental toughness is the answer — not coddling." },
    { id: 48, personId: 188, topic: 'mental_health', stance: 'dislike', quote: "Men are too quick to call weakness a disorder." },
    { id: 49, personId: 52,  topic: 'mental_health', stance: 'like',   quote: "I've struggled openly — vulnerability is strength." },

    // ── VEGANISM ────────────────────────────────────────────────────
    { id: 50, personId: 113, topic: 'veganism',     stance: 'like',    quote: "Going plant-based is the single biggest act for climate." },
    { id: 51, personId: 206, topic: 'veganism',     stance: 'dislike', quote: "Carnivore diet changed my performance entirely." },
    { id: 52, personId: 16,  topic: 'veganism',     stance: 'dislike', quote: "Meat is fuel — it's what warriors eat." },
    { id: 53, personId: 200, topic: 'veganism',     stance: 'dislike', quote: "There's nothing wrong with a perfectly cooked steak." },
    { id: 54, personId: 49,  topic: 'veganism',     stance: 'like',    quote: "Plant-based eating has transformed my recovery." },

    // ── GENDER RIGHTS ───────────────────────────────────────────────
    { id: 55, personId: 135, topic: 'gender_rights', stance: 'like',   quote: "Feminism is about equal rights for all genders." },
    { id: 56, personId: 226, topic: 'gender_rights', stance: 'like',   quote: "Gender equality is non-negotiable." },
    { id: 57, personId: 205, topic: 'gender_rights', stance: 'dislike', quote: "Biology is real — we can't simply redefine it." },
    { id: 58, personId: 225, topic: 'gender_rights', stance: 'like',   quote: "Every person deserves dignity regardless of gender." },
    { id: 59, personId: 99,  topic: 'gender_rights', stance: 'like',   quote: "Being non-binary is my truth — and I'm proud." },

    // ── WAR & PEACE ─────────────────────────────────────────────────
    { id: 60, personId: 222, topic: 'war_peace',    stance: 'dislike', quote: "We fight because we must — not because we want to." },
    { id: 61, personId: 229, topic: 'war_peace',    stance: 'like',    quote: "Non-violence is the greatest force in the world." },
    { id: 62, personId: 230, topic: 'war_peace',    stance: 'like',    quote: "We must live together as brothers or perish as fools." },
    { id: 63, personId: 223, topic: 'war_peace',    stance: 'like',    quote: "Peace is the only path forward for humanity." },
    { id: 64, personId: 211, topic: 'war_peace',    stance: 'dislike', quote: "Peace through strength — weakness invites aggression." },
    { id: 65, personId: 212, topic: 'war_peace',    stance: 'like',    quote: "Diplomacy must always be the first option." },
];
