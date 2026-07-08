# Reverie

Een verhalen- en associatiespel voor 3 tot 10 spelers, geïnspireerd op het principe van klassieke associatiekaartspellen — met een eigen identiteit, eigen artwork en (later) AI-functionaliteiten. Zie [docs/CONCEPT.md](docs/CONCEPT.md) voor het volledige concept.

Elke ronde kiest de **verteller** een kaart en geeft een hint: een woord, een zin, een gevoel. De anderen kiezen uit hun hand de kaart die er het beste bij past. Alles wordt geschud en iedereen raadt welke kaart van de verteller was. Te makkelijk of te moeilijk? Dan scoort de verteller niets.

## Status van deze versie (v0.1)

| Onderdeel | Status |
|---|---|
| Volledige spelregels & puntentelling (klassiek) | ✅ Werkt, met unittests |
| Samen spelen op één telefoon (pass-en-speel met privacyschermen) | ✅ Werkt |
| Klassiek & Blitz-modus | ✅ Werkt |
| Procedureel gegenereerd surrealistisch kaart-artwork (96 kaarten) | ✅ Werkt |
| Eindscherm met podium en statistieken | ✅ Werkt |
| Online spelen via kamercode | 🔧 Voorbereid (Firebase-adapter aanwezig, configuratie vereist) |
| AI-kaarten, AI-thema's, AI-hints | 🔮 Roadmap |

## Starten

```bash
npm install
npm start          # Expo dev server; scan de QR-code met Expo Go (iOS/Android)
npm run web        # of speel in de browser
npm test           # unittests van de spelregels
npm run typecheck  # TypeScript-controle
```

## Architectuur

```
src/
├── game/          # Pure spelregels, geen React of netwerk. Volledig getest.
│   ├── types.ts   #   GameState, acties, instellingen
│   ├── engine.ts  #   Reducer: lobby → hint → kiezen → stemmen → uitslag → einde
│   ├── scoring.ts #   Klassieke puntentelling incl. lokbonus (max 3)
│   ├── deck.ts    #   Kaartenset (96 kaart-ids)
│   └── rng.ts     #   Deterministisch schudden (seed → reproduceerbaar spel)
├── art/           # Procedureel SVG-artwork: elke kaart-id levert altijd
│                  # dezelfde dromerige scène op (maan, deur, sleutel, walvis, ...)
├── screens/       # Home, lobby, overdracht, hint, kiezen, stemmen, uitslag, podium
├── components/    # Kaart, kaartraster, knoppen, spelkop met score en timer
├── multiplayer/   # RoomService-abstractie + Firebase Firestore-adapter
├── i18n/          # Alle teksten (Nederlands) op één plek
└── theme.ts       # Minimalistisch thema: witruimte, rust, focus op de kaarten
```

Het hart van de app is de **reducer in `src/game/engine.ts`**: elke spelactie (hint geven, kaart leggen, stemmen) is een puur `(state, action) → state`. Daardoor:

- draait exact dezelfde spellogica lokaal én straks op de host van een onlinekamer;
- is elk spelverloop reproduceerbaar via de seed (handig voor tests en replays);
- is de volledige regelset gedekt door unittests (`npm test`).

### Kaart-artwork

De basisset van 96 kaarten wordt procedureel getekend (`src/art/CardArt.tsx`): uit het kaart-id volgen deterministisch een kleurenpalet, hemellichaam, zwevende eilanden en één symbolisch motief (deur, sleutel, vogel, luchtballon, vuurtoren, walvis, ...). Zodra er echte illustraties of AI-gegenereerde sets zijn, vullen die dezelfde kaart-ids in zonder dat de spelregels veranderen.

### Online spelen activeren

1. Maak een project aan op [console.firebase.google.com](https://console.firebase.google.com) en activeer Cloud Firestore.
2. Plak de webconfiguratie in `src/multiplayer/firebaseConfig.ts`.
3. De onlineknop op het startscherm wordt dan actief; kamers werken met een 5-letterige code.

Het synchronisatiemodel: de host is de bron van waarheid, spelers sturen acties naar de kamer, de host past ze toe met dezelfde reducer en publiceert de nieuwe staat (`src/multiplayer/FirebaseRoomService.ts`).

## Roadmap

- **Online multiplayer afronden** — lobby-UI voor kamercode, hostlogica koppelen aan de bestaande `RoomService`.
- **AI-kaarten** — per spel een uniek gegenereerde kaartenset rond een thema (dromen, horror, cyberpunk, ...).
- **AI-hints** — inspiratieknop voor de verteller.
- **AI-verhalen** — na de ronde uitleggen waarom een kaart bij de hint past.
- **Profielen & ranked** — accounts, niveaus, winstatistieken over meerdere spellen.
- **Speciale regels voor 3 spelers** (ieder 2 kaarten inleveren) en afdwingbare timer (Blitz).
