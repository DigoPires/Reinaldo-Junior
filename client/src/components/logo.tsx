interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <img
      src="/img/logoRJ_bola.png"
      alt="Logo Reinaldo Junior"
      className={`${sizeClasses[size]} object-contain`}
    />
  );
}

