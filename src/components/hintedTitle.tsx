import { Children } from "@/utils/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CircleHelp } from 'lucide-react';

export default function HintedTitle({title, children}: {title: string} & Children) {
  return (
    <Dialog>
      <DialogTrigger>
        <h1>
          <div className="flex gap-10 items-center justify-between w-full">
            {title}
            <CircleHelp size={28} className="transition-colors text-black/20 dark:text-white/30 cursor-pointer hover:text-black/90 dark:hover:text-white/90" />
          </div>
        </h1>
      </DialogTrigger>
      <DialogContent className="[--spacing:0.25rem] lg:max-w-screen-lg overflow-y-scroll max-h-screen min-h-screen font-family-inter">
        <DialogHeader className="text-start px-2">
          <DialogTitle className="text-2xl font-bold">{title}<span className="opacity-50">&nbsp;&nbsp;–&nbsp;&nbsp;теория</span></DialogTitle>
        </DialogHeader>
        <div className="[--spacing:0.0625rem] prose dark:prose-invert pb-25 pt-10 px-10">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
