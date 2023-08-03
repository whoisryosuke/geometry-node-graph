
type AccordionIconProps = {
  // Toggle to light mode
  light?: boolean;
};

export default function AccordionIcon({ light }: AccordionIconProps) {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 0.5L4.5 4L8 0.5" stroke={light ? "#313131" : "#C1C1C1"} />
    </svg>
  );
}