# JP Flash

Japanese flashcard app with kanji ↔ vocabulary linking (JLPT/JFT), built with React + TypeScript.

🚧 Work in progress

## Getting started

```bash
npm install
npm run dev      # dev server
npm test         # unit tests (Vitest)
npm run build    # type-check + production build
```

## Data

Vocabulary and kanji come from [OpenJLPT](https://github.com/evanclan/OpenJLPT) and are converted
into this app's format by `scripts/import-openjlpt.ts`. The generated files live in
`src/data/generated/` and are committed, so the app needs no network access.

To regenerate (for example, after OpenJLPT updates or to add a level):

```bash
git clone --depth 1 https://github.com/evanclan/OpenJLPT.git ../OpenJLPT
npm run import:data -- ../OpenJLPT
```

Only `Vocabulary.kanjiIds` is stored. The reverse relation (kanji → vocabulary) is built in memory
by `buildDictionary()` in `src/data/dictionary.ts`.

## License & attribution

Contains data from [OpenJLPT](https://github.com/evanclan/OpenJLPT)
([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)), which uses JMdict and KANJIDIC2
([EDRDG](https://www.edrdg.org/edrdg/licence.html)), Jonathan Waller's JLPT lists, and
[Tatoeba](https://tatoeba.org) (CC BY 2.0 FR). The data in `src/data/generated/` is therefore
distributed under CC BY-SA 4.0.
