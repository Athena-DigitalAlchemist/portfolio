import { ComponentType, useState, useEffect } from "react"
import { motion } from "framer-motion"
import useMousePosition from "../hooks/useMousePosition"

interface MaskProps {
    children: React.ReactNode;
    className?: string;
    revealText?: boolean;
}

const MaskContainer = ({ children, className = "", revealText = false }: MaskProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const [maskSize, setMaskSize] = useState(0);

    useEffect(() => {
        setMaskSize(isHovered ? 400 : 40);
    }, [isHovered]);

    return (
        <motion.div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                WebkitMaskPosition: `${x - maskSize / 2}px ${y - maskSize / 2}px`,
                WebkitMaskSize: `${maskSize}px`,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.6 }}
            style={{
                WebkitMaskImage: `url('/mask.svg')`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: `${x - maskSize / 2}px ${y - maskSize / 2}px`,
                WebkitMaskSize: `${maskSize}px`,
            }}
        >
            {children}
        </motion.div>
    );
};

export default MaskContainer;
