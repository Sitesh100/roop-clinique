export type ServiceCardIcon =
  | { svg: React.ReactNode }
  | { src: string; alt?: string };

type ServiceCardVariant = "default" | "compact" | "centered";

interface Props {
  title: string;
  description?: string;
  icon: ServiceCardIcon;
  variant?: ServiceCardVariant;
}

export default function ServiceCard({
  title,
  description,
  icon,
  variant = "default",
}: Props) {
  const renderIcon = () => (
    <div className="relative w-[132px] h-[132px]">
      {"svg" in icon ? (
        <div className="w-full h-full">{icon.svg}</div>
      ) : (
        <img
          src={icon.src}
          alt={icon.alt ?? title}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );

  // Compact variant: title top-left, icon below, shorter height
  if (variant === "compact") {
    return (
      <div className="bg-[#D5EDFD] rounded-[80px] rounded-tl-[0px] p-5 flex flex-col gap-4 h-[240px] w-full">
        <h3 className="text-[26px] text-left">{title}</h3>
        <div className="flex items-center justify-center flex-1">
          {renderIcon()}
        </div>
      </div>
    );
  }

  // Centered variant: icon and title both centered
  if (variant === "centered") {
    return (
      <div className="bg-[#D5EDFD] rounded-[50px] rounded-tl-[0px] p-5 flex flex-col gap-3 items-center justify-center h-[220px] w-full">
        <div className="relative w-[115px] h-[115px]">
          {"svg" in icon ? (
            <div className="w-full h-full">{icon.svg}</div>
          ) : (
            <img
              src={icon.src}
              alt={icon.alt ?? title}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <h3 className="text-[22px] text-center leading-tight">{title}</h3>
      </div>
    );
  }

  // Default variant: with description, original layout
  return (
    <div className="bg-[#D5EDFD] rounded-[80px] rounded-tl-[0px] p-4 flex flex-col gap-5 items-center h-[319px] w-full justify-center">
      <div className="flex flex-col items-start gap-3">
        <h3 className="text-[26px]">{title}</h3>
        {description && (
          <p className="text-[13px] max-w-[195px]">{description}</p>
        )}
      </div>
      {renderIcon()}
    </div>
  );
}
