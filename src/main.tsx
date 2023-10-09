import './style/global.less';
import './mock';

import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

import { useGetUserInfo } from '@/API/user';

import { GlobalContext } from './context';
import PageLayout from './layout';
import Login from './pages/login';
import changeTheme from './utils/changeTheme';
import checkLogin from './utils/checkLogin';
import useStorage from './utils/useStorage';

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
  const [lang, setLang] = useStorage('arco-lang', 'zh-CN');
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
