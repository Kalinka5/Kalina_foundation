import { IconType } from "react-icons"
import {
	LuCpu,
	LuHandshake,
	LuHeartPulse,
	LuPackage,
	LuShield,
	LuTruck,
} from "react-icons/lu"

/** Brigades the foundation supports. Keys map to `stories-brigade-<key>-*` translations. */
export const BRIGADES = [
	{ key: "3oshbr", image: "/img/3oshbr.png" },
	{ key: "47ombr", image: "/img/47ombr.png" },
	{ key: "92oshbr", image: "/img/92oshbr.png" },
	{ key: "azov", image: "/img/azov.png" },
	{ key: "110ombr", image: "/img/110ombr.png" },
	{ key: "59ombr", image: "/img/59ombr.png" },
] as const

/** Initiative categories. Keys map to `initiatives-<key>-*` translations. */
export const INITIATIVE_CATEGORIES: { key: string; icon: IconType }[] = [
	{ key: "equipment", icon: LuShield },
	{ key: "medical", icon: LuHeartPulse },
	{ key: "transport", icon: LuTruck },
	{ key: "technology", icon: LuCpu },
	{ key: "food", icon: LuPackage },
	{ key: "special", icon: LuHandshake },
]

/** Suggested donation amounts in USD. Each has a `home-donate-impact-<amount>` translation. */
export const DONATION_PRESETS = [10, 25, 50, 100] as const
export const DEFAULT_PRESET = 50

export const formatUsd = (value: number) =>
	`$${Math.round(value).toLocaleString("en-US")}`
