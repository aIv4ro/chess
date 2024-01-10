import toast from '../utils/toast'

export function CopyFenButton ({
  fen
}: {
  fen: string
}) {
  const handleCopyFen = () => {
    if (navigator.clipboard != null) {
      navigator.clipboard.writeText(fen)
        .then(() => {
          toast.success('Copied FEN to clipboard')
        })
        .catch(() => {
          toast.error('Could not copy FEN to clipboard')
        })
    }
  }

  return (
    <button
      className='px-3 py-2 rounded bg-slate-800 hover:bg-slate-600 transition-colors'
      onClick={handleCopyFen}
    >
      Copy FEN
    </button>
  )
}
