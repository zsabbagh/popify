/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import { Model } from "../interfaces";


export default {
  userAuthToken: undefined,
  user: undefined,
  pages: ["Statistics", "Quiz"]
} as Model;
