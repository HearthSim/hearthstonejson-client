import {StorageBackend} from "./StorageBackend";

export default class CacheProxy implements StorageBackend {

	private cache: any;
	public backend: StorageBackend;

	constructor(backend: StorageBackend) {
		this.cache = {};
		this.backend = backend;
	}

	public has(key: string): boolean {
		if (typeof this.cache[key] !== "undefined") {
			return true;
		}
		return this.backend.has(key);
	}

	public set(key: string, value: any): void {
		this.cache[key] = value;
		this.backend.set(key, value);
	}

	public get(key: string): any {
		if (typeof this.cache[key] !== "undefined") {
			return this.cache[key];
		}
		return this.backend.get(key);
	}
}
