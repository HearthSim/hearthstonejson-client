import "node-fetch";
import { Build, BuildNumber, Locale } from "./types";
import { CardData } from "hearthstonejson-client";

export default class HearthstoneJSON {
	public endpoint = "https://api.hearthstonejson.com/v1/";
	public defaultLocale = "enUS";

	public fallback: boolean | null = null;

	public createUrl = (build: Build, locale: Locale): string => {
		return this.endpoint + build + "/" + locale + "/cards.json";
	};

	public extractBuild = (url: string): Build => {
		const endpointExpression = new RegExp(
			this.endpoint.replace(/[\/.]/g, "\\$&")
		);
		const pathExpression = /((\d+)|(latest))\/[a-zA-Z]+\/cards\.json/;
		const pattern = new RegExp(
			"^" + endpointExpression.source + pathExpression.source + "$"
		);
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
		const _locale = locale ? locale : this.defaultLocale;
		this.fallback = false;
		return this.fetchSpecificBuild(build, _locale).catch(() => {
			this.fallback = true;
			return this.fetchLatestBuild(_locale);
		});
	}

	public getLatest(locale?: Locale): Promise<CardData[]> {
		if (!locale) {
			locale = this.defaultLocale;
		}
		this.fallback = false;
		return this.fetchLatestBuild(locale);
	}

	protected fetchSpecificBuild(
		build: BuildNumber,
		locale: Locale
	): Promise<CardData[]> {
		const headers = new Headers();
		headers.set("accept", "application/json; charset=utf-8");
		return fetch(this.createUrl(build, locale), {
			method: "GET",
			mode: "cors",
			headers,
		}).then((response: Response): Promise<CardData[]> => {
			const statusCode = response.status;
			if (statusCode !== 200) {
				throw new Error("Expected status code 200, got " + statusCode);
			}
			return response.json();
		});
	}

	protected fetchLatestBuild(locale: Locale): Promise<CardData[]> {
		return this.fetchLatestBuildNumber(locale).then((build: BuildNumber) =>
			this.fetchSpecificBuild(build, locale)
		);
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
}
