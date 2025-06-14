import React from "react"
import "../../styles/home/topHeroes.css"

function TopHeroes() {
	const topHeroes = [
		{
			id: 1,
			name: "Michael_UA",
			amount: "$25,450",
			rank: "#1",
			avatar: "M",
			hasPhoto: false,
		},
		{
			id: 2,
			name: "Sarah_Global",
			amount: "$18,200",
			rank: "#2",
			avatar: "SA",
			hasPhoto: false,
		},
		{
			id: 3,
			name: "Alex_Berlin",
			amount: "$15,800",
			rank: "#3",
			avatar: "A",
			hasPhoto: true,
		},
		{
			id: 4,
			name: "Emma_UK",
			amount: "$12,100",
			rank: "#4",
			avatar: "E",
			hasPhoto: true,
		},
		{
			id: 5,
			name: "David_CA",
			amount: "$10,900",
			rank: "#5",
			avatar: "D",
			hasPhoto: true,
		},
	]

	return (
		<section className="top-heroes-section" id="top-heroes">
			<div className="top-heroes-container">
				<div className="top-heroes-header">
					<h2 className="top-heroes-title">Our Top Heroes</h2>
					<p className="top-heroes-subtitle">
						Celebrating our most generous supporters
					</p>
				</div>

				<div className="heroes-grid">
					{topHeroes.map((hero, index) => (
						<div
							key={hero.id}
							className={`hero-card ${
								index < 3 ? "podium-position" : ""
							} position-${index + 1}`}
						>
							<div className="top-hero-content">
								<div className="hero-avatar-container">
									<div
										className={`hero-avatar ${
											hero.hasPhoto ? "has-photo" : "initials-avatar"
										}`}
									>
										{hero.hasPhoto ? (
											<div className="avatar-placeholder"></div>
										) : (
											<span className="avatar-initials">{hero.avatar}</span>
										)}
									</div>
									{index < 3 && <div className="medal-icon"></div>}
								</div>
								<div className="hero-info">
									<h3 className="hero-name">{hero.name}</h3>
									<p className="hero-amount">{hero.amount}</p>
								</div>
							</div>
							<div className="pedestal-bar"></div>
						</div>
					))}
				</div>

				<div className="heroes-cta">
					<p className="cta-text">
						Join our community of heroes and make a difference today
					</p>
				</div>
			</div>
		</section>
	)
}

export default TopHeroes
