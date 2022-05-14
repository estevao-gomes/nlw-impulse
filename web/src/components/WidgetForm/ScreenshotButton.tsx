import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps{
    onScreenshotTook: (screenshot: string | null) => void;
    screenshot: string|null;
}

export function ScreenshotButton({onScreenshotTook, screenshot}:ScreenshotButtonProps){
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true);
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64Image = canvas.toDataURL('image/png');

        onScreenshotTook(base64Image);

        setIsTakingScreenshot(false);
    }

    if(screenshot){
        return(
            <button
                type="button"
                className="p-1 w-18 h-18 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors "
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180
                }}
                onClick={()=> onScreenshotTook(null)}
            >
                <Trash weight="fill"/>
            </button>
        )
    }
    return(
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 dark:bg-zinc-800 bg-zinc-100 rounded-md border-transparent dark:hover:bg-zinc-700 hover:bg-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
        {isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6"/>}
        </button>
    )
}