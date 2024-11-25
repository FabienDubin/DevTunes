import { React } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '../components/ui/input'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

// |||||--------------------------------
// VVVVV   BRING ALL STATES FROM APP.JSX
const SearchAlbum = ({
	artist,
	setArtist,
	querySearch,
	setQuerySearch,
	artistAlbuns,
	setArtistAlbuns,
	access,
}) => {
	// ||||||||----------------------||||||||||||
	// VVVVVVVV   SEARCH THE ARTIST  VVVVVVVVVVVV
	async function queryArtist(token, query) {
		try {
			let getParams = {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			let artistUrl = `https://api.spotify.com/v1/search?q=${query}&type=artist`
			let artistResponse = await fetch(artistUrl, getParams)
			const artistData = await artistResponse.json()

			setArtist({
				id: artistData.artists.items[0].id,
				name: artistData.artists.items[0].name,
				image: artistData.artists.items[0].images[0].url,
				genres: artistData.artists.items[0].genres,
			})
			let albumUrl = `https://api.spotify.com/v1/artists/${artistData.artists.items[0].id}/albums`
			let albumResponse = await fetch(albumUrl, getParams)
			let albumData = await albumResponse.json()
			setArtistAlbuns(albumData.items)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='md:container mx-auto my-12'>
			<Input
				className='my-4'
				value={querySearch}
				onChange={(e) => {
					setQuerySearch(e.target.value)
				}}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						queryArtist(access.access_token, querySearch)
						setQuerySearch('')
					}
				}}
				placeholder='Search Artist and Hit Enter'
			/>
			<Card className='rounded-md'>
				<CardContent>
					<Avatar>
						<AvatarImage
							className='rounded-full w-28 mx-2 mt-6'
							src={artist.image}
						/>
					</Avatar>
					{artist.name ? (
						<CardTitle className='text-3xl font-bold m-2'>
							{artist.name}
						</CardTitle>
					) : (
						<h1>I WILL APPEAR IN HERE!!!</h1>
					)}
					{artist.genres.map((genre, index) => {
						return (
							<Badge
								key={index}
								className='mx-2'
								variant='secondary'
							>
								{genre}
							</Badge>
						)
					})}
				</CardContent>
				{/* |||||---------------------- */}
				{/* VVVVV ALBUM CARDS */}
				<CardContent className='flex flex-wrap'>
					{/* |||||---------------------- */}
					{/* VVVVV  ARTIST ALBUM CARD */}
					{artistAlbuns &&
						artistAlbuns.map((album) => {
							return (
								<Card
									key={album.id}
									className='rounded-md flex justify-between w-48 flex-col my-2 mx-auto text-center'
								>
									<div className='flex'>
										<Avatar>
											<AvatarImage
												className='shadow-lg w-20 ml-2 smb-2 mt-3'
												src={album.images[0].url}
											/>
										</Avatar>
										<div className='ml-2 text-sm'>
											<h4 className='ml-2 my-2 text-left'>
												{album.name}
											</h4>
											<p className='ml-2 my-2 text-left'>
												Tracks: {album.total_tracks}
											</p>
										</div>
									</div>
									<Badge
										className='rounded-sm bg-black m-2'
										variant='default'
									>
										Launched: {album.release_date}
									</Badge>
									<Button
										asChild
										className='rounded-sm mx-2 mb-2'
									>
										<Link to={`/albums/${album.id}`}>
											Go To Album
										</Link>
									</Button>
								</Card>
							)
						})}
				</CardContent>
			</Card>
		</div>
	)
}

export default SearchAlbum
