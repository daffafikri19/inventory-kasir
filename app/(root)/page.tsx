import { UserAuthForm } from "./authForm";

export default function Home() {
  return (
    <main>
      <>
      <div className="container relative h-full min-h-screen flex-col items-center justify-center grid lg:max-w-none md:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r md:flex md:flex-col">
          <div className="absolute inset-0 bg-[url('/images/bg-auth.jpg')] bg-cover" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Inventory Kasir by Teh Solo
          </div>
        </div>
        <div className="p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login ke dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Masukan ID karyawan dan passwordnya
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
    </main>
  )
}
