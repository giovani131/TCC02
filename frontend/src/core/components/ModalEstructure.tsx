interface ModalEscructureProps{
    content: React.ReactNode
}
export function ModalEscructure({content}: ModalEscructureProps)
{
    return(
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"> 
                {content}
            </div>
        </>
    )
}