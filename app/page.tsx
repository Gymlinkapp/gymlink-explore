'use client'
import { UserButton, useAuth, useUser } from '@clerk/nextjs'

export default function Home() {
  const { isLoaded, isSignedIn, user} = useUser()
// In case the user signs out while on the page.
  if (!isLoaded || !user) {
    return null;
  }

  return (
    <main>
      <h1>Gymlink</h1>
      <p>{user?.fullName}</p>
      <p>{user.emailAddresses[0].emailAddress}</p>
      <p>{user.phoneNumbers[1]?.phoneNumber}</p>
      <UserButton />
    </main>
  )
}
