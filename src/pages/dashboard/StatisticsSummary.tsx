interface StatisticsSummaryProps {
    title: string;
    value: string;
    colorClass: string;
    customStyle?: React.CSSProperties;
    imageSrc?: string;  
    imageStyle?: React.CSSProperties;
    secondaryImageSrc?: string;  
    secondaryImageStyle?: React.CSSProperties; 
    tertiaryImageSrc?: string;  
    tertiaryImageStyle?: React.CSSProperties; 
}

const StatisticsSummary: React.FC<StatisticsSummaryProps> = ({ 
    title, 
    value, 
    colorClass, 
    customStyle, 
    imageSrc, 
    imageStyle, 
    secondaryImageSrc, 
    secondaryImageStyle ,
    tertiaryImageSrc,
    tertiaryImageStyle
}) => {
    return (
        <div 
            className="bg-white shadow-md rounded-lg p-6 relative" 
            style={{ ...customStyle, minWidth: '300px', height: '180px' }}
        >
            {/* First Image */}
            {imageSrc && (
                <img 
                    src={imageSrc} 
                    alt="Decorative icon" 
                    className="absolute top-0 right-0"  
                    style={imageStyle}  
                />
            )}
            
            {/* Second Image */}
            {secondaryImageSrc && (
                <img 
                    src={secondaryImageSrc} 
                    alt="Secondary icon" 
                    className="absolute bottom-16 left-4 w-36" 
                    style={secondaryImageStyle}  
                />
            )}
            {/* Thrid Image */}
            {tertiaryImageSrc && (
                <img 
                    src={tertiaryImageSrc} 
                    alt="Secondary icon" 
                    className="absolute bottom-3 left-4 w-48" 
                    style={tertiaryImageStyle}  
                />
            )}
            
            <h2 className="text-xs text-white font-semibold mt-[-8px]">{title}</h2>
            <p className={`text-lg font-bold ${colorClass} mt-[-4px]`}>{value}</p>
        </div>
    );
};

export default StatisticsSummary;
