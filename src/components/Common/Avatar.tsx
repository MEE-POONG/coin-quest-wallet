
import React from "react";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const initials = alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div
      className={`rounded-full flex items-center justify-center ${
        sizeClasses[size]
      } ${className} ${!src ? "bg-nft-purple/20 text-nft-purple" : ""}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
