export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export async function getCacheUsageByPath(pathPrefix: string) {
  const cacheNames = await caches.keys();
  let totalBytes = 0;
  const results: Record<string, number> = {};

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    for (const request of requests) {
      if (request.url.includes(pathPrefix)) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.clone().blob();
          const size = blob.size;
          totalBytes += size;
          results[request.url] = size;
        }
      }
    }
  }

  return {
    totalBytes,
    totalKB: (totalBytes / (1024)).toFixed(2),
    details: results
  };
}