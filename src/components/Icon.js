import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { platformKeyToIconUrl } from "/assets/icons/platformIcons";
import carrierKeyToIconUrl from "../utils/carrierKeyToIconUrl";

export function Icon(props) {
  const { icon } = props;
  return <FontAwesomeIcon {...props} icon={icon} />;
}

export function PlatformIcon({ height, width, icon }) {
  const iconUrl = platformKeyToIconUrl.get(icon);
  const needsNoMargin = ["fakeshop", "bigcartel", "chargify"].includes(icon);
  return (
    <img
      src={iconUrl}
      alt={`${icon} logo`}
      style={{ height: `${height}px`, width: `${width}px` }}
      className={needsNoMargin ? "" : "mr-[6px]"}
    />
  );
}

export function CarrierIcon({ carrierKey, mailClassKey }) {
  const height = carrierKey === "UPS" ? "22px" : "17px";
  return (
    <img
      src={carrierKeyToIconUrl(carrierKey, mailClassKey)}
      alt={`${carrierKey} logo`}
      data-testid={carrierKey}
      style={{ height }}
    />
  );
}

export function TooltipIcon({ id }) {
  return (
    <FontAwesomeIcon
      id={id}
      icon="circle-question"
      className="min-w-[16px] h-[16px] mx-[3px] text-[13px] align-middle cursor-pointer text-grey50 hover:text-darkBlue"
    />
  );
}

export default Icon;
