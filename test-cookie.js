import { createCookie } from '@remix-run/node';

let cookie = createCookie("i18n");

async function test() {
  const val = await cookie.parse("i18n=en");
  console.log("Parsed 'i18n=en':", val);
  
  const serialized = await cookie.serialize("en");
  console.log("Serialized 'en':", serialized);
}

test();
