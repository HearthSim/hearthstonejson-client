declare module "hearthstonejson-client" {
	export type BuildNumber = number;
	export type Build = BuildNumber | "latest";
	export type Locale = string;

	export default class HearthstoneJSON {
		public readonly fallback: boolean;

		get(build: Build, locale?: Locale): Promise<CardData[]>;

		getLatest(locale?: Locale): Promise<CardData[]>;
	}

	export class MercenariesJSON {
		public readonly fallback: boolean;

		get(build: Build, locale?: Locale): Promise<MercenaryData[]>;

		getLatest(locale?: Locale): Promise<MercenaryData[]>;
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
		techLevel?: number;
		battlegroundsHero?: boolean;
		battlegroundsSkinParentId?: number;
		battlegroundsPremiumDbfId?: number;
		battlegroundsNormalDbfId?: number;
		battlegroundsDarkmoonPrizeTurn?: number;
		mercenariesAbilityCooldown?: number;
		mercenariesRole?: number;
		hasDiamondSkin?: boolean;
		hideStats?: boolean;
		hideCost?: boolean;
		isMiniSet?: boolean;

		classes?: string[]; // enum
		mechanics?: string[]; // enum
		referencedTags?: string[]; // enum
		artist?: string;
	}

	export interface EquipmentTier {
		crafting_cost?: number;
		dbf_id?: number;
		tier?: number;
	}

	export interface EquipmentData {
		id?: number;
		tiers?: EquipmentTier[];
	}

	export interface AbilityTier {
		crafting_cost?: number;
		dbf_id?: number;
		tier?: number;
	}

	export interface AbilityData {
		id?: number;
		name?: string | { [key: string]: string };
		tiers?: AbilityTier[];
	}

	export interface SpecializationData {
		id?: number;
		name?: string | { [key: string]: string };
		abilities?: AbilityData[];
	}

	export interface MercenaryData {
		id?: number;
		collectible?: boolean;
		craftingCost?: number;
		defaultSkinDbfId?: number;
		equipment?: EquipmentData[];
		name?: string;
		shortName?: string;
		skinDbfIds?: string[];
		specializations?: SpecializationData[];
	}
}
