import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Selects = ({ name, width, ...options }) => {
  const optionKeys = Object.keys(options).filter((key) => options[key]); // Filter out empty values

  return (
    <Select>
      <SelectTrigger className={width}>
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        {optionKeys.length > 0 ? (
          optionKeys.map((key, index) => (
            <SelectItem key={index} value={options[key]}>
              {options[key]}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="default" disabled>
            No options available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default Selects;
