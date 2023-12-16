import { SelectSeparator } from "@/components/ui/select"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReportTable } from "./reportTable";
import UpdateStokComponent from "./updateStok";

const LaporanClosingPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full min-h-screen px-4">
      <h1 className="text-center">Laporan Closing Harian</h1>
      <div className="mt-5">
        <ul className="flex items-center space-x-4 text-sm text-muted-foreground">
          <li className="">
            <p>Pembuat</p>
            <p>Lokasi</p>
          </li>
          <li className="w-full">
            <p>: {session?.user.fullname}</p>
            <p>: {session?.user.location}</p>
          </li>
        </ul>
      </div>
      <SelectSeparator className="my-5" />
      <ReportTable location={session?.user.location} />
      <SelectSeparator className="my-5" />
    </div>
  )
}

export default LaporanClosingPage