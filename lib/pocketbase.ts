import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

export const getImageURL = (recordId: String, fileName: String) => {
  return `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/${recordId}/${fileName}`;
};