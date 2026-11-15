import './App.css'
import { dataMeta, dictionary, getVocabularyForKanji } from './data'

// Sementara: halaman ringkas untuk memastikan data dan relasi sudah tersambung.
// Akan diganti dengan UI flashcard di step berikutnya.
function App() {
  const demoKanji = '日'
  const demoWords = getVocabularyForKanji(dictionary, demoKanji)

  return (
    <main>
      <h1>JP Flash</h1>
      <p>
        {dataMeta.counts.vocabulary} kosakata · {dataMeta.counts.kanji} kanji (OpenJLPT{' '}
        {dataMeta.sourceVersion})
      </p>

      <h2>Kosakata yang memakai {demoKanji}</h2>
      <ul>
        {demoWords.map((v) => (
          <li key={v.id}>
            {v.word} ({v.reading}) — {v.meanings.join(', ')}
          </li>
        ))}
      </ul>

      <footer>
        <small>
          Contains data from <a href="https://github.com/evanclan/OpenJLPT">OpenJLPT</a> (
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>), which uses
          JMdict and KANJIDIC2 (EDRDG), Jonathan Waller&apos;s JLPT lists, and Tatoeba.
        </small>
      </footer>
    </main>
  )
}

export default App
