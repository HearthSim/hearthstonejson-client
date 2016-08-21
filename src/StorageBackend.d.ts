export interface StorageBackend {
	has(key: string): boolean;
	set(key: string, value: any): void;
	get(key: string): any;
}
