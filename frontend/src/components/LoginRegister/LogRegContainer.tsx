import useOrientation from "../../lib/useOrientation"

import Carousel from "./Carousel"
import ShapeBackground from "./ShapeBackground"

import { LogRegContainerProps } from "../../lib/types"

import "../../styles/loginRegister/logRegContainer.css"

function LogRegContainer({ message, children }: LogRegContainerProps) {
	const orientation = useOrientation()

	return (
		<div className="login-register main-body">
			{message && message}

			{orientation.isPortrait ? (
				<div className="portrait">
					<ShapeBackground />
					{children}
				</div>
			) : (
				<div className="landscape">
					<div className="column">
						<Carousel />
					</div>
					<div className="column">{children}</div>
				</div>
			)}
		</div>
	)
}

export default LogRegContainer
