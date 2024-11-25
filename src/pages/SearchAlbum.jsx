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
		<div className='container'>
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
			<Card>
				<CardContent>
					<Avatar>
						<AvatarImage
							className='rounded-full w-28 mx-2 mt-6'
							src={artist.image}
						/>
					</Avatar>
					<CardTitle className='text-3xl font-bold m-2'>
						{artist.name}
					</CardTitle>
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

				<CardContent className='flex flex-wrap'>
					{artistAlbuns &&
						artistAlbuns.map((album) => {
							return (
								<Card
									key={album.id}
									className='flex justify-between w-48 flex-col my-2 mx-auto text-center'
								>
									<Avatar>
										<AvatarImage
											className='rounded-full w-20 mx-auto mt-2'
											src={album.images[0].url}
										/>
									</Avatar>
									<h4>{album.name}</h4>
									<p>Total Tracks: {album.total_tracks}</p>
									<Badge className='m-2' variant='outline'>
										Launched: {album.release_date}
									</Badge>
									<Button asChild className='mx-2 mb-2'>
										<Link
											to={`/${artist.name}/${album.name}/${album.id}/tracks`}
										>
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
