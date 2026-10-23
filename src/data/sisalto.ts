// Portfolion sisältö molemmilla kielillä. Sivut (pages/index.astro, pages/en/index.astro)
// renderöivät saman Portfolio-komponentin tällä datalla.

export type Kieli = 'fi' | 'en';

export interface Linkki {
  teksti: string;
  url: string;
}

export interface Projekti {
  id: string;
  nimi: string;
  tyyppi: string;
  kuvaus: string;
  kohdat: string[];
  tekniikat: string[];
  kuvat: { src: string; alt: string; leveys: number; korkeus: number }[];
  mobiilikuvat?: boolean; // pystykuvat (puhelinnäkymä) rinnakkain
  linkit: Linkki[];
}

export interface Sisalto {
  kieli: Kieli;
  title: string;
  description: string;
  nav: { projektit: string; osaaminen: string; minusta: string; vaihdaKieli: string; vaihdaKieliUrl: string };
  hero: { tervehdys: string; rooli: string; esittely: string; tila: string; cta: string; github: string };
  projektitOtsikko: string;
  projektitAla: string;
  projektit: Projekti[];
  muutOtsikko: string;
  muut: { nimi: string; kuvaus: string; tekniikat: string[]; linkki?: Linkki }[];
  osaaminenOtsikko: string;
  osaaminen: { ryhma: string; taidot: string[] }[];
  minustaOtsikko: string;
  minusta: string[];
  yhteysOtsikko: string;
  yhteysTeksti: string;
  alatunniste: string;
}

const GITHUB = 'https://github.com/jehkis';

const kuvat = {
  pokestock: [
    { src: '/kuvat/pokestock-kauppa.webp', leveys: 1200, korkeus: 750 },
    { src: '/kuvat/pokestock-kortti.webp', leveys: 1200, korkeus: 750 },
  ],
  norseman: [
    { src: '/kuvat/norseman-tanaan.webp', leveys: 390, korkeus: 844 },
    { src: '/kuvat/norseman-treeni.webp', leveys: 390, korkeus: 844 },
    { src: '/kuvat/norseman-edistyminen.webp', leveys: 390, korkeus: 844 },
  ],
  liikunta: [{ src: '/kuvat/liikuntaseuranta.webp', leveys: 1200, korkeus: 750 }],
};

