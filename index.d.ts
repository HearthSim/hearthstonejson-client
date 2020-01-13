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

	export enum CardClass {
		DeathKnight = "DEATHKNIGHT",
		Druid = "DRUID",
		Hunter = "HUNTER",
		Mage = "MAGE",
		Paladin = "PALADIN",
		Priest = "PRIEST",
		Rogue = "ROGUE",
		Shaman = "SHAMAN",
		Warlock = "WARLOCK",
		Warrior = "WARRIOR",
		Dream = "DREAM ",
		Neutral = "NEUTRAL"
	}

	export enum CardSet {
		// INVALID = 0,
		// TEST_TEMPORARY = 1,
		// DEBUG_SP = "DEBUG_SP",
		// BLANK = "BLANK",
		// CHEAT = "CHEAT",
		// DEMO = "DEMO",
		// NONE = "NONE",
		// PROMO = "PROMO",
		// SLUSH = "SLUSH",
		// OG_RESERVE = "OG_RESERVE",
		// KARA_RESERVE = "KARA_RESERVE",
		// GANGS_RESERVE = "GANGS_RESERVE",
		// TAVERNS_OF_TIME = "TAVERNS_OF_TIME",
		Core = "CORE",
		Expert1 = "EXPERT1",
		HOF = "HOF",
		MISSIONS = "MISSIONS",
		NAXX = "NAXX",
		GVG = "GVG",
		BRM = "BRM",
		TGT = "TGT",
		CREDITS = "CREDITS",
		HERO_SKINS = "HERO_SKINS",
		TB = "TB",
		LOE = "LOE",
		OG = "OG",
		KARA = "KARA",
		GANGS = "GANGS",
		UNGORO = "UNGORO",
		ICECROWN = "ICECROWN",
		LOOTAPALOOZA = "LOOTAPALOOZA",
		GILNEAS = "GILNEAS",
		BOOMSDAY = "BOOMSDAY",
		TROLL = "TROLL",
		DALARAN = "DALARAN",
		ULDUM = "ULDUM",
		DRAGONS = "DRAGONS",
		WILD_EVENT = "WILD_EVENT",
		BATTLEGROUNDS = "BATTLEGROUNDS"
	}

	export enum CardType {
		Minion = "MINION",
		Weapon = "WEAPON",
		Hero = "HERO",
		Enchantment = "ENCHANTMENT",
		Spell = "SPELL",
		HeroPower = "HERO_POWER",
		Player = "PLAYER"
	}

	export enum Faction {
		Horde = "HORDE",
		Alliance = "ALLIANCE",
	}

	export enum MultiClassGroup {
		GrimyGoons = "GRIMY_GOONS",
		JadeLotus = "JADE_LOTUS",
		Kabal = "KABAL"
	}

	export enum Mechanics {
		AdjacentBuff = "ADJACENT_BUFF",
		AiMustPlay = "AI_MUST_PLAY",
		AppearFunctionallyDead = "APPEAR_FUNCTIONALLY_DEAD",
		Adapt = "ADAPT",
		Aura = "AURA",
		Battlecry = "BATTLECRY",
		CantAttack = "CANT_ATTACK",
		CantBeTargetedByAbilities = "CANT_BE_TARGETED_BY_ABILITIES",
		CantBeTargetedByHeroPowers = "CANT_BE_TARGETED_BY_HERO_POWERS",
		Charge = "CHARGE",
		ChooseOne = "CHOOSE_ONE",
		Combo = "COMBO",
		Counter = "COUNTER",
		Deathrattle = "DEATHRATTLE",
		Discover = "DISCOVER",
		DivineShield = "DIVINE_SHIELD",
		Enraged = "ENRAGED",
		EvilGlow = "EVIL_GLOW",
		Forgetful = "FORGETFUL",
		Freeze = "FREEZE",
		Immune = "IMMUNE",
		Inspire = "INSPIRE",
		JadeGolem = "JADE_GOLEM",
		Morph = "MORPH",
		Poisonous = "POISONOUS",
		Quest = "QUEST",
		ReceivesDoubleSpelldamageBonus = "RECEIVES_DOUBLE_SPELLDAMAGE_BONUS",
		Ritual = "RITUAL",
		Secret = "SECRET",
		Silence = "SILENCE",
		Stealth = "STEALTH",
		TagOneTurnEffect = "TAG_ONE_TURN_EFFECT",
		Taunt = "TAUNT",
		Topdeck = "TOPDECK",
		Untouchable = "UNTOUCHABLE",
		Windfury = "WINDFURY",
		ImmuneToSpellpower = "ImmuneToSpellpower",
		InvisibleDeathrattle = "InvisibleDeathrattle"
	}

	export enum Race {
		// Blank = "BLANK",
		All = "ALL",
		Beast = "BEAST",
		Demon = "DEMON",
		Dragon = "DRAGON",
		Mechanical = "MECHANICAL",
		Murloc = "MURLOC",
		Pirate = "PIRATE",
		Totem = "TOTEM",
		Elemental = "ELEMENTAL"
	}

	export enum Rarity {
		Common = "COMMON",
		Free = "FREE",
		Rare = "RARE",
		Epic = "EPIC",
		Legendary = "LEGENDARY",
	}

	export interface CardData {
		id?: string;
		dbfId?: number;

		rarity?: Rarity;
		faction?: Faction;
		set?: CardSet;
		cardClass?: CardClass;
		type?: CardType;
		race?: Race;
		multiClassGroup?: MultiClassGroup;

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
		hideStats?: boolean;

		/** Dual-class characters  */
		classes?: [CardClass, CardClass];
		mechanics?: Mechanics[];
		referencedTags?: (Mechanics | string)[];
		artist?: string;
	}
}
