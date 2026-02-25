import { useState, useEffect } from 'react'
import { Volume2, Square, ChevronDown, ChevronUp, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { useTTS } from '../../hooks/useTTS'

export function MiniTextExercise({ exercise, lesson, onComplete }) {
  const { speak, stop, speaking } = useTTS()
  const [phase, setPhase] = useState('reading') // 'reading' | 'questions'
  const [translationOpen, setTranslationOpen] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = exercise.questions || []
  const total = questions.length

  // Speak current question when phase changes to questions or currentQ changes
  useEffect(() => {
    if (phase === 'questions' && questions[currentQ]) {
      speak(questions[currentQ].question, 'de-DE', 0.85)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentQ])

  function handleTTS() {
    if (speaking) {
      stop()
    } else {
      speak(exercise.text, 'de-DE', 0.85)
    }
  }

  function handleStartQuestions() {
    stop()
    setPhase('questions')
  }

  function handleSelect(idx) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === questions[currentQ].answer) {
      setCorrect(c => c + 1)
    }
  }

  function handleNext() {
    if (currentQ + 1 < total) {
      setSelected(null)
      setCurrentQ(q => q + 1)
    } else {
      setFinished(true)
      stop()
    }
  }

  function handleComplete() {
    const score = total > 0 ? Math.round((correct / total) * 100) : 0
    onComplete(score)
  }

  if (phase === 'reading') {
    return (
      <div className="space-y-5">
        {/* Instruction */}
        <p className="text-sm text-gray-400">{exercise.instruction}</p>

        {/* Text card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 relative">
          {/* TTS button top-right */}
          <button
            onClick={handleTTS}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              speaking
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            title={speaking ? 'Zastaviť' : 'Prehrať text'}
          >
            {speaking ? <Square size={16} /> : <Volume2 size={16} />}
          </button>

          {/* German text */}
          <p className="text-base leading-relaxed text-white pr-12 whitespace-pre-wrap">
            {exercise.text}
          </p>

          {/* Translation toggle */}
          <div className="mt-4 border-t border-gray-800 pt-3">
            <button
              onClick={() => setTranslationOpen(o => !o)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              {translationOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              Preložiť
            </button>
            {translationOpen && (
              <p className="mt-2 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {exercise.textSk}
              </p>
            )}
          </div>
        </div>

        {/* Proceed button */}
        <div className="flex justify-end">
          <button
            onClick={handleStartQuestions}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Odpovedať na otázky
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // === QUESTIONS PHASE ===

  if (finished) {
    const score = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <div className="space-y-5">
        {/* Progress bar full */}
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full w-full transition-all duration-500" />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center space-y-3">
          <p className="text-lg font-semibold text-white">Hotovo!</p>
          <p className="text-4xl font-bold text-blue-400">{score}%</p>
          <p className="text-sm text-gray-400">
            {correct} / {total} správnych odpovedí
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Pokračovať
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  const q = questions[currentQ]
  const isCorrect = selected === q.answer
  const progress = ((currentQ) / total) * 100

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question counter */}
      <p className="text-xs text-gray-500 text-right">
        {currentQ + 1} / {total}
      </p>

      {/* Question card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
        <p className="text-base font-medium text-white leading-snug">{q.question}</p>

        {/* Options */}
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            let btnClass =
              'w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors '
            if (selected === null) {
              btnClass += 'border-gray-700 bg-gray-800 text-gray-200 hover:border-blue-500 hover:bg-gray-700'
            } else if (idx === q.answer) {
              btnClass += 'border-green-500 bg-green-900/40 text-green-300'
            } else if (idx === selected) {
              btnClass += 'border-red-500 bg-red-900/40 text-red-300'
            } else {
              btnClass += 'border-gray-700 bg-gray-800 text-gray-500 opacity-60'
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={btnClass}
              >
                <span className="font-semibold mr-2 text-gray-500">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {selected !== null && (
          <div className="flex items-start gap-2 pt-1">
            {isCorrect ? (
              <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
            ) : (
              <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
            )}
            <div>
              <p className={`text-sm font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Správne!' : 'Nesprávne.'}
              </p>
              {q.explanation && (
                <p className="text-sm italic text-gray-400 mt-0.5">{q.explanation}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Next button */}
      {selected !== null && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            {currentQ + 1 < total ? 'Ďalej' : 'Zobraziť výsledok'}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
