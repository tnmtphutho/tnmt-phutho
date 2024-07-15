import { Typography } from "@mui/material";

const roundToTwoDecimalPlaces = (num: number): number => parseFloat(num?.toFixed(2));

const FormatCellValue = (value: number) => {
  const formattedValue = roundToTwoDecimalPlaces(value);
  
  return (
    <Typography
      style={{ color: formattedValue < 0 ? 'red' : 'inherit', fontSize: '0.875rem' }}

    >
      {formattedValue}
    </Typography>
  );
};

export default FormatCellValue