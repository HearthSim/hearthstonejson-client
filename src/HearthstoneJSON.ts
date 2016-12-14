import * as https from "https";
import * as URL from "url";
import {IncomingMessage} from "http";
import {StorageBackend} from "./StorageBackend";
import LocalStorageBackend from "./LocalStorageBackend";
import CacheProxy from "./CacheProxy";
import {Build, Locale} from "./types";

export default class HearthstoneJSON {

	public defaultLocale: string = "enUS";
	public backend: StorageBackend;
	public cached: boolean = null;
	public fetched: boolean = null;
	public fallback: boolean = null;
	public prefix: string = "hsjson-";
	public sourceUrl: (build: Build, locale: Locale) => string;
	public redirected: number = 0;

	constructor(sourceUrl?: (build: Build, locale: Locale) => string, backend?: StorageBackend) {
		this.sourceUrl = sourceUrl ? sourceUrl : (build: Build, locale: Locale) => "https://api.hearthstonejson.com/v1/" + build + "/" + locale + "/cards.json";
		this.backend = backend ? backend : new CacheProxy(new LocalStorageBackend());
	}

	public get(build: Build, locale: Locale, cb: (data: any[], build?: Build, locale?: string) => void): void {
		if (typeof locale === "function" && typeof cb === "undefined") {
			cb = locale as (data: any[]) => void;
			locale = this.defaultLocale;
		}
		if (!build || isNaN(+build)) {
			build = "latest";
		}
		this.cached = false;
		if (build !== "latest") {
			this.fetched = false;
			this.fallback = false;
			let key = this.generateKey(build, locale);
			if (this.backend.has(key)) {
				this.cached = true;
				cb(this.backend.get(key));
				return;
			}
		}
		this.redirected = 0;
		this.fetch(build, locale, (data: any[], receivedBuild?: Build, receivedLocale?: string) => {
			if (!receivedBuild) {
				receivedBuild = build;
			}
			if (!receivedLocale) {
				receivedLocale = locale;
			}
			this.fetched = true;
			if (!this.fallback) {
				this.fallback = false;
			}
			cb(data, receivedBuild, receivedLocale);
			if (receivedBuild !== "latest") {
				this.backend.set(this.generateKey(receivedBuild, receivedLocale), data);
			}
		}, () => {
			if (build === "latest") {
				if (locale === this.defaultLocale) {
					// completely failed
					return;
				}
				else {
					locale = this.defaultLocale;
				}
			}
			// fallback to latest
			this.fallback = true;
			this.get("latest", locale, cb);
		});
	}

	public getLatest(locale: Locale, cb: (data: any[]) => void): void {
		this.get("latest", locale, cb);
	}

	protected generateKey(build: Build, locale: Locale): string {
		if (build === "latest") {
			throw new Error('Refusing to generate key for "latest" metadata');
		}
		return this.prefix + build + "_" + locale;
	}

	protected fetch(build: Build, locale: Locale, cb?: (data: any[], build: Build, locale: Locale) => void, errorCb?: () => void, url?: string): void {
		if (typeof url === "undefined") {
			url = this.sourceUrl(build, locale);
		}
		let options = URL.parse(url) as any;
		options.withCredentials = false;
		options.method = "GET";
		let request = https.request(options);
		request.once("response", (message: IncomingMessage) => {
			if (message.statusCode != 200) {
				if (message.statusCode >= 301 && message.statusCode <= 302 && this.redirected < 5) {
					// redirects
					const target = message.headers.location;
					this.redirected++;
					this.fetch(build, locale, cb, errorCb, target);
					return;
				}
				if (message.statusCode >= 400 && message.statusCode <= 499) {
					// bad requests
					if (build !== "latest") {
						// build fallback
						this.fetch("latest", locale, cb, errorCb);
						return;
					}
					if (locale !== this.defaultLocale) {
						// locale fallback
						this.fetch(build, this.defaultLocale, cb, errorCb);
						return;
					}
					return;
				}
				return;
			}
			let data = "";
			message.on("data", (chunk) => {
				data += chunk;
			});
			message.on("error", () => {
				errorCb();
			});
			message.on("end", () => {
				try {
					let cards = JSON.parse(data);
					cb(cards, build, locale);
				}
				catch (e) {
					errorCb();
				}
			});
		});
		request.on("error", (e) => {
			errorCb();
		});
		request.end();
	}

	protected has(build: Build, locale: Locale): boolean {
		if (build === "latest") {
			return false;
		}
		return this.backend.has(this.generateKey(build, locale));
	}
}
