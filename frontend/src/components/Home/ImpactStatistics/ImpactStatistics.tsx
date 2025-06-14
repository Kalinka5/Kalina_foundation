import { useIntersectionObserver } from "@uidotdev/usehooks"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
	FaBoxOpen,
	FaDollarSign,
	FaGlobe,
	FaHeart,
	FaShieldAlt,
	FaTrophy,
	FaUsers,
} from "react-icons/fa"
import "../../../styles/home/impactStatistics/impactStatistics.css"

interface StatisticProps {
	icon: React.ReactNode
	value: number
	suffix?: string
	prefix?: string
	title: string
	description: string
	color: string
	isVisible: boolean
}

function AnimatedCounter({
	value,
	suffix = "",
	prefix = "",
	isVisible,
}: {
	value: number
	suffix?: string
	prefix?: string
	isVisible: boolean
}) {
	const [displayValue, setDisplayValue] = useState(0)

	useEffect(() => {
		if (!isVisible) return

		const duration = 2000 // 2 seconds
		const steps = 60
		const increment = value / steps
		let current = 0

		const timer = setInterval(() => {
			current += increment
			if (current >= value) {
				setDisplayValue(value)
				clearInterval(timer)
			} else {
				setDisplayValue(Math.floor(current))
			}
		}, duration / steps)

		return () => clearInterval(timer)
	}, [value, isVisible])

	return (
		<span className="animated-counter">
			{prefix}
			{displayValue.toLocaleString()}
			{suffix}
		</span>
	)
}

function StatisticCard({
	icon,
	value,
	suffix,
	prefix,
	title,
	description,
	color,
	isVisible,
}: StatisticProps) {
	return (
		<div className={`statistic-card ${color}`}>
			<div className="stat-icon">{icon}</div>
			<div className="stat-value">
				<AnimatedCounter
					value={value}
					suffix={suffix}
					prefix={prefix}
					isVisible={isVisible}
				/>
			</div>
			<h3 className="stat-title">{title}</h3>
			<p className="stat-description">{description}</p>
		</div>
	)
}

function ImpactStatistics() {
	const { t } = useTranslation()
	const [ref, entry] = useIntersectionObserver({
		threshold: 0.3,
		rootMargin: "0px",
	})

	const isVisible = !!entry?.isIntersecting

	const statistics = [
		{
			id: 1,
			icon: <FaDollarSign />,
			value: 2500000,
			prefix: "$",
			title: "Total Raised",
			description: "Funds collected for critical military equipment",
			color: "stat-green",
		},
		{
			id: 2,
			icon: <FaUsers />,
			value: 12500,
			suffix: "+",
			title: "Active Donors",
			description: "Supporters worldwide contributing regularly",
			color: "stat-blue",
		},
		{
			id: 3,
			icon: <FaBoxOpen />,
			value: 850,
			title: "Items Funded",
			description: "Military equipment successfully purchased",
			color: "stat-orange",
		},
		{
			id: 4,
			icon: <FaShieldAlt />,
			value: 5200,
			suffix: "+",
			title: "Heroes Equipped",
			description: "Ukrainian soldiers equipped with vital gear",
			color: "stat-purple",
		},
		{
			id: 5,
			icon: <FaGlobe />,
			value: 48,
			title: "Countries",
			description: "Nations supporting Ukraine's defense efforts",
			color: "stat-teal",
		},
		{
			id: 6,
			icon: <FaTrophy />,
			value: 98,
			suffix: "%",
			title: "Success Rate",
			description: "Equipment delivered successfully to frontlines",
			color: "stat-gold",
		},
	]

	return (
		<section
			className="impact-statistics section-header-mg"
			id="impact-section"
			ref={ref}
		>
			<div className="container">
				<div className="impact-header">
					<div className="impact-badge">
						<FaHeart className="badge-heart" />
						<span>Our Impact</span>
					</div>
					<h2 className="impact-title">Making a Real Difference</h2>
					<p className="impact-subtitle">
						Every donation counts. Here's how your support is changing lives and
						strengthening Ukraine's defense capabilities.
					</p>
				</div>

				<div className="statistics-grid">
					{statistics.map(stat => (
						<StatisticCard
							key={stat.id}
							icon={stat.icon}
							value={stat.value}
							suffix={stat.suffix}
							prefix={stat.prefix}
							title={stat.title}
							description={stat.description}
							color={stat.color}
							isVisible={isVisible}
						/>
					))}
				</div>

				<div className="impact-footer">
					<div className="impact-message">
						<h3>{t("impact-message-title")}</h3>
						<p>{t("impact-message-desc")}</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ImpactStatistics
