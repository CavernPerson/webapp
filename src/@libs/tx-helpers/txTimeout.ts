export function txTimeout<T>(ms: number = 1000 * 60 * 5): Promise<T> {
  return new Promise<T>((_, reject) => {
    const timeoutId = setTimeout(() => {
      reject(
        new Error(
          "Wallet timeout: Failed to receive responses to post(Tx) for ${ms}milliseconds"
        )
      );
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    };
  });
}
