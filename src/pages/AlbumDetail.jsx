import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../pages/AlbumDetail.css'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Headphones, Send } from 'lucide-react'

const AlbumDetail = ({ access }) => {
	// CONSTS
	//Getting album ID from the previous page
	const { albumId } = useParams()

	const [album, setAlbum] = useState()
	const [comments, setComments] = useState()

	//API CALLS
	useEffect(() => {
		//Spotify API call to get album details
		async function getAlbumInfos() {
			try {
				console.log(access.access_token)
				const { data } = await axios.get(
					`https://api.spotify.com/v1/albums/${albumId}`,
					{
						headers: {
							Authorization: `Bearer ${access.access_token}`,
						},
					}
				)
				setAlbum(data)
				console.log('got album datas', data)
			} catch (error) {
				console.log(error)
			}
		}
		// wait to getting the token
		if (access.access_token) {
			getAlbumInfos()
		}

		// JSON Server to get comments
		async function getAlbumComments() {
			try {
				const { data } = await axios.get(
					`http://localhost:5005/comments?albumId=${albumId}`
				)
				setComments(data)
				console.log('got comments ;)', data)
			} catch (error) {
				console.log(error)
			}
		}
		getAlbumComments()
	}, [albumId, access])

	//FUNCTIONS
	function convertDuration(duration) {
		const minutes = Math.floor(duration / 60000)
		const seconds = Math.floor((duration % 60000) / 1000)
		return `${minutes}:${seconds.toString().padStart(2, '0')}`
	}

	//////////------DETAIL PAGE--------/////

	if (!album) {
		return <div>Loading album information...</div>
	}
	return (
		<div>
			{/* Album presentation */}
			<div className='header-container'>
				<img src={album.images[1].url} alt={album.name} />
				<div className='header-title'>
					<h1>{album.name}</h1>
					<h2>{album.artists[0].name} </h2>
					<h3>Label: {album.label}</h3>
					<Button>
						<Headphones />
						See on Spotify
					</Button>
				</div>
				{/* Track list */}
				<Accordion type='single' collapsible className='w-full'>
					<AccordionItem value='item-1'>
						<AccordionTrigger>See the track list</AccordionTrigger>
						<AccordionContent>
							<div className='Tracks container'></div>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='w-[100px]'>
											#
										</TableHead>
										<TableHead>Track</TableHead>
										<TableHead>Artists</TableHead>
										<TableHead className='text-right'>
											Duration
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{album.tracks.items.map((track) => (
										<TableRow key={track.track_number}>
											<TableCell className='font-medium'>
												{track.track_number}
											</TableCell>
											<TableCell>{track.name}</TableCell>
											<TableCell>
												{track.artists
													.map(
														(artist) => artist.name
													)
													.join(', ')}
											</TableCell>
											<TableCell className='text-right'>
												{convertDuration(
													track.duration_ms
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger>See comments</AccordionTrigger>

						<AccordionContent></AccordionContent>
					</AccordionItem>
				</Accordion>
				Add a comment
				<div className='comment-box'>
					<Textarea placeholder='Type your comment here.' />
					<Button>
						<Send />
						Send
					</Button>
					<div className='all-comments'>
						<Card>
							<CardHeader>
								<CardTitle className='flex'>
									<Avatar>
										''
										<AvatarImage src='https://github.com/shadcn.png' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>{' '}
									UserName
								</CardTitle>
								<CardDescription>
									Card Description
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p>Card Content</p>
							</CardContent>
							<CardFooter>
								<p>Card Footer</p>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AlbumDetail
