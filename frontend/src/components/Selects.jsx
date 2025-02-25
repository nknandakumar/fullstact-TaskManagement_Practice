import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select";
  
  const Selects = ({ name, width, ...options }) => {
    const optionKeys = Object.keys(options);
  
    return (
      <Select>
        <SelectTrigger className={width}>
          <SelectValue placeholder={name} />
        </SelectTrigger>
        <SelectContent>
          {optionKeys.map((key, index) => (
            <SelectItem key={index} value={options[key]}>
              {options[key]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default Selects;
  