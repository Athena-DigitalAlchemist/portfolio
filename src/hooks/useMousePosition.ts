import { useState, useEffect } from "react"

interface MousePosition {
    x: number | null
    y: number | null
}

function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null })

    const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.pageX, y: e.pageY })
    }

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition)

        return () => window.removeEventListener("mousemove", updateMousePosition)
    }, [])

    return mousePosition
}

export default useMousePosition
