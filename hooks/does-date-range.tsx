interface DisabledRange {
  from: Date
  to: Date
}

export function doesRangeCrossDisabled(
  start: Date,
  end: Date,
  disabled: DisabledRange[]
): boolean {
  const fromTime = start.getTime()
  const toTime = end.getTime()

  for (const d of disabled) {
    const disabledFrom = d.from.getTime()
    const disabledTo = d.to.getTime()

    // Jika ada tumpang tindih di tengah, return true
    if (fromTime <= disabledTo && toTime >= disabledFrom) {
      return true
    }
  }

  return false
}
