const parseIntWithUndefined = (
  wantsToBeNumber: string | undefined,
  fallback: number = -1
): number => {
  if (!wantsToBeNumber) {
    return fallback
  }

  return parseIntWithUndefined(wantsToBeNumber)
}

export { parseIntWithUndefined }
