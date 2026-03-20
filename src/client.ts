/**
 * UnicodeFYI API client — TypeScript wrapper for unicodefyi.com REST API.
 *
 * Zero dependencies. Uses native `fetch`.
 *
 * @example
 * ```ts
 * import { UnicodeFYI } from "unicodefyi";
 * const api = new UnicodeFYI();
 * const items = await api.search("query");
 * ```
 */

/** Generic API response type. */
export interface ApiResponse {
  [key: string]: unknown;
}

export class UnicodeFYI {
  private baseUrl: string;

  constructor(baseUrl = "https://unicodefyi.com") {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private async get<T = ApiResponse>(
    path: string,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
  }

  // -- Endpoints ----------------------------------------------------------

  /** List all characters. */
  async listCharacters(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/characters/", params);
  }

  /** Get character by slug. */
  async getCharacter(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/characters/${slug}/`);
  }

  /** List all collections. */
  async listCollections(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/collections/", params);
  }

  /** Get collection by slug. */
  async getCollection(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/collections/${slug}/`);
  }

  /** List all faqs. */
  async listFaqs(params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/faqs/", params);
  }

  /** Get faq by slug. */
  async getFaq(slug: string): Promise<ApiResponse> {
    return this.get(`/api/v1/faqs/${slug}/`);
  }

  /** Search across all content. */
  async search(query: string, params?: Record<string, string>): Promise<ApiResponse> {
    return this.get("/api/v1/search/", { q: query, ...params });
  }
}
