import PocketBase from "pocketbase";

export const pb = new PocketBase("https://cdn.bramsuurd.nl");

export const getImageURL = (recordId: String, fileName: String) => {
  return `https://cdn.bramsuurd.nl/api/files/lcr86sab2cxeua1/${recordId}/${fileName}`;
};