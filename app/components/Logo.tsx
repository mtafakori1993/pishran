import Image from "next/image";
import logoImage from "../assets/images/logo.png";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = "h-8 w-8", priority = false }: LogoProps) {
  return (
    <Image
      src={logoImage}
      alt="پیشران"
      width={logoImage.width}
      height={logoImage.height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
