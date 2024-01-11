import { type Nationality } from '../../lib/types/nationality'

export function FlagIcon ({
  code,
  className
}: {
  code: Nationality
  className: string
}) {
  return (
    <img alt={code} src={`/icons/flags/${code}.svg`} className={className} />
  )
}
