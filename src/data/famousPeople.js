// Famous People Database - 250 entries across 5 categories
export const categories = [
    { id: 'all', name: 'All', icon: '🌍' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'film', name: 'Film & TV', icon: '🎬' },
    { id: 'business', name: 'Business & Social Media', icon: '💼' },
    { id: 'politics', name: 'Politics & Historical', icon: '🏛️' },
];

// Helper to generate Wikipedia image URL
const wikiImage = (name) => {
    const formatted = name.replace(/ /g, '_');
    return `https://en.wikipedia.org/wiki/Special:FilePath/${formatted}.jpg?width=300`;
};

// Generate URL-safe slug from name
export const generateSlug = (name) => {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

export const famousPeople = [
    // ============ SPORTS (1-50) ============
    { id: 1, name: "Cristiano Ronaldo", category: "sports", bio: "Portuguese football legend. Five-time Ballon d'Or winner and all-time top scorer." },
    { id: 2, name: "Lionel Messi", category: "sports", bio: "Argentine football icon. Eight-time Ballon d'Or winner and World Cup champion." },
    { id: 3, name: "Virat Kohli", category: "sports", bio: "Indian cricket superstar. One of the greatest batsmen in cricket history." },
    { id: 4, name: "Neymar Jr", category: "sports", bio: "Brazilian football star. Known for his dazzling skills and flair." },
    { id: 5, name: "LeBron James", category: "sports", bio: "American basketball icon. Four-time NBA champion and all-time great." },
    { id: 6, name: "Kylian Mbappé", category: "sports", bio: "French football prodigy. World Cup winner and fastest rising star." },
    { id: 7, name: "MS Dhoni", category: "sports", bio: "Indian cricket legend. World Cup-winning captain known as 'Captain Cool'." },
    { id: 8, name: "David Beckham", category: "sports", bio: "English football icon. Global celebrity and fashion trendsetter." },
    { id: 9, name: "Ronaldinho", category: "sports", bio: "Brazilian football magician. Known for his joyful style and incredible skills." },
    { id: 10, name: "Lewis Hamilton", category: "sports", bio: "British F1 legend. Seven-time World Champion and racing icon." },
    { id: 11, name: "Stephen Curry", category: "sports", bio: "American basketball star. Greatest shooter in NBA history." },
    { id: 12, name: "Serena Williams", category: "sports", bio: "American tennis legend. 23 Grand Slam singles titles winner." },
    { id: 13, name: "Rafael Nadal", category: "sports", bio: "Spanish tennis icon. 'King of Clay' with 22 Grand Slam titles." },
    { id: 14, name: "Roger Federer", category: "sports", bio: "Swiss tennis maestro. Considered the most elegant player ever." },
    { id: 15, name: "Sachin Tendulkar", category: "sports", bio: "Indian cricket god. 'Master Blaster' with 100 international centuries." },
    { id: 16, name: "Conor McGregor", category: "sports", bio: "Irish MMA fighter. UFC champion and combat sports icon." },
    { id: 17, name: "Karim Benzema", category: "sports", bio: "French football striker. Ballon d'Or winner and Real Madrid legend." },
    { id: 18, name: "Marcelo Vieira", category: "sports", bio: "Brazilian defender. One of the best left-backs in football history." },
    { id: 19, name: "Zlatan Ibrahimović", category: "sports", bio: "Swedish football icon. Known for spectacular goals and personality." },
    { id: 20, name: "Paulo Dybala", category: "sports", bio: "Argentine football star. Nicknamed 'La Joya' for his elegance." },
    { id: 21, name: "Mohamed Salah", category: "sports", bio: "Egyptian football king. Premier League golden boot winner." },
    { id: 22, name: "James Rodríguez", category: "sports", bio: "Colombian football playmaker. 2014 World Cup Golden Boot winner." },
    { id: 23, name: "Paul Pogba", category: "sports", bio: "French midfielder. World Cup winner known for his creativity." },
    { id: 24, name: "Sergio Ramos", category: "sports", bio: "Spanish defender. Champions League winner and defensive legend." },
    { id: 25, name: "Novak Djokovic", category: "sports", bio: "Serbian tennis champion. Most Grand Slam titles in men's history." },
    { id: 26, name: "Tiger Woods", category: "sports", bio: "American golf legend. 15 major championships and global icon." },
    { id: 27, name: "Max Verstappen", category: "sports", bio: "Dutch F1 champion. Dominant force in modern Formula 1." },
    { id: 28, name: "Giannis Antetokounmpo", category: "sports", bio: "Greek basketball star. 'Greek Freak' and NBA champion." },
    { id: 29, name: "Kevin Durant", category: "sports", bio: "American basketball superstar. Two-time NBA Finals MVP." },
    { id: 30, name: "Rohit Sharma", category: "sports", bio: "Indian cricket captain. 'Hitman' known for his elegant batting." },
    { id: 31, name: "Hardik Pandya", category: "sports", bio: "Indian all-rounder. Dynamic cricketer and match-winner." },
    { id: 32, name: "Erling Haaland", category: "sports", bio: "Norwegian goal machine. Premier League record-breaking striker." },
    { id: 33, name: "Shohei Ohtani", category: "sports", bio: "Japanese baseball phenomenon. Two-way player making history." },
    { id: 34, name: "Canelo Alvarez", category: "sports", bio: "Mexican boxing champion. Pound-for-pound king of boxing." },
    { id: 35, name: "Tyson Fury", category: "sports", bio: "British heavyweight champion. 'The Gypsy King' of boxing." },
    { id: 36, name: "Khabib Nurmagomedov", category: "sports", bio: "Russian MMA legend. Undefeated UFC lightweight champion." },
    { id: 37, name: "Mike Tyson", category: "sports", bio: "American boxing legend. 'Iron Mike' - youngest heavyweight champion." },
    { id: 38, name: "Shaquille O'Neal", category: "sports", bio: "American basketball legend. Dominant center and entertainer." },
    { id: 39, name: "Michael Jordan", category: "sports", bio: "Basketball GOAT. Six NBA championships with the Chicago Bulls." },
    { id: 40, name: "Usain Bolt", category: "sports", bio: "Jamaican sprint legend. Fastest man in recorded history." },
    { id: 41, name: "Sunil Chhetri", category: "sports", bio: "Indian football captain. Country's all-time leading goalscorer." },
    { id: 42, name: "Robert Lewandowski", category: "sports", bio: "Polish striker. One of the greatest goalscorers of his generation." },
    { id: 43, name: "Vinicius Jr", category: "sports", bio: "Brazilian winger. Champions League hero and rising superstar." },
    { id: 44, name: "Jude Bellingham", category: "sports", bio: "English midfield prodigy. Real Madrid's newest sensation." },
    { id: 45, name: "Harry Kane", category: "sports", bio: "English striker. One of the Premier League's greatest scorers." },
    { id: 46, name: "Luka Modric", category: "sports", bio: "Croatian midfielder. Ballon d'Or winner and midfield maestro." },
    { id: 47, name: "Antoine Griezmann", category: "sports", bio: "French forward. World Cup winner and Atlético Madrid legend." },
    { id: 48, name: "Kevin De Bruyne", category: "sports", bio: "Belgian playmaker. Premier League's best creator." },
    { id: 49, name: "Simone Biles", category: "sports", bio: "American gymnast. Most decorated gymnast in history." },
    { id: 50, name: "Naomi Osaka", category: "sports", bio: "Japanese tennis star. Four-time Grand Slam champion." },

    // ============ MUSIC (51-110) ============
    { id: 51, name: "Taylor Swift", category: "music", bio: "American pop icon. Record-breaking artist and cultural phenomenon." },
    { id: 52, name: "Selena Gomez", category: "music", bio: "American singer and actress. Multi-talented global superstar." },
    { id: 53, name: "Ariana Grande", category: "music", bio: "American pop star. Powerhouse vocalist with massive following." },
    { id: 54, name: "Beyoncé", category: "music", bio: "American music queen. Legendary performer and cultural icon." },
    { id: 55, name: "Justin Bieber", category: "music", bio: "Canadian pop sensation. From YouTube star to global icon." },
    { id: 56, name: "Rihanna", category: "music", bio: "Barbadian superstar. Music icon and beauty mogul." },
    { id: 57, name: "Jennifer Lopez", category: "music", bio: "American entertainer. Triple threat in music, film, and dance." },
    { id: 58, name: "Miley Cyrus", category: "music", bio: "American singer. From Disney star to rock icon." },
    { id: 59, name: "Katy Perry", category: "music", bio: "American pop star. Known for catchy hits and colorful style." },
    { id: 60, name: "Nicki Minaj", category: "music", bio: "Trinidadian rapper. Queen of rap with record-breaking career." },
    { id: 61, name: "Drake", category: "music", bio: "Canadian rapper. Most streamed artist in Spotify history." },
    { id: 62, name: "Billie Eilish", category: "music", bio: "American singer. Gen-Z icon with unique artistic vision." },
    { id: 63, name: "Shakira", category: "music", bio: "Colombian superstar. Queen of Latin pop music." },
    { id: 64, name: "Dua Lipa", category: "music", bio: "British-Albanian pop star. Dance-pop queen of the 2020s." },
    { id: 65, name: "Cardi B", category: "music", bio: "American rapper. From social media to Grammy winner." },
    { id: 66, name: "Eminem", category: "music", bio: "American rap god. Best-selling hip-hop artist of all time." },
    { id: 67, name: "Ed Sheeran", category: "music", bio: "British singer-songwriter. Master of acoustic pop ballads." },
    { id: 68, name: "Shawn Mendes", category: "music", bio: "Canadian singer. Young pop sensation with devoted fanbase." },
    { id: 69, name: "Lady Gaga", category: "music", bio: "American artist. Pop provocateur and Oscar-winning actress." },
    { id: 70, name: "Bruno Mars", category: "music", bio: "American singer. Multi-talented performer and hit-maker." },
    { id: 71, name: "Harry Styles", category: "music", bio: "British singer. From One Direction to solo superstar." },
    { id: 72, name: "Adele", category: "music", bio: "British vocalist. Soul-stirring voice and record-breaking albums." },
    { id: 73, name: "Post Malone", category: "music", bio: "American artist. Genre-bending rapper and singer." },
    { id: 74, name: "Travis Scott", category: "music", bio: "American rapper. Innovative artist and cultural trendsetter." },
    { id: 75, name: "Bad Bunny", category: "music", bio: "Puerto Rican reggaeton star. Most streamed Latin artist ever." },
    { id: 76, name: "The Weeknd", category: "music", bio: "Canadian singer. R&B icon with cinematic sound." },
    { id: 77, name: "Lana Del Rey", category: "music", bio: "American singer. Dreamy aesthetic and poetic lyrics." },
    { id: 78, name: "Doja Cat", category: "music", bio: "American rapper/singer. Viral sensation turned superstar." },
    { id: 79, name: "SZA", category: "music", bio: "American R&B artist. Voice of a generation in R&B." },
    { id: 80, name: "Karol G", category: "music", bio: "Colombian reggaeton queen. Latin music powerhouse." },
    { id: 81, name: "Maluma", category: "music", bio: "Colombian singer. Latin pop and reggaeton heartthrob." },
    { id: 82, name: "J Balvin", category: "music", bio: "Colombian reggaeton artist. Pioneer of Latin urban music." },
    { id: 83, name: "Anitta", category: "music", bio: "Brazilian pop star. Global ambassador of Brazilian music." },
    { id: 84, name: "Rosalía", category: "music", bio: "Spanish artist. Flamenco-fusion innovator and style icon." },
    { id: 85, name: "Lisa", category: "music", bio: "Thai rapper and dancer. BLACKPINK member and fashion icon." },
    { id: 86, name: "Jennie", category: "music", bio: "South Korean star. BLACKPINK member and solo artist." },
    { id: 87, name: "Rosé", category: "music", bio: "New Zealand-Korean singer. BLACKPINK vocalist and model." },
    { id: 88, name: "Jisoo", category: "music", bio: "South Korean singer. BLACKPINK member and actress." },
    { id: 89, name: "Jungkook", category: "music", bio: "South Korean artist. BTS member and global phenomenon." },
    { id: 90, name: "V", category: "music", bio: "South Korean singer. BTS member with unique artistry." },
    { id: 91, name: "Jimin", category: "music", bio: "South Korean artist. BTS member and dance prodigy." },
    { id: 92, name: "Justin Timberlake", category: "music", bio: "American entertainer. Pop icon and actor." },
    { id: 93, name: "Chris Brown", category: "music", bio: "American R&B artist. Dancer and multi-platinum singer." },
    { id: 94, name: "Snoop Dogg", category: "music", bio: "American rapper. Hip-hop legend and cultural icon." },
    { id: 95, name: "50 Cent", category: "music", bio: "American rapper. Hip-hop mogul and entrepreneur." },
    { id: 96, name: "Kanye West", category: "music", bio: "American artist. Controversial genius and fashion designer." },
    { id: 97, name: "Camila Cabello", category: "music", bio: "Cuban-American singer. Former Fifth Harmony star." },
    { id: 98, name: "Olivia Rodrigo", category: "music", bio: "American singer. Gen-Z sensation and Grammy winner." },
    { id: 99, name: "Sam Smith", category: "music", bio: "British singer. Soulful vocalist and LGBTQ+ icon." },
    { id: 100, name: "Usher", category: "music", bio: "American R&B legend. King of R&B for decades." },
    { id: 101, name: "Lizzo", category: "music", bio: "American singer. Body positivity advocate and performer." },
    { id: 102, name: "Lil Nas X", category: "music", bio: "American rapper. Boundary-breaking viral sensation." },
    { id: 103, name: "Megan Thee Stallion", category: "music", bio: "American rapper. Grammy winner and hip-hop star." },
    { id: 104, name: "Arijit Singh", category: "music", bio: "Indian playback singer. Bollywood's voice of romance." },
    { id: 105, name: "Neha Kakkar", category: "music", bio: "Indian singer. Bollywood's party anthem queen." },
    { id: 106, name: "Badshah", category: "music", bio: "Indian rapper. Bollywood's hip-hop hitmaker." },
    { id: 107, name: "Shreya Ghoshal", category: "music", bio: "Indian classical singer. Most awarded Bollywood vocalist." },
    { id: 108, name: "Sia", category: "music", bio: "Australian singer. Mysterious artist with powerful vocals." },
    { id: 109, name: "Coldplay", category: "music", bio: "British rock band. One of the best-selling bands worldwide." },
    { id: 110, name: "Imagine Dragons", category: "music", bio: "American rock band. Alternative rock chart-toppers." },

    // ============ FILM & TV (111-170) ============
    { id: 111, name: "Dwayne Johnson", category: "film", bio: "American actor. 'The Rock' - Hollywood's highest-paid star." },
    { id: 112, name: "Tom Cruise", category: "film", bio: "American actor. Action icon and box office king." },
    { id: 113, name: "Leonardo DiCaprio", category: "film", bio: "American actor. Oscar winner and environmental activist." },
    { id: 114, name: "Will Smith", category: "film", bio: "American actor. From Fresh Prince to Hollywood royalty." },
    { id: 115, name: "Robert Downey Jr.", category: "film", bio: "American actor. The legendary Iron Man of MCU." },
    { id: 116, name: "Scarlett Johansson", category: "film", bio: "American actress. Marvel's Black Widow and versatile star." },
    { id: 117, name: "Jennifer Aniston", category: "film", bio: "American actress. Friends icon and beloved star." },
    { id: 118, name: "Angelina Jolie", category: "film", bio: "American actress. Oscar winner and humanitarian." },
    { id: 119, name: "Brad Pitt", category: "film", bio: "American actor. Oscar-winning producer and heartthrob." },
    { id: 120, name: "Johnny Depp", category: "film", bio: "American actor. Versatile star known for iconic characters." },
    { id: 121, name: "Margot Robbie", category: "film", bio: "Australian actress. Barbie star and producer." },
    { id: 122, name: "Zendaya", category: "film", bio: "American actress. Emmy winner and fashion icon." },
    { id: 123, name: "Tom Holland", category: "film", bio: "British actor. Marvel's beloved Spider-Man." },
    { id: 124, name: "Chris Hemsworth", category: "film", bio: "Australian actor. God of Thunder in MCU." },
    { id: 125, name: "Chris Evans", category: "film", bio: "American actor. Captain America and internet's hero." },
    { id: 126, name: "Gal Gadot", category: "film", bio: "Israeli actress. Wonder Woman and global star." },
    { id: 127, name: "Vin Diesel", category: "film", bio: "American actor. Fast & Furious franchise star." },
    { id: 128, name: "Jackie Chan", category: "film", bio: "Hong Kong legend. Martial arts icon and comedian." },
    { id: 129, name: "Keanu Reeves", category: "film", bio: "Canadian actor. Action star and internet's favorite human." },
    { id: 130, name: "Ryan Reynolds", category: "film", bio: "Canadian actor. Deadpool star and comedy king." },
    { id: 131, name: "Henry Cavill", category: "film", bio: "British actor. Superman and The Witcher star." },
    { id: 132, name: "Cillian Murphy", category: "film", bio: "Irish actor. Oscar winner for Oppenheimer." },
    { id: 133, name: "Millie Bobby Brown", category: "film", bio: "British actress. Stranger Things breakout star." },
    { id: 134, name: "Jenna Ortega", category: "film", bio: "American actress. Wednesday star and Gen-Z icon." },
    { id: 135, name: "Emma Watson", category: "film", bio: "British actress. Hermione and UN Women ambassador." },
    { id: 136, name: "Shah Rukh Khan", category: "film", bio: "Indian actor. 'King of Bollywood' and global icon." },
    { id: 137, name: "Salman Khan", category: "film", bio: "Indian actor. Bollywood superstar and massive following." },
    { id: 138, name: "Priyanka Chopra", category: "film", bio: "Indian actress. Miss World turned global star." },
    { id: 139, name: "Alia Bhatt", category: "film", bio: "Indian actress. Bollywood's leading lady of new generation." },
    { id: 140, name: "Deepika Padukone", category: "film", bio: "Indian actress. International star and entrepreneur." },
    { id: 141, name: "Akshay Kumar", category: "film", bio: "Indian actor. 'Khiladi' of Bollywood action films." },
    { id: 142, name: "Amitabh Bachchan", category: "film", bio: "Indian actor. The legendary 'Big B' of Bollywood." },
    { id: 143, name: "Arnold Schwarzenegger", category: "film", bio: "Austrian-American icon. Terminator and former Governor." },
    { id: 144, name: "Sylvester Stallone", category: "film", bio: "American actor. Rocky and Rambo creator and star." },
    { id: 145, name: "Jason Statham", category: "film", bio: "British actor. Action star and martial artist." },
    { id: 146, name: "Kevin Hart", category: "film", bio: "American comedian. Stand-up king and film star." },
    { id: 147, name: "Adam Sandler", category: "film", bio: "American actor. Comedy legend and Netflix king." },
    { id: 148, name: "Jim Carrey", category: "film", bio: "Canadian actor. Rubber-faced comedy genius." },
    { id: 149, name: "Morgan Freeman", category: "film", bio: "American actor. Voice of God and Oscar winner." },
    { id: 150, name: "Samuel L. Jackson", category: "film", bio: "American actor. Highest-grossing actor of all time." },
    { id: 151, name: "Benedict Cumberbatch", category: "film", bio: "British actor. Doctor Strange and Sherlock star." },
    { id: 152, name: "Tom Hiddleston", category: "film", bio: "British actor. Marvel's beloved Loki." },
    { id: 153, name: "Natalie Portman", category: "film", bio: "Israeli-American actress. Oscar winner and Harvard grad." },
    { id: 154, name: "Anne Hathaway", category: "film", bio: "American actress. Oscar winner and versatile star." },
    { id: 155, name: "Penélope Cruz", category: "film", bio: "Spanish actress. Oscar-winning international star." },
    { id: 156, name: "Salma Hayek", category: "film", bio: "Mexican actress. Hollywood star and producer." },
    { id: 157, name: "Sofia Vergara", category: "film", bio: "Colombian actress. Modern Family star and mogul." },
    { id: 158, name: "Courteney Cox", category: "film", bio: "American actress. Friends icon and producer." },
    { id: 159, name: "Matthew McConaughey", category: "film", bio: "American actor. Oscar winner and philosopher." },
    { id: 160, name: "George Clooney", category: "film", bio: "American actor. Oscar winner and humanitarian." },
    { id: 161, name: "Meryl Streep", category: "film", bio: "American actress. Most Oscar-nominated actor ever." },
    { id: 162, name: "Viola Davis", category: "film", bio: "American actress. EGOT winner and powerhouse." },
    { id: 163, name: "Sydney Sweeney", category: "film", bio: "American actress. Euphoria star and rising talent." },
    { id: 164, name: "Timothée Chalamet", category: "film", bio: "American actor. Gen-Z's leading man in Hollywood." },
    { id: 165, name: "Pedro Pascal", category: "film", bio: "Chilean-American actor. Mandalorian and internet's daddy." },
    { id: 166, name: "Austin Butler", category: "film", bio: "American actor. Elvis star and rising icon." },
    { id: 167, name: "Florence Pugh", category: "film", bio: "British actress. Oscar nominee and Marvel star." },
    { id: 168, name: "Anya Taylor-Joy", category: "film", bio: "Argentine-British actress. Queen's Gambit breakout star." },
    { id: 169, name: "Ryan Gosling", category: "film", bio: "Canadian actor. Ken, La La Land star, and heartthrob." },
    { id: 170, name: "Harrison Ford", category: "film", bio: "American actor. Indiana Jones and Han Solo legend." },

    // ============ BUSINESS & SOCIAL MEDIA (171-210) ============
    { id: 171, name: "Elon Musk", category: "business", bio: "Tech mogul. CEO of Tesla, SpaceX, and X." },
    { id: 172, name: "Bill Gates", category: "business", bio: "Microsoft founder. Philanthropist and tech pioneer." },
    { id: 173, name: "Jeff Bezos", category: "business", bio: "Amazon founder. E-commerce revolutionary and space explorer." },
    { id: 174, name: "Mark Zuckerberg", category: "business", bio: "Meta CEO. Facebook creator and metaverse visionary." },
    { id: 175, name: "Kylie Jenner", category: "business", bio: "American entrepreneur. Beauty mogul and reality star." },
    { id: 176, name: "Kim Kardashian", category: "business", bio: "American mogul. Reality star turned business empire." },
    { id: 177, name: "Khloé Kardashian", category: "business", bio: "American personality. Reality star and entrepreneur." },
    { id: 178, name: "Kendall Jenner", category: "business", bio: "American model. Supermodel and reality star." },
    { id: 179, name: "Kourtney Kardashian", category: "business", bio: "American personality. Reality star and wellness advocate." },
    { id: 180, name: "MrBeast", category: "business", bio: "American YouTuber. World's biggest content creator." },
    { id: 181, name: "PewDiePie", category: "business", bio: "Swedish YouTuber. Gaming legend and internet icon." },
    { id: 182, name: "Logan Paul", category: "business", bio: "American creator. YouTuber turned wrestler and boxer." },
    { id: 183, name: "Jake Paul", category: "business", bio: "American creator. YouTuber turned professional boxer." },
    { id: 184, name: "Charli D'Amelio", category: "business", bio: "American dancer. TikTok's first major superstar." },
    { id: 185, name: "Addison Rae", category: "business", bio: "American creator. TikTok star and actress." },
    { id: 186, name: "Bella Poarch", category: "business", bio: "Filipino-American creator. TikTok star and singer." },
    { id: 187, name: "Khaby Lame", category: "business", bio: "Senegalese-Italian creator. World's most followed TikToker." },
    { id: 188, name: "Andrew Tate", category: "business", bio: "British-American figure. Controversial internet personality." },
    { id: 189, name: "Warren Buffett", category: "business", bio: "American investor. 'Oracle of Omaha' and billionaire." },
    { id: 190, name: "Bernard Arnault", category: "business", bio: "French businessman. World's richest person and LVMH CEO." },
    { id: 191, name: "Jack Ma", category: "business", bio: "Chinese entrepreneur. Alibaba founder and visionary." },
    { id: 192, name: "Ratan Tata", category: "business", bio: "Indian industrialist. Tata Group chairman and philanthropist." },
    { id: 193, name: "Mukesh Ambani", category: "business", bio: "Indian businessman. Reliance Industries chairman." },
    { id: 194, name: "Gautam Adani", category: "business", bio: "Indian billionaire. Adani Group founder." },
    { id: 195, name: "Steve Jobs", category: "business", bio: "Apple co-founder. Visionary who changed technology forever." },
    { id: 196, name: "Sam Altman", category: "business", bio: "American entrepreneur. OpenAI CEO and AI pioneer." },
    { id: 197, name: "Jensen Huang", category: "business", bio: "Taiwanese-American CEO. NVIDIA founder and AI leader." },
    { id: 198, name: "Vitalik Buterin", category: "business", bio: "Russian-Canadian programmer. Ethereum co-founder." },
    { id: 199, name: "Oprah Winfrey", category: "business", bio: "American media mogul. Talk show queen and philanthropist." },
    { id: 200, name: "Gordon Ramsay", category: "business", bio: "British chef. Celebrity chef and TV personality." },
    { id: 201, name: "Martha Stewart", category: "business", bio: "American businesswoman. Lifestyle brand pioneer." },
    { id: 202, name: "Gary Vaynerchuk", category: "business", bio: "American entrepreneur. Social media marketing guru." },
    { id: 203, name: "Joe Rogan", category: "business", bio: "American podcaster. Host of world's biggest podcast." },
    { id: 204, name: "Lex Fridman", category: "business", bio: "American podcaster. AI researcher and interviewer." },
    { id: 205, name: "Jordan Peterson", category: "business", bio: "Canadian psychologist. Controversial intellectual figure." },
    { id: 206, name: "David Goggins", category: "business", bio: "American athlete. Motivational speaker and endurance athlete." },
    { id: 207, name: "Bear Grylls", category: "business", bio: "British adventurer. Survival expert and TV host." },
    { id: 208, name: "Dr. Phil", category: "business", bio: "American TV host. Psychology and self-help icon." },
    { id: 209, name: "Ellen DeGeneres", category: "business", bio: "American TV host. Comedian and talk show legend." },
    { id: 210, name: "Jimmy Fallon", category: "business", bio: "American host. Tonight Show host and comedian." },

    // ============ POLITICS & HISTORICAL (211-250) ============
    { id: 211, name: "Donald Trump", category: "politics", bio: "American politician. 45th & 47th US President and businessman." },
    { id: 212, name: "Barack Obama", category: "politics", bio: "American politician. 44th US President and Nobel laureate." },
    { id: 213, name: "Narendra Modi", category: "politics", bio: "Indian Prime Minister. Leader of world's largest democracy." },
    { id: 214, name: "Vladimir Putin", category: "politics", bio: "Russian President. Longest-serving Russian leader." },
    { id: 215, name: "Pope Francis", category: "politics", bio: "Catholic leader. Head of the Catholic Church." },
    { id: 216, name: "King Charles III", category: "politics", bio: "British monarch. King of the United Kingdom." },
    { id: 217, name: "Prince Harry", category: "politics", bio: "British royal. Duke of Sussex and author." },
    { id: 218, name: "Meghan Markle", category: "politics", bio: "American duchess. Actress turned royal and advocate." },
    { id: 219, name: "Joe Biden", category: "politics", bio: "American politician. 46th President of the United States." },
    { id: 220, name: "Xi Jinping", category: "politics", bio: "Chinese leader. President of the People's Republic of China." },
    { id: 221, name: "Emmanuel Macron", category: "politics", bio: "French President. Youngest French president in history." },
    { id: 222, name: "Volodymyr Zelenskyy", category: "politics", bio: "Ukrainian President. Former actor turned wartime leader." },
    { id: 223, name: "Dalai Lama", category: "politics", bio: "Tibetan leader. Spiritual leader and Nobel Peace laureate." },
    { id: 224, name: "Greta Thunberg", category: "politics", bio: "Swedish activist. Climate change icon and youth leader." },
    { id: 225, name: "Malala Yousafzai", category: "politics", bio: "Pakistani activist. Nobel laureate for girls' education." },
    { id: 226, name: "Michelle Obama", category: "politics", bio: "American lawyer. Former First Lady and author." },
    { id: 227, name: "Hillary Clinton", category: "politics", bio: "American politician. Former Secretary of State." },
    { id: 228, name: "Nelson Mandela", category: "politics", bio: "South African leader. Anti-apartheid icon and president." },
    { id: 229, name: "Mahatma Gandhi", category: "politics", bio: "Indian leader. Father of Indian independence movement." },
    { id: 230, name: "Martin Luther King Jr.", category: "politics", bio: "American leader. Civil rights icon and Nobel laureate." },
    { id: 231, name: "Albert Einstein", category: "politics", bio: "German physicist. Theory of relativity genius." },
    { id: 232, name: "Isaac Newton", category: "politics", bio: "English scientist. Father of modern physics." },
    { id: 233, name: "Nikola Tesla", category: "politics", bio: "Serbian inventor. Pioneer of AC electrical systems." },
    { id: 234, name: "Leonardo da Vinci", category: "politics", bio: "Italian polymath. Renaissance genius and artist." },
    { id: 235, name: "Gautama Buddha", category: "politics", bio: "Spiritual teacher. Founder of Buddhism." },
    { id: 236, name: "Jesus Christ", category: "politics", bio: "Religious figure. Central figure of Christianity." },
    { id: 237, name: "Prophet Muhammad", category: "politics", bio: "Religious figure. Founder and prophet of Islam." },
    { id: 238, name: "Aristotle", category: "politics", bio: "Greek philosopher. Father of Western philosophy." },
    { id: 239, name: "Socrates", category: "politics", bio: "Greek philosopher. Founder of Western ethics." },
    { id: 240, name: "William Shakespeare", category: "politics", bio: "English playwright. Greatest writer in English language." },
    { id: 241, name: "Abraham Lincoln", category: "politics", bio: "American president. Abolished slavery in the US." },
    { id: 242, name: "Julius Caesar", category: "politics", bio: "Roman leader. Transformed Rome into an empire." },
    { id: 243, name: "Alexander the Great", category: "politics", bio: "Macedonian king. Created one of history's largest empires." },
    { id: 244, name: "Napoleon Bonaparte", category: "politics", bio: "French emperor. Military genius who shaped Europe." },
    { id: 245, name: "Marie Curie", category: "politics", bio: "Polish scientist. First woman to win Nobel Prize." },
    { id: 246, name: "Stephen Hawking", category: "politics", bio: "British physicist. Black hole theorist and author." },
    { id: 247, name: "Charles Darwin", category: "politics", bio: "English naturalist. Father of evolutionary theory." },
    { id: 248, name: "Galileo Galilei", category: "politics", bio: "Italian astronomer. Father of modern observational astronomy." },
    { id: 249, name: "Thomas Edison", category: "politics", bio: "American inventor. Light bulb inventor and innovator." },
    { id: 250, name: "Alan Turing", category: "politics", bio: "British mathematician. Father of computer science and AI." },
];

// Get Top 10 for hero section - Global 2026 Fame Rankings (mix of most famous across ALL categories)
// Rankings based on: social media following, global recognition, cultural impact, news coverage
export const getTop10 = () => {
    // Global Top 10 Fame Index 2026 - IDs of the most famous people worldwide
    const globalTop10Ids = [
        1,    // Cristiano Ronaldo (Sports)
        2,    // Lionel Messi (Sports)
        211,  // Donald Trump (Politics)
        52,   // Selena Gomez (Music)
        51,   // Taylor Swift (Music)
        171,  // Elon Musk (Business)
        3,    // Virat Kohli (Sports)
        111,  // Dwayne Johnson (Film)
        175,  // Kylie Jenner (Business)
        176,  // Kim Kardashian (Business)
    ];

    // Return celebrities in fame-ranked order
    return globalTop10Ids.map(id => famousPeople.find(p => p.id === id)).filter(Boolean);
};

// Filter by category
export const filterByCategory = (category) => {
    if (category === 'all') return famousPeople;
    return famousPeople.filter(person => person.category === category);
};

// Search people
export const searchPeople = (query, category = 'all') => {
    const lowercaseQuery = query.toLowerCase();
    let results = famousPeople.filter(person =>
        person.name.toLowerCase().includes(lowercaseQuery) ||
        person.bio.toLowerCase().includes(lowercaseQuery)
    );

    if (category !== 'all') {
        results = results.filter(person => person.category === category);
    }

    return results;
};
