import toast from '../utils/toast'
import { Button } from './common/button'

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
    <Button
      onClick={handleCopyFen}
    >
      Copy FEN
    </Button>
  )
}
