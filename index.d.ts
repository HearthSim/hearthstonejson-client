declare module "hearthstonejson" {
	export type Build = number|"latest";
	export type Locale = string;

	export interface StorageBackend {
		has(key: string): boolean;
		set(key: string, value: any): void;
		get(key: string): any;
	}

	export class CacheProxy implements StorageBackend {
		public has(key: string): boolean;
		public set(key: string, value: any): void;
		public get(key: string): any;
	}

	export class LocalStorageBackend implements StorageBackend {
		public has(key: string): boolean;
		public set(key: string, value: any): void;
		public get(key: string): any;
	}

	export class NoOpStorageBackend implements StorageBackend {
		public has(key: string): boolean;
		public set(key: string, value: any): void;
		public get(key: string): any;
	}

	export default class HearthstoneJSON {
		public defaultLocale: string;
		public backend: StorageBackend;
		public cached: boolean;
		public fetched: boolean;
		public fallback: boolean;
		public prefix: string;
		public sourceUrl: (build: Build, locale: Locale) => string;
		public redirected: number;

		constructor(sourceUrl?: (build: Build, locale: Locale) => string, backend?: StorageBackend);

		public get(build: Build, cb: (data: any[], build?: Build, locale?: string) => void): void;
		public get(build: Build, locale: Locale, cb: (data: any[], build?: Build, locale?: string) => void): void;

		public getLatest(cb: (data: any[]) => void): void;
		public getLatest(locale: Locale, cb: (data: any[]) => void): void;
	}
}
