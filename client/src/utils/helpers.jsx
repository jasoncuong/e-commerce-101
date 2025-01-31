import icons from "./icon";

const { AiFillStar, AiOutlineStar } = icons;

//
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

//
export const formatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString();

//
export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  //4 => [1,1,1,1,0]
  //2 => [1,1,0,0,0]
  const stars = [];
  for (let i = 0; i < +number; i++) {
    stars.push(<AiFillStar color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<AiOutlineStar color="orange" size={size || 16} />);
  }

  return stars;
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let array of formatPayload) {
    if (array[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: array[0], message: "Require this field" },
      ]);
    }
  }

  // for (let array of formatPayload) {
  //   switch (array[0]) {
  //     case "email":
  //       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       if (!array[1].match(regex)) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: array[0], message: "Invalid email." },
  //         ]);
  //       }
  //       break;

  //     case "password":
  //       if (array[1].length < 6) {
  //         invalids++;
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: array[0], message: "Password minimum 6 characters." },
  //         ]);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // }

  return invalids;
};
