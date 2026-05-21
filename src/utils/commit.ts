export async function getCommit(): Promise<string> {
  if (import.meta.env.CF_PAGES_COMMIT_SHA) {
    return import.meta.env.CF_PAGES_COMMIT_SHA.slice(0, 7);
  }
  if (typeof process !== 'undefined' && process.env?.CF_PAGES_COMMIT_SHA) {
    return process.env.CF_PAGES_COMMIT_SHA.slice(0, 7);
  }
  try {
    const fs = await import('fs');
    const sha = fs.readFileSync('src/commit.txt', 'utf-8').trim();
    if (sha) return sha;
  } catch {}
  try {
    const res = await fetch('https://api.github.com/repos/ynanutshell/ysabella.me/commits/main');
    const data = await res.json();
    return (data as any).sha?.slice(0, 7) || 'unknown';
  } catch {
    return 'unknown';
  }
}