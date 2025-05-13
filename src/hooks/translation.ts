import { useTranslations } from "next-intl";

const useTrans = () => {
  const LanguageSelectTrans = useTranslations("Language");
  const MainTrans = useTranslations("MainPage");
  const HeaderTrans = useTranslations("Header");
  const LoginTrans = useTranslations("LoginPage");
  const MyTrans = useTranslations("MyPage");
  const PostTrans = useTranslations("PostPage");
  return {
    LanguageSelectTrans,
    MainTrans,
    HeaderTrans,
    LoginTrans,
    MyTrans,
    PostTrans,
  };
};

export default useTrans;
