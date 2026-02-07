"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends ImageProps {
    fallbackSrc?: string;
}

/**
 * 画像の読み込みに失敗した場合にフォールバックを表示するコンポーネント
 */
export function SafeImage({ 
    src, 
    fallbackSrc = "/images/no-image.png", 
    alt, 
    ...props 
}: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isError, setIsError] = useState(false);

    return (
        <Image
            {...props}
            src={isError ? fallbackSrc : imgSrc}
            alt={alt}
            onError={() => {
                if (!isError) {
                    setIsError(true);
                }
            }}
        />
    );
}
