import { useTranslations } from "next-intl";

const useTranslation = () => {
  const LanguageSelectTrans = useTranslations("Language");
  const MainTrans = useTranslations("MainPage");
  const HeaderTrans = useTranslations("Header");
  const LoginTrans = useTranslations("LoginPage");
  const MyTrans = useTranslations("MyPage");
  const PostTrans = useTranslations("PostPage");
  const ViewTrans = useTranslations("ViewPage");
  return {
    LanguageSelectTrans,
    MainTrans,
    HeaderTrans,
    LoginTrans,
    MyTrans,
    PostTrans,
    ViewTrans,
  };
};

export default useTranslation;
