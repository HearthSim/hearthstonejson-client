declare module "hearthstonejson" {
	export type BuildNumber = number;
	export type Build = BuildNumber | "latest";
	export type Locale = string;

	export default class HearthstoneJSON {
		public readonly cached: boolean;
		public readonly fallback: boolean;

		get(build: Build, locale?: Locale): Promise<CardData[]>;

		getLatest(locale?: Locale): Promise<CardData[]>;
	}

	export interface CardData {
		id?: string;

		// enums
		rarity?: string;
		faction?: string;
		set?: string;
		playerClass?: string;
		type?: string;
		race?: string;

		// localized
		name?: string;
		text?: string;
		collectionText?: string;
		flavor?: string;
		howToEarn?: string;
		howToEarnGolden?: string;
		targetingArrowText?: string;
		textInPlay?: string;

		// additional
		collectible?: boolean;
		cost?: number;
		attack?: number;
		health?: number;
		durability?: number;
		dust?: number[];

		mechanics?: string[]; // enum
		artist?: string;
		texture?: string;
	}
}
