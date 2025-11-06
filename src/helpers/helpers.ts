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

    const filteredRequests = requests.filter(req => req.url.includes(pathPrefix));

    const sizes = await Promise.all(
      filteredRequests.map(async (request) => {
        const response = await cache.match(request);
        if (!response) return { url: request.url, size: 0 };

        try {
          const blob = await response.clone().blob();
          return { url: request.url, size: blob.size };
        } catch {
          return { url: request.url, size: 0 };
        }
      })
    );

    for (const { url, size } of sizes) {
      if (size > 0) {
        results[url] = size;
        totalBytes += size;
      }
    }
  }

  return {
    totalBytes,
    totalKB: Math.round(totalBytes / 1024),
    details: results,
  };
}
