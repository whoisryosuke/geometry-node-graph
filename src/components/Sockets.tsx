const Sockets = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <marker
            id="CIRCLE"
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
          >
            <circle cx="4.5" cy="4.5" r="4" fill="#A1A1A1" stroke="#1B1B1B" />
          </marker>
          <marker
            id="DIAMOND"
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
          >
            <rect
              x="0.843186"
              y="6.5"
              width="8"
              height="8"
              transform="rotate(-45 0.843186 6.5)"
              fill="#A1A1A1"
              stroke="#1B1B1B"
            />
          </marker>
          <marker
            id="DIAMOND_DOT"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.64645 6.59619L1.29289 6.94975L1.64645 7.3033L6.59619 12.253L6.94975 12.6066L7.3033 12.253L12.253 7.3033L12.6066 6.94975L12.253 6.59619L7.3033 1.64645L6.94975 1.29289L6.59619 1.64645L1.64645 6.59619ZM7.5 7.00004C7.5 7.27618 7.27614 7.50004 7 7.50004C6.72386 7.50004 6.5 7.27618 6.5 7.00004C6.5 6.7239 6.72386 6.50004 7 6.50004C7.27614 6.50004 7.5 6.7239 7.5 7.00004Z"
              fill="#A1A1A1"
              stroke="#1B1B1B"
            />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default Sockets;
