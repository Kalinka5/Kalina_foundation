import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Alert from "@mui/material/Alert"

import api from "../lib/api.js"

import DeleteButton from "../components/DeleteButton.tsx"
import Header from "../components/Header.tsx"
import Input from "../components/ItemEdit/Input.tsx"
import { H1, H4 } from "../components/ItemEdit/Titles.tsx"
import UpdateButton from "../components/ItemEdit/UpdateButton.tsx"
import UploadImage from "../components/UploadImage.tsx"

import { HOME_PAGE } from "../lib/constants.js"

import { useItemData } from "../lib/hooks.tsx"

import "../styles/itemEdit.css"

function ItemEdit() {
	const { id } = useParams() as { id: string }

	const [title, setTitle] = useState("")
	const [image, setImage] = useState<File | null>(null)
	const [imageUrl, setImageURL] = useState("")
	const [amount, setAmount] = useState(0)
	const [fullPrice, setFullPrice] = useState(0)
	const [collected, setCollected] = useState(0)

	const [loading, setLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const navigate = useNavigate()

	const successAlert = (
		<Alert
			variant="filled"
			severity="success"
			className="alert-message"
			onClose={() => {
				setIsSuccess(false)
			}}
		>
			Item (id={id}) was updated successfully!
		</Alert>
	)

	const item = useItemData(id)

	useEffect(() => {
		if (item.data) {
			setTitle(item.data.title)
			setImageURL(item.data.image)
			setAmount(item.data.amount)
			setFullPrice(item.data.full_price)
			setCollected(item.data.collected)
		}
	}, [item.data])

	const handleSubmit = async e => {
		setLoading(true)
		e.preventDefault()

		const formData = new FormData()
		formData.append("title", title)
		image && formData.append("image", image, image.name)
		formData.append("amount", amount.toString())
		formData.append("full_price", fullPrice.toString())
		formData.append("collected", collected.toString())

		try {
			await api(`/items/${id}/`, {
				method: "PATCH",
				body: formData,
			})
			console.log(`Item (id=${id}) was updated successfully!`)
			setIsSuccess(true)
		} catch (error) {
			alert(error)
			console.log("Something go wrong when updating user profile!")
		} finally {
			setLoading(false)
		}
	}

	const deleteItem = async e => {
		e.preventDefault()

		try {
			await api(`/items/${id}/`, {
				method: "DELETE",
			})
			console.log(`Item (id=${id}) was deleted successfully!`)
			navigate(`${HOME_PAGE}`)
		} catch (error) {
			alert(error)
			console.log("Something go wrong when updating user profile!")
		}
	}

	return (
		<div className="edit-item header-body">
			<Header />
			<div className="item-desc main-body">
				{isSuccess && successAlert}
				<form onSubmit={handleSubmit} className="item-card container">
					<div className="row">
						<H1>
							Item (<i>{id} id</i>)
						</H1>
						<UploadImage
							imageUrl={imageUrl}
							setImage={setImage}
							setImageURL={setImageURL}
						/>
					</div>
					<div className="row">
						<H4>Title</H4>
						<Input
							value={title}
							onChange={setTitle}
							placeholder="Title"
							withIcon={true}
							styleName="input-group-icon"
							type="text"
						/>
					</div>
					<div className="row">
						<H4>Amount</H4>
						<Input
							value={amount}
							onChange={setAmount}
							placeholder="Amount"
							withIcon={true}
							styleName="input-group-icon"
							type="text"
						/>
					</div>
					<div className="row columns">
						<div className="col-half">
							<H4>Full Price</H4>
							<Input
								value={fullPrice}
								onChange={setFullPrice}
								placeholder="1000000"
								withIcon={false}
								type="number"
							/>
						</div>
						<div className="col-half">
							<H4>Collected</H4>
							<Input
								value={collected}
								onChange={setCollected}
								placeholder="100"
								withIcon={false}
								type="number"
							/>
						</div>
					</div>
					<div className="row">
						<div className="btn-container">
							<UpdateButton loading={loading} />
							<DeleteButton onClick={deleteItem} className="item" />
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ItemEdit
