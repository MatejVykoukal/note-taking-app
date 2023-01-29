import type { ReactNode, FC } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Props {
  children: ReactNode;
}

const NotesListLayout: FC<Props> = ({ children }) => {
  const masonryColumnConfig = { 0: 1, 800: 2, 1200: 3 };

  return (
    <ResponsiveMasonry columnsCountBreakPoints={masonryColumnConfig}>
      <Masonry gutter="1rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default NotesListLayout;
