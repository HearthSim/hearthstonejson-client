declare module "hearthstonejson-client" {
	export type BuildNumber = number;
	export type Build = BuildNumber | "latest";
	export type Locale =
		| "enUS"
		| "enGB"
		| "frFR"
		| "deDE"
		| "koKR"
		| "esES"
		| "esMX"
		| "ruRU"
		| "zhTW"
		| "zhCN"
		| "itIT"
		| "ptBR"
		| "plPL"
		| "ptPT"
		| "jaJP"
		| "thTH";

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
		// ### STANDARD ###
		Basic = "CORE",
		Classic = "EXPERT1",

		TheWitchwood = "GILNEAS",
		TheBoomsdayProject = "BOOMSDAY",
		RastakhansRumble = "TROLL",
		RiseOfShadows = "DALARAN",
		SaviorsOfUldum = "ULDUM",
		DescentOfDragons = "DRAGONS",

		// ### WILD ###
		HallOfFame = "HOF",

		CurseOfNaxxramas = "NAXX",
		GoblinsVSGnomes = "GVG",
		BlackrockMountain = "BRM",
		TheGrandTournament = "TGT",
		TheLeagueOfExplorers = "LOE",
		WhispersOfTheOldGods = "OG",
		OneNightInKarazhan = "KARA",
		MeanStreetsOfGadgetzan = "GANGS",
		JourneyToUnGoro = "UNGORO",
		KnightsOfTheFrozenThrone = "ICECROWN",
		KoboldsAndCatacombs = "LOOTAPALOOZA",

		// ### OTHER ###
		/** https://hearthstone.gamepedia.com/Tavern_Brawl */
		TavernBrawl = "TB",
		/** https://hearthstone.gamepedia.com/Mission */
		Missions = "MISSIONS",
		/** https://hearthstone.gamepedia.com/Battlegrounds */
		Battlegrounds = "BATTLEGROUNDS",
		/** https://hearthstone.gamepedia.com/Credits_card */
		Credits = "CREDITS",
		/** https://hearthstone.gamepedia.com/Alternate_hero */
		HeroSkins = "HERO_SKINS",
		/** https://hearthstone.gamepedia.com/Wild_Event */
		WildEvent = "WILD_EVENT",
		/** https://hearthstone.gamepedia.com/The_Taverns_of_Time*/
		TavernsOfTime = "TAVERNS_OF_TIME"
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
		Alliance = "ALLIANCE"
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
		Legendary = "LEGENDARY"
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
