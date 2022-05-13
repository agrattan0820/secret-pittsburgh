import S from "@sanity/desk-tool/structure-builder";
import { FaHome, FaInfoCircle } from "react-icons/fa";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(FaHome)
        .child(
          S.editor()
            .id("homepage")
            .title("Homepage")
            .schemaType("homepage")
            .documentId("homepage")
            .views([S.view.form()])
        ),
      S.listItem()
        .title("About Page")
        .icon(FaInfoCircle)
        .child(
          S.editor()
            .id("about")
            .title("About Page")
            .schemaType("about")
            .documentId("about")
            .views([S.view.form()])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["homepage"].includes(listItem.getId()) &&
          !["about"].includes(listItem.getId())
      ),
    ]);
