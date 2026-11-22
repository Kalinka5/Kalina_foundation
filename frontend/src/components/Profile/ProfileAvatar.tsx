import { useEffect, useState } from "react"

import { initials } from "../../lib/profile"

type ProfileAvatarProps = {
	src: string | null
	name: string
	className?: string
}

/** Round photo that falls back to initials when there is none or it fails to load. */
function ProfileAvatar({ src, name, className = "" }: ProfileAvatarProps) {
	const [failed, setFailed] = useState(false)
	useEffect(() => setFailed(false), [src])

	return (
		<span className={`profile-avatar ${className}`}>
			{src && !failed ? (
				<img src={src} alt="" onError={() => setFailed(true)} />
			) : (
				<span className="profile-avatar-initials" aria-hidden="true">
					{initials(name)}
				</span>
			)}
		</span>
	)
}

export default ProfileAvatar
