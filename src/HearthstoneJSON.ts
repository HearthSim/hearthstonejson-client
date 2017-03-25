import "isomorphic-fetch";
import {StorageBackend} from "./StorageBackend";
import NoOpStorageBackend from "./NoOpStorageBackend";
import LocalStorageBackend from "./LocalStorageBackend";
import CacheProxy from "./CacheProxy";
import {Build, BuildNumber, Locale} from "./types";
import {CardData} from "hearthstonejson";

export default class HearthstoneJSON {

	public storage: StorageBackend;
	public storagePrefix = "hsjson-";

	public endpoint = "https://api.hearthstonejson.com/v1/";
	public defaultLocale = "enUS";

	public cached: boolean | null = null;
	public fetched: boolean | null = null;
	public fallback: boolean | null = null;

	constructor(storage?: StorageBackend) {
		if (storage === null) {
			this.storage = new NoOpStorageBackend();
		}
		else if (typeof storage === "undefined") {
			this.storage = new CacheProxy(new LocalStorageBackend());
		}
		else if (storage) {
			this.storage = storage;
		}
	}

	public createUrl = (build: Build, locale: Locale): string => {
		return this.endpoint + build + "/" + locale + "/cards.json";
	};

	public extractBuild = (url: string): Build => {
		const endpointExpression = new RegExp(this.endpoint.replace(/[\/.]/g, "\\$&"));
		const pathExpression = /((\d+)|(latest))\/[a-zA-Z]+\/cards\.json/;
		const pattern = new RegExp("^" + endpointExpression.source + pathExpression.source + "$");
		const matches = pattern.exec(url);
		if (!matches) {
			throw new Error('No build found in url "' + url + '"');
		}
		return matches[1] as Build;
	};

	public get(build: Build, locale?: Locale): Promise<CardData[]> {
		if (build === "latest") {
			return this.getLatest(locale);
		}
		if (!locale) {
			locale = this.defaultLocale;
		}
		return this.getSpecificBuild(build, locale).catch(() => {
			// fall back to latest build
			this.fallback = true;
			return this.getLatest(locale);
		});
	}

	public getLatest(locale?: Locale): Promise<CardData[]> {
		if (!locale) {
			locale = this.defaultLocale;
		}
		return this.fetchLatestBuildNumber(locale).then((build: BuildNumber) => this.getSpecificBuild(build, locale));
	}

	protected getSpecificBuild(build: BuildNumber, locale: Locale): Promise<CardData[]> {
		const key = this.generateKey(build, locale);
		if (this.storage.has(key)) {
			return this.storage.get(key);
		}
		return this.fetchSpecificBuild(build, locale);
	}

	protected fetchSpecificBuild(build: BuildNumber, locale: Locale): Promise<CardData[]> {
		const headers = new Headers();
		headers.set("content-type", "application/json");
		return fetch(this.createUrl(build, locale), {
			method: "GET",
			headers: new Headers()
		}).then((response: Response): Promise<CardData[]> => {
			const statusCode = response.status;
			if (statusCode !== 200) {
				throw new Error("Expected status code 200, got " + statusCode);
			}
			return response.json();
		}).then((payload: CardData[]) => {
			const key = this.generateKey(build, locale);
			this.storage.set(key, payload);
			return payload;
		});
	}

	protected fetchLatestBuildNumber(locale: Locale): Promise<BuildNumber> {
		return fetch(this.createUrl("latest", locale), {
			method: "HEAD",
			redirect: "manual",
		}).then((response: Response): BuildNumber => {
			// we expect to be redirected
			const statusCode = response.status;
			if (statusCode !== 302) {
				throw new Error("Expected status code 302, got " + statusCode);
			}
			// get location header
			const headers = response.headers;
			const location = headers.get("location");
			if (!location) {
				throw new Error("Expected location header in response");
			}
			// extract build number
			const build = this.extractBuild(location);
			if (isNaN(+build)) {
				throw new Error("Expected numeric build number");
			}
			const buildNumber = +build;
			return buildNumber;
		});
	}

	protected generateKey(build: Build, locale: Locale): string {
		if (build === "latest") {
			throw new Error('Refusing to generate key for "latest" metadata');
		}
		return this.storagePrefix + build + "_" + locale;
	}
}
