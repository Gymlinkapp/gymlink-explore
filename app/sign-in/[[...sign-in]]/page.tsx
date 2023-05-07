import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <main className="h-screen bg-dark-500 grid place-items-center">
      <SignIn path="/sign-in" routing="path" />
    </main>
  )
}
