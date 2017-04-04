import "isomorphic-fetch";
import {StorageBackend} from "./StorageBackend";
import NoOpStorageBackend from "./NoOpStorageBackend";
import LocalStorageBackend from "./LocalStorageBackend";
import CacheProxy from "./CacheProxy";
import {REVISIONS} from "./constants";
import {Build, BuildNumber, Locale} from "./types";
import {CardData} from "hearthstonejson";

export default class HearthstoneJSON {

	public storage: StorageBackend;
	public storagePrefix = "hsjson-";

	public endpoint = "https://api.hearthstonejson.com/v1/";
	public defaultLocale = "enUS";

	public cached: boolean | null = null;
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
		this.fallback = false;
		return this.getSpecificBuild(build, locale).catch(() => {
			this.fallback = true;
			return this.fetchLatestBuild(locale)
		});
	}

	public getLatest(locale?: Locale): Promise<CardData[]> {
		if (!locale) {
			locale = this.defaultLocale;
		}
		this.fallback = false;
		return this.fetchLatestBuild(locale);
	}

	protected getSpecificBuild(build: BuildNumber, locale: Locale): Promise<CardData[]> {
		const key = this.generateKey(build, locale);
		let bypassCache = false;
		if (this.storage.has(key)) {
			const stored = this.storage.get(key);
			// verify format
			if (
				typeof stored === "object" &&
				typeof stored["revision"] === "number" &&
				Array.isArray(typeof stored["cards"])
			) {
				if (stored["revision"] === this.getRevision(build)) {
					this.cached = true;
					return Promise.resolve(stored["cards"]);
				}
			}
			// local version is not valid or outdated, do a full reload
			bypassCache = true;
		}
		this.cached = false;
		return this.fetchSpecificBuild(build, locale, bypassCache)
			.catch((error) => {
				// possibly invalid CORS header in cache
				return this.fetchSpecificBuild(build, locale, true);
			});
	}

	protected fetchSpecificBuild(build: BuildNumber, locale: Locale, bypassCache?: boolean): Promise<CardData[]> {
		const headers = new Headers();
		headers.set("accept", "application/json; charset=utf-8");
		return fetch(this.createUrl(build, locale), {
			method: "GET",
			mode: "cors",
			cache: bypassCache ? "reload" : "default",
			headers,
		}).then((response: Response): Promise<CardData[]> => {
			const statusCode = response.status;
			if (statusCode !== 200) {
				throw new Error("Expected status code 200, got " + statusCode);
			}
			return response.json();
		}).then((payload: CardData[]) => {
			this.store(build, locale, payload);
			return payload;
		});
	}

	protected fetchLatestBuild(locale: Locale): Promise<CardData[]> {
		return this.fetchLatestBuildNumber(locale).then((build: BuildNumber) => this.getSpecificBuild(build, locale));
	}

	protected fetchLatestBuildNumber(locale: Locale): Promise<BuildNumber> {
		return fetch(this.createUrl("latest", locale), {
			method: "HEAD",
			mode: "cors",
			cache: "no-store",
			// we have to follow the redirect, since otherwise we get an opaqueredirect
		}).then((response: Response): BuildNumber => {
			// we expect to be redirected
			const statusCode = response.status;
			if (statusCode !== 200) {
				throw new Error("Expected status code 200, got " + statusCode);
			}
			// extract build number
			const build = this.extractBuild(response.url);
			if (isNaN(+build)) {
				throw new Error("Expected numeric build number");
			}
			const buildNumber = +build;
			return buildNumber;
		});
	}

	protected store(buildNumber: BuildNumber, locale: Locale, payload: CardData[]): void {
		if (!payload.length) {
			// this doesn't look right - refuse to cache this
			return;
		}
		const key = this.generateKey(buildNumber, locale);

		this.storage.set(key, {
			revision: this.getRevision(buildNumber),
			cards: payload,
		});
	}

	protected generateKey(build: Build, locale: Locale): string {
		if (build === "latest") {
			throw new Error('Refusing to generate key for "latest" metadata');
		}
		return this.storagePrefix + build + "_" + locale;
	}

	protected getRevision(build: BuildNumber): number {
		let revision = 0;
		if (typeof REVISIONS[build] === "number") {
			revision = REVISIONS[build];
		}
		return revision;
	}
}
