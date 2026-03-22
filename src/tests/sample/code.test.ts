import { test } from "@playwright/test";

test("new", async () => {
  function isPalindrome(str: string) {
    if (str.length <= 1) return true;

    // Compare first and last characters
    if (str[0] !== str[str.length - 1]) return false;

    // Recurse on the substring without first/last chars
    return isPalindrome(str.slice(1, -1));
  }

  //   function isPalindrome(str: string) {
  //   if (str == str.split('').reverse().join('') ) return true;
  //   else return false
  // }

  // Examples
  console.log(isPalindrome("racecar")); // true
  console.log(isPalindrome("a1bba")); // false
  console.log(isPalindrome("abc")); // false
});
