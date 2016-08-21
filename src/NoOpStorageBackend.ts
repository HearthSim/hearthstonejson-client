import {StorageBackend} from "./StorageBackend";

export default class NoOpStorageBackend implements StorageBackend {

	public has(key: string): boolean {
		return false;
	}

	public set(key: string, value: any): void {
		return;
	}

	public get(key: string): any {
		return null;
	}

}
