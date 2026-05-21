export const errorMessages: Record<string, string> = {
  '404': "oh no that doesn’t seem to exist",
  '500': "oops something broke on my end",
  '401': "hmm i don't think you have access to that",
  '403': "yikes you're not supposed to see that",
};

export function getErrorFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('error');
  }

export function getErrorRedirectUrl(errorCode: string | number): string {
  return `/?error=${errorCode}`;
}

export function showError(errorCode: string | number): string {
  const code = String(errorCode);
  return errorMessages[code] || "I don't think that's supposed to work that way...";
}