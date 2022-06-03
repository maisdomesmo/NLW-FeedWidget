import { CloseButton } from "../CloseButton";
import  bugImageUrl  from '../../assets/Bug.svg'
import  ideaImageUrl from '../../assets/Idea.svg'
import  thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG:{
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA:
    {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER:
    {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    }
}



export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm (){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false);   

    function handleRestartFeedBack(){
        setFeedbackSent(false)
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
        { feedbackSent? (<FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedBack} />):
        (
            <>
            {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
        ): (
            <FeedbackContentStep feedbackType={feedbackType} 
            onFeedbackRestartRequested={handleRestartFeedBack}
            onFeedbackSent={()=> setFeedbackSent(true)}
            />
        )}

            </>
        )}
        

        
        <footer className="text-xs text-neutral-400">
         Feito com ♥ por  <a href="#" className="underline underline-offset-2">João</a>
        </footer>

        </div>
    )
        
}