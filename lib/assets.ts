const ASSET_BASE_URL = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "")

/**
 * Resolves a path to its asset URL. Points at the R2 bucket
 * (NEXT_PUBLIC_ASSET_BASE_URL) when set, so swapping a file in R2 doesn't
 * require a code change or git push. Falls back to /public when unset.
 */
export function assetUrl(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`
  return ASSET_BASE_URL ? `${ASSET_BASE_URL}${clean}` : clean
}
