import './App.css'
import { dictionary } from './data'
import { FlashcardPage } from './features/flashcard'

const n5Vocabulary = dictionary.vocabularyList.filter((v) => v.jlptLevel === 'N5')

function App() {
  return (
    <>
      <header>
        <h1>JP Flash</h1>
        <p>Flashcard kosakata JLPT N5</p>
      </header>

      <main>
        <FlashcardPage dictionary={dictionary} vocabulary={n5Vocabulary} />
      </main>

      <footer>
        <small>
          Contains data from <a href="https://github.com/evanclan/OpenJLPT">OpenJLPT</a> (
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>), which uses
          JMdict and KANJIDIC2 (EDRDG), Jonathan Waller&apos;s JLPT lists, and Tatoeba.
        </small>
      </footer>
    </>
  )
}

export default App
