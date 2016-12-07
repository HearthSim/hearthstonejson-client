import {StorageBackend} from "./StorageBackend";

export default class LocalStorageBackend implements StorageBackend {

	private _available(): boolean {
		try {
			return "localStorage" in window && window["localStorage"] !== null;
		} catch (e) {
			return false;
		}
	}

	public has(key: string): boolean {
		if (!this._available()) {
			return false;
		}
		return typeof(localStorage[key]) === "string";
	}

	public set(key: string, value: any): void {
		if (!this._available()) {
			return;
		}
		let compressed = JSON.stringify(value);
		do {
			try {
				localStorage.setItem(key, compressed);
				break;
			}
			catch (e) {
				try {
					localStorage.removeItem(localStorage.key(0));
				}
				catch (e) {
					break;
				}
			}
		} while (localStorage.length);
	}

	public get(key: string): any {
		if (!this._available()) {
			return null;
		}
		return JSON.parse(localStorage[key]);
	}
}
