declare module "hearthstonejson" {
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
		public sourceUrl: (build: number|"latest", locale: string) => string;
		public redirected: number;

		constructor(sourceUrl?: (build: number|"latest", locale: string) => string, backend?: StorageBackend);

		public get(build: number|"latest", cb: (data: any[], build?: number|"latest", locale?: string) => void): void;
		public get(build: number|"latest", locale: string, cb: (data: any[], build?: number|"latest", locale?: string) => void): void;

		public getLatest(cb: (data: any[]) => void): void;
		public getLatest(locale: string, cb: (data: any[]) => void): void;
	}
}