const fi: Sisalto = {
  kieli: 'fi',
  title: 'Joona Jehkonen – full stack -kehittäjä',
  description: 'Joona Jehkosen portfolio: web-sovelluksia käyttöliittymästä tietokantaan. JavaScript, TypeScript, Node.js, Astro, MongoDB ja PostgreSQL.',
  nav: { projektit: 'Projektit', osaaminen: 'Osaaminen', minusta: 'Minusta', vaihdaKieli: 'EN', vaihdaKieliUrl: '/en/' },
  hero: {
    tervehdys: 'Hei, olen',
    rooli: 'Full stack -kehittäjä',
    esittely: 'Rakennan web-sovelluksia käyttöliittymästä tietokantaan. Teen projekteja, joita käytetään oikeasti: treenipäiväkirjaa käytän itse päivittäin, ja korttikauppa myy omia Pokémon-korttejani.',
    tila: 'Etsin junior-tason full stack- tai web-kehittäjän työtä',
    cta: 'Katso projektit',
    github: 'GitHub',
  },
  projektitOtsikko: 'Projektit',
  projektitAla: 'Kolme projektia, joissa on mukana koko polku käyttöliittymästä dataan.',
  projektit: [
    {
      id: 'pokestock',
      nimi: 'PokeStock 2.0',
      tyyppi: 'Verkkokauppa ja varastonhallinta',
      kuvaus: 'Pokémon-korttikokoelmani myyntisivu ja ylläpito. Ostaja selaa kortteja ja tekee tarjouksen, ja ylläpidossa hallitaan varastoa, hintoja ja tarjouksia. Jatkokehitetty versio kurssiprojektista.',
      kohdat: [
        'Astro-frontend: kauppa on staattinen sivu, korttisivut renderöidään palvelimella, ja jaettu linkki näyttää kortin kuvan ja hinnan esikatseluna (Open Graph).',
        'Express-rajapinta ja MongoDB. Hinta-arviot haetaan Cardmarketista TCGdex-rajapinnan kautta, ja tarjouksista lähtee sähköposti-ilmoitus.',
        'Kortteihin on kytketty 216 omaa valokuvaa. Ladattu kuva rajataan automaattisesti, ja sijaintitiedot poistetaan ennen tallennusta.',
        'Docker multi-stage -build ja Docker Compose: sovellus ja tietokanta käynnistyvät yhdellä komennolla.',
      ],
      tekniikat: ['Astro', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'sharp', 'Docker'],
      kuvat: [
        { ...kuvat.pokestock[0], alt: 'PokeStockin kauppanäkymä: tumma korttiruudukko, haku ja kategoriat' },
        { ...kuvat.pokestock[1], alt: 'PokeStockin korttisivu: iso valokuva kortista, hinta ja tarjousnappi' },
      ],
      linkit: [{ teksti: 'Koodi', url: `${GITHUB}/pokestock-2` }],
    },
    {
      id: 'norseman',
      nimi: 'Norseman 2030',
      tyyppi: 'Treenipäiväkirja (PWA)',
      kuvaus: 'Harjoittelusovellus pitkälle tavoitteelleni, Norseman Xtreme -triathlonille vuonna 2030. Sovellus näyttää päivän treenin suunnitelmasta, ja kirjaukset muuttuvat kehityskaavioiksi. Käytän sitä itse päivittäin.',
      kohdat: [
        'Supabase-taustajärjestelmä: PostgreSQL, kirjautuminen ja Row Level Security, joten jokainen näkee vain omat rivinsä. Data synkronoituu puhelimen ja koneen välillä reaaliajassa.',
        'Strava-integraatio Supabase Edge Functionilla: OAuth-salaisuus ei päädy selaimeen. Mukana tulevat kilometriajat sekä syke-, vauhti- ja korkeuskäyrät.',
        'Kaaviot on piirretty itse SVG:llä ilman kirjastoja, ja sovelluksen voi asentaa puhelimeen (PWA).',
        'Julkinen demo ilman kirjautumista: Supabase-asiakas korvataan localStoragea käyttävällä versiolla, eikä itse sovelluskoodiin tarvitse koskea.',
      ],
      tekniikat: ['JavaScript', 'PWA', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Strava API', 'SVG'],
      kuvat: [
        { ...kuvat.norseman[0], alt: 'Norseman-sovelluksen päivänäkymä' },
        { ...kuvat.norseman[1], alt: 'Treenin tarkemmat tiedot' },
        { ...kuvat.norseman[2], alt: 'Kehityskaaviot' },
      ],
      mobiilikuvat: true,
      linkit: [
        { teksti: 'Kokeile demoa', url: 'https://jehkis.github.io/norseman-demo/' },
        { teksti: 'Koodi', url: 'https://github.com/norseman-diary/norseman' },
      ],
    },
    {
      id: 'liikunta',
      nimi: 'Liikuntaseuranta',
      tyyppi: 'JavaScript-kurssin projektityö',
      kuvaus: 'Selainsovellus viikon liikuntasuoritusten kirjaamiseen. Sovellus laskee yhteenvedon lajeittain ja päivittäin ja säilyttää aiemmat viikot.',
      kohdat: [
        'Tehty pelkällä HTML:llä, CSS:llä ja JavaScriptillä ilman kirjastoja.',
        'Lomake mukautuu lajin mukaan, ja syötteet tarkistetaan huolella. Esimerkiksi saman päivän suoritukset eivät voi ylittää 24 tuntia.',
        'Pylväs- ja palkkikaaviot on tehty CSS:llä. Tiedot säilyvät selaimen localStoragessa.',
        'Responsiivinen ulkoasu ja tumma teema laitteen asetuksen mukaan.',
      ],
      tekniikat: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
      kuvat: [{ ...kuvat.liikunta[0], alt: 'Liikuntaseurannan näkymä: lomake, yhteenveto ja viikon kaavio' }],
      linkit: [
        { teksti: 'Kokeile', url: 'https://jehkis.github.io/liikuntaseuranta/' },
        { teksti: 'Koodi', url: `${GITHUB}/liikuntaseuranta` },
      ],
    },
  ],
  muutOtsikko: 'Muuta',
  muut: [
    {
      nimi: 'OSRS Prayer Helper',
      kuvaus: 'Java-plugin Old School RuneScapen RuneLite-asiakasohjelmaan. Hyväksytty RuneLiten virallisiin Plugin Hubiin.',
      tekniikat: ['Java', 'Gradle', 'RuneLite API'],
      linkki: { teksti: 'Hyväksytty PR', url: 'https://github.com/runelite/plugin-hub/pull/11256' },
    },
    {
      nimi: 'Linux-työympäristö ja git-palvelin puhelimessa',
      kuvaus: 'Oma Linux-työympäristö skripteinä, jotka saa asennettua uudelle koneelle. Vanhasta puhelimesta on tehty git-palvelin, ja systemd-ajastin synkronoi projektit automaattisesti.',
      tekniikat: ['Linux', 'Bash', 'systemd', 'Git', 'SSH'],
    },
  ],
  osaaminenOtsikko: 'Osaaminen',
  osaaminen: [
    { ryhma: 'Frontend', taidot: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Astro', 'PWA'] },
    { ryhma: 'Backend', taidot: ['Node.js', 'Express', 'REST-rajapinnat', 'Supabase Edge Functions'] },
    { ryhma: 'Tietokannat', taidot: ['MongoDB', 'PostgreSQL', 'SQL'] },
    { ryhma: 'Työkalut', taidot: ['Git ja GitHub', 'Docker', 'Linux', 'Java', 'Tekoälyavusteinen kehitys (Claude Code)'] },
  ],
  minustaOtsikko: 'Minusta',
  minusta: [
    'Opiskelen Laurea-ammattikorkeakoulussa ja rakennan opintojen ohella omia sovelluksia. Kiinnostavimpia ovat projektit, joissa saa tehdä koko ketjun: käyttöliittymän, rajapinnan, tietokannan ja julkaisun.',
    'Käytän tekoälyavusteisia työkaluja osana kehitystä ja panostan siihen, että ymmärrän tekemäni ratkaisut ja osaan perustella ne.',
    'Vapaa-ajalla treenaan kestävyyslajeja. Tavoitteena on Norseman Xtreme -triathlon vuonna 2030, ja sama pitkäjänteisyys näkyy myös koodaamisessa.',
  ],
  yhteysOtsikko: 'Ota yhteyttä',
  yhteysTeksti: 'Projektit ja koodi löytyvät GitHubista. Sieltä tavoitat minut myös.',
  alatunniste: 'Tehty Astrolla.',
};

const en: Sisalto = {
  kieli: 'en',
  title: 'Joona Jehkonen – Full stack developer',
  description: 'Portfolio of Joona Jehkonen: web applications from the user interface to the database. JavaScript, TypeScript, Node.js, Astro, MongoDB and PostgreSQL.',
  nav: { projektit: 'Projects', osaaminen: 'Skills', minusta: 'About', vaihdaKieli: 'FI', vaihdaKieliUrl: '/' },
  hero: {
    tervehdys: "Hi, I'm",
    rooli: 'Full stack developer',
    esittely: 'I build web applications from the user interface to the database. My projects are used for real: I use my training diary every day, and the card shop sells my own Pokémon cards.',
    tila: 'Looking for a junior full stack or web developer role',
    cta: 'See projects',
    github: 'GitHub',
  },
  projektitOtsikko: 'Projects',
  projektitAla: 'Three projects that cover the whole path from the interface to the data.',
  projektit: [
    {
      id: 'pokestock',
      nimi: 'PokeStock 2.0',
      tyyppi: 'Web shop and inventory management',
      kuvaus: 'A shop and admin panel for my Pokémon card collection. Buyers browse cards and make offers; the admin panel manages stock, prices and offers. A further developed version of a course project.',
      kohdat: [
        'Astro frontend: the shop is a static page, card pages are rendered on the server, and a shared link shows a preview with the card photo and price (Open Graph).',
        'Express API and MongoDB. Price estimates come from Cardmarket via the TCGdex API, and offers trigger an email notification.',
        '216 of my own photos are linked to the cards. Uploaded photos are cropped automatically, and location data is removed before saving.',
        'Docker multi-stage build and Docker Compose: the app and the database start with one command.',
      ],
      tekniikat: ['Astro', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'sharp', 'Docker'],
      kuvat: [
        { ...kuvat.pokestock[0], alt: 'PokeStock shop view: dark card grid, search and categories' },
        { ...kuvat.pokestock[1], alt: 'PokeStock card page: large photo of the card, price and offer button' },
      ],
      linkit: [{ teksti: 'Code', url: `${GITHUB}/pokestock-2` }],
    },
    {
      id: 'norseman',
      nimi: 'Norseman 2030',
      tyyppi: 'Training diary (PWA)',
      kuvaus: 'A training app for my long-term goal, the Norseman Xtreme Triathlon in 2030. It shows the day’s workout from the plan and turns the log into progress charts. I use it every day.',
      kohdat: [
        'Supabase backend: PostgreSQL, authentication and Row Level Security, so every user sees only their own rows. Data syncs between phone and computer in real time.',
        'Strava integration with a Supabase Edge Function, so the OAuth secret never reaches the browser. It imports km splits and heart-rate, pace and elevation curves.',
        'Charts are drawn with plain SVG without libraries, and the app can be installed on a phone (PWA).',
        'Public demo with no login: the Supabase client is swapped for a localStorage-based version without touching the app code.',
      ],
      tekniikat: ['JavaScript', 'PWA', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Strava API', 'SVG'],
      kuvat: [
        { ...kuvat.norseman[0], alt: 'Norseman app: today view' },
        { ...kuvat.norseman[1], alt: 'Workout details' },
        { ...kuvat.norseman[2], alt: 'Progress charts' },
      ],
      mobiilikuvat: true,
      linkit: [
        { teksti: 'Try the demo', url: 'https://jehkis.github.io/norseman-demo/' },
        { teksti: 'Code', url: 'https://github.com/norseman-diary/norseman' },
      ],
    },
    {
      id: 'liikunta',
      nimi: 'Activity tracker',
      tyyppi: 'JavaScript course project',
      kuvaus: 'A browser app for logging the week’s workouts. It sums up the week by sport and by day and keeps a history of past weeks. The interface is in Finnish.',
      kohdat: [
        'Built with plain HTML, CSS and JavaScript, no libraries.',
        'The form adapts to the selected sport and validates input carefully. For example, one day’s workouts cannot add up to more than 24 hours.',
        'Bar charts are made with CSS. Data is kept in the browser’s localStorage.',
        'Responsive layout and a dark theme that follows the device setting.',
      ],
      tekniikat: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
      kuvat: [{ ...kuvat.liikunta[0], alt: 'Activity tracker: form, summary and weekly chart' }],
      linkit: [
        { teksti: 'Try it', url: 'https://jehkis.github.io/liikuntaseuranta/' },
        { teksti: 'Code', url: `${GITHUB}/liikuntaseuranta` },
      ],
    },
  ],
  muutOtsikko: 'Other work',
  muut: [
    {
      nimi: 'OSRS Prayer Helper',
      kuvaus: 'A Java plugin for RuneLite, the Old School RuneScape client. Accepted into the official RuneLite Plugin Hub.',
      tekniikat: ['Java', 'Gradle', 'RuneLite API'],
      linkki: { teksti: 'Merged PR', url: 'https://github.com/runelite/plugin-hub/pull/11256' },
    },
    {
      nimi: 'Linux setup and a git server on a phone',
      kuvaus: 'My Linux work environment as scripts that install it on a new machine. An old phone runs as a git server, and a systemd timer syncs the projects automatically.',
      tekniikat: ['Linux', 'Bash', 'systemd', 'Git', 'SSH'],
    },
  ],
  osaaminenOtsikko: 'Skills',
  osaaminen: [
    { ryhma: 'Frontend', taidot: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Astro', 'PWA'] },
    { ryhma: 'Backend', taidot: ['Node.js', 'Express', 'REST APIs', 'Supabase Edge Functions'] },
    { ryhma: 'Databases', taidot: ['MongoDB', 'PostgreSQL', 'SQL'] },
    { ryhma: 'Tools', taidot: ['Git & GitHub', 'Docker', 'Linux', 'Java', 'AI-assisted development (Claude Code)'] },
  ],
  minustaOtsikko: 'About me',
  minusta: [
    'I study at Laurea University of Applied Sciences and build my own applications alongside my studies. I enjoy projects where I get to do the whole chain: the interface, the API, the database and the deployment.',
    'I use AI-assisted tools as part of development, and I make a point of understanding the solutions I ship and being able to explain them.',
    'In my free time I train for endurance sports. My goal is the Norseman Xtreme Triathlon in 2030, and the same persistence carries over to coding.',
  ],
  yhteysOtsikko: 'Get in touch',
  yhteysTeksti: 'My projects and code are on GitHub, and that is also the best place to reach me.',
  alatunniste: 'Built with Astro.',
};

export const sisalto: Record<Kieli, Sisalto> = { fi, en };
