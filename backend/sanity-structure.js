import S from "@sanity/desk-tool/structure-builder";
import { FaHome } from "react-icons/fa";

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
      ...S.documentTypeListItems().filter(
        (listItem) => !["homepage"].includes(listItem.getId())
      ),
    ]);
