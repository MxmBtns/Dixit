# Appconcept – AI-geïnspireerd verhalen- en associatiespel

## Overzicht

Het idee is een mobiele app voor iOS en Android die het concept van een associatie- en verhalenkaartspel digitaliseert. De app is bedoeld om met vrienden of familie te spelen, waarbij iedereen zijn eigen smartphone gebruikt. Het spel draait volledig rond creativiteit, interpretatie en verbeelding.

Het doel is **niet** om bestaande spellen te kopiëren, maar om een nieuw spel te maken dat hetzelfde gevoel geeft, met een eigen identiteit, eigen artwork en later zelfs AI-functionaliteiten.

## Doelgroep

- Vriendengroepen, families, studenten
- Mensen die op café of op reis gezelschapsspellen spelen
- Iedereen die creatieve partygames leuk vindt

Aantal spelers: 3 tot 10 (uitbreidbaar). Gemiddelde speelduur: 20 tot 45 minuten.

## Het basisprincipe

Iedere speler beschikt over een hand met digitale kaarten. Elke kaart toont een surrealistische, artistieke of mysterieuze illustratie zonder tekst.

Tijdens elke ronde is één speler de **verteller**. Die kiest één kaart uit zijn hand en geeft een hint. Die hint kan werkelijk alles zijn: één woord, een zin, een citaat, een emotie, een liedje, een geluid, een herinnering.

Bijvoorbeeld: *"Verlangen"*, *"De laatste trein naar huis"*, *"Alsof je iets vergeten bent."*

## Verloop van een ronde

1. **Verteller** — De app kiest automatisch een verteller. Hij ziet zijn kaarten, kiest één kaart en schrijft een hint.
2. **Andere spelers** — Iedere andere speler bekijkt zijn eigen kaarten en kiest de kaart die volgens hem het beste bij de hint past.
3. **Schudden** — Alle gekozen kaarten worden automatisch verzameld en geschud. Niemand weet meer welke kaart van wie is.
4. **Stemmen** — Iedere speler (behalve de verteller) probeert te raden welke kaart oorspronkelijk van de verteller was.
5. **Punten** — Na het stemmen toont de app wie welke kaart speelde, wie waarop stemde en hoeveel punten iedereen krijgt. Daarna begint automatisch de volgende ronde.

## Puntensysteem

- **Iedereen raadt de juiste kaart** → de verteller krijgt 0 punten (de hint was te gemakkelijk).
- **Niemand raadt de juiste kaart** → de verteller krijgt ook 0 punten (de hint was te moeilijk).
- **Slechts een deel van de spelers raadt juist** → de verteller krijgt punten.
- Extra: spelers krijgen ook punten wanneer andere spelers op hun kaart stemmen. Zo loont het om een slimme kaart te kiezen.

## Interface

Zeer minimalistisch: veel witruimte, grote illustraties, weinig knoppen, rustige animaties. Focus op de kaarten.

## Lobby

Een speler maakt een kamer, de app genereert een code, andere spelers voeren de code in. Wanneer iedereen aanwezig is: Start Game.

## Tijdens het spel

Iedere speler gebruikt uitsluitend zijn eigen telefoon. Hij ziet zijn kaarten, de hint, de timer en de score — nooit de kaarten van anderen.

## Einde van het spel

Na bijvoorbeeld 30 punten of 10 rondes verschijnt de eindscore, een podium en statistieken.

## Kaarten

De kaarten vormen het belangrijkste onderdeel. Geen gewone foto's, maar surrealistische kunst, dromerige illustraties, symbolische beelden, mysterieuze scènes, emotionele afbeeldingen. Denk aan zwevende eilanden, een gigantische maan, een deur midden in een bos, een vogel met een sleutel, regen in een bibliotheek. Elke kaart moet verschillende interpretaties toelaten.

## AI-integratie (latere versie)

- **AI-kaarten** — In plaats van een vaste kaartenset genereert AI nieuwe afbeeldingen. Bijvoorbeeld thema "Dromen": AI genereert 100 unieke kaarten. Geen spel is ooit hetzelfde.
- **AI-thema's** — Spelers kiezen: fantasy, horror, nostalgie, kinderwereld, ruimte, mythologie, middeleeuwen, cyberpunk. De volledige kaartenset wordt daarop aangepast.
- **AI-hints** — De app kan helpen wanneer iemand geen inspiratie heeft: "Geef mij drie mysterieuze hints."
- **AI-verhalen** — Na iedere ronde kan AI vertellen waarom een kaart goed bij een hint past. Leuk voor discussie.

## Statistieken

De app houdt gegevens bij zoals meest gekozen hints, beste verteller, meest misleidende speler, winpercentage en aantal gespeelde rondes.

## Profielen

Iedere speler heeft een naam, avatar, niveau en aantal gewonnen spellen.

## Mogelijke spelmodi

- **Klassiek** — zoals hierboven.
- **Blitz** — kortere timer, sneller spel.
- **AI Chaos** — iedere ronde worden AI-afbeeldingen gegenereerd.
- **Thema Avond** — alle kaarten draaien rond horror, dieren, films, muziek of sprookjes.
- **Ranked** — voor competitieve spelers.

## Verdienmodel (optioneel)

Gratis: basiskaartenset. Premium: extra thema's, AI-generatie, exclusieve illustraties, speciale avatars.

## Technische uitwerking

- **Frontend** — React Native (één codebase voor iOS en Android)
- **Backend** — Firebase of Supabase
- **Realtime multiplayer** — Firebase Realtime Database of Firestore
- **Authenticatie** — e-mail, Google of Apple
- **AI (latere fase)** — afbeeldingengeneratie voor unieke kaarten, tekstgeneratie voor hints en spelmodi

## Waarom dit concept interessant is

In tegenstelling tot een fysieke kaartenset biedt deze app vrijwel onbeperkte variatie. Nieuwe kaarten, thema's en spelmodi kunnen voortdurend worden toegevoegd en AI kan ervoor zorgen dat elk spel anders aanvoelt. Tegelijk blijft de kern van het spel eenvoudig en toegankelijk: creativiteit, interpretatie en interactie tussen spelers. Hierdoor combineert de app de charme van een klassiek gezelschapsspel met de flexibiliteit van een digitaal platform.
