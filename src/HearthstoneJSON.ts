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

	private fetchBuild(build: Build, locale: Locale): Promise<CardData[]> {
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

	protected fetchSpecificBuild(
		build: BuildNumber,
		locale: Locale
	): Promise<CardData[]> {
		return this.fetchBuild(build, locale);
	}

	protected fetchLatestBuild(locale: Locale): Promise<CardData[]> {
		return this.fetchBuild("latest", locale);
	}
}
