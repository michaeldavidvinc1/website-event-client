import * as React from "react";
import { DateRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";

export default function IndexDate({ date, onChangeDate, setIsShowed }) {
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const refDate = React.useRef(null);
  const handleClickOutside = (event) => {
    if (refDate && !refDate.current.contains(event.target)) {
      setIsShowed(false);
    }
  };

  const check = (focus) => {
    focus.indexOf(1) < 0 && setIsShowed(false);
  };

  return (
    <div
      className="position-absolute"
      // style={{ top: '59px' }}
      style={{ zIndex: "1" }}
      ref={refDate}
    >
      <DateRange
        // locale={locales["id"]}
        editableDateInputs={true}
        onChange={onChangeDate}
        moveRangeOnFirstSelection={false}
        onRangeFocusChange={check}
        ranges={[date]}
        maxDate={new Date()}
      />
    </div>
  );
}
