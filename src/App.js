import "antd/dist/antd.css";
import "./App.css";
import MainPageComponent from "./main/index.js";
import UploadPage from "./upload";
import ProductPage from "./product";
import LoginPage from "./login/index";
import RegisterPage from "./register/index";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { Button, Affix } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { login, logout } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogin = useSelector((store) => store.isLogin);

  const logoutProc = () => {
    localStorage.removeItem("Authorization");
    dispatch(logout());
  };

  useEffect(() => {
    let jwtToken = localStorage.getItem("Authorization");
    if (jwtToken !== null) {
      dispatch(login());
    }
  }, []);

  return (
    
    <div>
      <Affix offsetTop={0}>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/잇츠마인.png" width="150" />
          </Link>
          {isLogin ? (
            <>
              <div>
                <Button
                  className="k-button"
                  size="large"
                  onClick={function () {
                    history.push("/upload");
                  }}
                  icon={<DownloadOutlined />}
                >
                  상품 업로드
                </Button>
                <Button size="large" onClick={logoutProc}>
                  로그아웃
                </Button>
              </div>
              
            </>
            
          ) : (
            <>
              <div>
                <Button
                  className="k-button"
                  size="large"
                  onClick={function () {
                    history.push("/login");
                  }}
                >
                  로그인
                </Button>

                <Button
                  size="large"
                  onClick={function () {
                    history.push("/register");
                  }}
                >
                  회원가입
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      </Affix>
      
      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            <MainPageComponent />
          </Route>
          <Route exact={true} path="/products/:id">
            <ProductPage />
          </Route>
          <Route exact={true} path="/upload">
            <UploadPage />
          </Route>
          <Route exact={true} path="/login">
            <LoginPage />
          </Route>
          <Route exact={true} path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
