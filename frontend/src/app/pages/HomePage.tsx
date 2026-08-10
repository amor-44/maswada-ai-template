import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"


export function HomePage() {
  return (
    <div className="space-y-12">
      <GlassCard className="px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">My Notes</h1>
          <Button><Plus />Create Note</Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1.5 text-muted-foreground w-4" />
          <Input placeholder="Search notes..." className="pl-7" />
        </div>
        <div className="flex flex-col gap-4">
          <GlassCard className="p-4">
            My first note
          </GlassCard>
        </div>
      </GlassCard>
    </div>
  )
}
