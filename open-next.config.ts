/**
 * OpenNext configuration for Cloudflare Workers.
 *
 * `defineCloudflareConfig()` with no arguments is the recommended starting
 * point — it sets sensible defaults for caching (KV-backed) and dynamic
 * route handling. We can layer on R2/D1/Durable Object overrides later
 * if/when we add real storage features.
 */
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
