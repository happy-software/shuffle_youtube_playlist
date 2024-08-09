import { useEffect, useRef } from 'react'

export default function useEffectOnce(effectFunction) {
    const wasUsed = useRef(false)

    useEffect(() => {
        if (!wasUsed.current) {
            effectFunction()
            wasUsed.current = true
        }
    }, [effectFunction])
}