import { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setDebounceValue(value);
    }, ms);
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;

//Mục tiêu: Khi người dùng nhập thay đổi giá sẽ gọi API
//Vấn đề: Gọi API liên tục theo mỗi lần nhập
//Cách làm: Chỉ call api khi mà ng dùng nhập xong
//Thời gian onChange

//Tách price thành 2 biến
//1. Biến để phục vụ UI, gõ tới đâu thì lưu tới đó => UI render
//2. Biến thứ dùng qđ call api => setTimeout => biến sẽ gán sau 1 khoản thời gian
