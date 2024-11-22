import { motion } from 'framer-motion';
import MaskContainer from './Masking';

interface MaskedTextProps {
    text: string[];
    className?: string;
}

const MaskedText = ({ text, className = '' }: MaskedTextProps) => {
    return (
        <MaskContainer className={className}>
            {text.map((line, index) => (
                <span key={index}>
                    {line}
                    {index < text.length - 1 && <br />}
                </span>
            ))}
        </MaskContainer>
    );
};

export default MaskedText;
