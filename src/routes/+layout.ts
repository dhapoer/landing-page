// Every page is static HTML at build time: fastest to serve, and Cloudflare's
// _headers rules (see static/_headers) apply to it.
export const prerender = true;
