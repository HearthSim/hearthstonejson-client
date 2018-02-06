declare module "hearthstonejson-client" {
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
		dbfId?: number;

		// enums
		rarity?: string;
		faction?: string;
		set?: string;
		cardClass?: string;
		type?: string;
		race?: string;
		multiClassGroup?: string;

		// localized
		name?: string;
		text?: string;
		collectionText?: string;
		flavor?: string;
		howToEarn?: string;
		howToEarnGolden?: string;
		targetingArrowText?: string;

		// additional
		collectible?: boolean;
		elite?: boolean;
		cost?: number;
		attack?: number;
		health?: number;
		durability?: number;
		overload?: number;
		spellDamage?: number;
		armor?: number;
		hideStats?: boolean;

		classes?: string[]; // enum
		mechanics?: string[]; // enum
		referencedTags?: string[]; // enum
		artist?: string;
	}
}
