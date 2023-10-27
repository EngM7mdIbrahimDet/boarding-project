export interface AddEditArticleProps {
  _id?: string;
  title?: string;
  text?: string;
  timeline?: {
    date: Date | number;
    isEdit: boolean;
  };
  image: string;
}
