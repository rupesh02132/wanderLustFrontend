import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null);
    onDatesChange(date, null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDatesChange(startDate, date);
  };

  return (
    <div className="d-flex gap-2">
      <div className="w-50">
        <label>Check-in</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          minDate={new Date()}
          className="form-control"
          placeholderText="Select check-in"
        />
      </div>
      <div className="w-50">
        <label>Check-out</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || new Date()}
          className="form-control"
          placeholderText="Select check-out"
          disabled={!startDate}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;