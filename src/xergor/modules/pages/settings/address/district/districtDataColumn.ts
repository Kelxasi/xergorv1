import { ColumnType } from "src/xergor/shared/components/nsgrid/nsgrid.model";

 
export const CityColumnCollection = [
  {
    name: "id",
    title: "CityId",
    separator: true,
    width: 100
  },
  {
    name: "cityCode",
    title: "City Code",
    separator: true
  },
  {
    name: "cityName",
    title: "City Name",
    separator: true
  },
  {
    name: "insertedAt",
    title: "Kayıt Zamanı",
    type: ColumnType.DATETIME,
    dateTime: {
        min: new Date(2021, 0, 1),
        max: new Date(2021, 12, 0),
        showSeconds: true
      }
  },
  {
    name: "updatedAt",
    title: "Güncelleme Zamanı",
    type: ColumnType.DATE,
    date: {
        min: new Date(2021, 0, 1),
        max: new Date(2021, 12, 0)
      }
  }
];
 