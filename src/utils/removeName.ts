export function removeName(fullString: string, nameToRemove: string): string {
  const namesArray: string[] = fullString.split(",").map((name) => name.trim());

  const filteredArray: string[] = namesArray.filter(
    (name) => name !== nameToRemove
  );

  return filteredArray.join(", ");
}

//   // Ví dụ sử dụng:
//   const usersString: string = "Ho Hieu, Phan Nghi, Do Phong";

//   const result1: string = removeName(usersString, "Phan Nghi");
//   console.log(result1); // Kết quả: "Ho Hieu, Do Phong"

//   const result2: string = removeName(usersString, "Do Phong");
//   console.log(result2); // Kết quả: "Ho Hieu, Phan Nghi"

//   const result3: string = removeName(usersString, "Ho Hieu");
//   console.log(result3); // Kết quả: "Phan Nghi, Do Phong"
