import './style/global.less';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageLayout from './layout';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import './mock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGetUserInfo } from '@/API/user';

const queryClient = new QueryClient();

function Index() {
  useGetUserInfo();

  useEffect(() => {
    if (checkLogin()) {
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={PageLayout} />
    </Switch>
  );
}

function APP() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }
  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ConfigProvider
          locale={getArcoLocale()}
          componentConfig={{
            Card: {
              bordered: false,
            },
            List: {
              bordered: false,
            },
            Table: {
              border: false,
            },
          }}
        >
          <GlobalContext.Provider value={contextValue}>
            <Index />
          </GlobalContext.Provider>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

ReactDOM.render(<APP />, document.getElementById('root'));
