/**
 * Storage Service Layer
 * 
 * Provides a generic, versioned, validated, and safe wrapper around localStorage.
 * This makes it trivial to swap out localStorage for a real backend API in the future.
 */

export interface StorageConfig<T> {
  key: string;
  version: number;
  maxItems?: number; // Useful for arrays (e.g. max 50 recently viewed)
  validate?: (data: any) => data is T;
  fallback: T;
}

interface StoragePayload<T> {
  version: number;
  data: T;
  timestamp: number;
}

export class StorageService<T> {
  private config: StorageConfig<T>;

  constructor(config: StorageConfig<T>) {
    this.config = config;
  }

  private get versionedKey() {
    return `${this.config.key}_v${this.config.version}`;
  }

  public get(): T {
    try {
      const raw = localStorage.getItem(this.versionedKey);
      if (!raw) return this.config.fallback;

      const parsed = JSON.parse(raw) as StoragePayload<T>;

      // Version mismatch handling
      if (parsed.version !== this.config.version) {
        console.warn(`[StorageService] Version mismatch for ${this.config.key}. Expected ${this.config.version}, got ${parsed.version}. Resetting to fallback.`);
        this.clear();
        return this.config.fallback;
      }

      // Optional strict validation
      if (this.config.validate && !this.config.validate(parsed.data)) {
        console.error(`[StorageService] Validation failed for ${this.config.key}. Data might be corrupted.`);
        return this.config.fallback; // Do not clear automatically, just return fallback
      }

      return parsed.data;
    } catch (error) {
      console.error(`[StorageService] Failed to read ${this.config.key}:`, error);
      return this.config.fallback;
    }
  }

  public set(data: T): void {
    try {
      let finalData = data;

      // Enforce array size limits if applicable
      if (this.config.maxItems && Array.isArray(data)) {
        finalData = data.slice(0, this.config.maxItems) as unknown as T;
      }

      const payload: StoragePayload<T> = {
        version: this.config.version,
        data: finalData,
        timestamp: Date.now()
      };

      localStorage.setItem(this.versionedKey, JSON.stringify(payload));
    } catch (error) {
      // Graceful degradation for QuotaExceededError or disabled storage
      console.warn(`[StorageService] Failed to save ${this.config.key}. Storage might be full or disabled.`, error);
    }
  }

  public clear(): void {
    try {
      localStorage.removeItem(this.versionedKey);
    } catch (error) {
      console.warn(`[StorageService] Failed to clear ${this.config.key}.`, error);
    }
  }
}
