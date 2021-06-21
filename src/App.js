import "antd/dist/antd.css";
import "./App.css";
import MainPageComponent from "./main/index.js";
import UploadPage from "./upload";
import AuctionUpload from "./auctionupload";
import ProductPage from "./product";
import LoginPage from "./login/index";
import RegisterPage from "./register/index";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { Button, Affix, Menu, Dropdown } from "antd";
import {
  CarOutlined,
  ThunderboltOutlined,
  CameraOutlined,
  HeartOutlined,
  SkinOutlined,
  LaptopOutlined,
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { login, logout } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLogin = useSelector((store) => store.isLogin);
  const upload= function () {
                    history.push("/upload");
                  }
  const auctionupload = () => {
    history.push("/auctionupload")
  }
                  
  // 
  const menu = (
  <Menu >
    <Menu.Item icon={<SkinOutlined />} key="1" >
      의류
    </Menu.Item>
    <Menu.Item icon={<HeartOutlined />} key="1" >
      신발,가방,잡화
    </Menu.Item>
    <Menu.Item icon={<LaptopOutlined />} key="1" >
      컴퓨터,주변기기
    </Menu.Item>
    <Menu.Item icon={<CameraOutlined />} key="1">
      카메라
    </Menu.Item>
    <Menu.Item icon={<ThunderboltOutlined />} key="1">
      디지털,가전
    </Menu.Item>
    <Menu.Item icon={<CarOutlined />} key="1">
      자동차
    </Menu.Item>
  </Menu>
);
  const menu2 = (
  <Menu >
    <Menu.Item onClick={upload} key="1" icon={<PlusOutlined />}>
      일반상품
    </Menu.Item>
    <Menu.Item onClick={auctionupload} key="2" icon={<PlusOutlined />}>
      경매상품
    </Menu.Item>
  </Menu>
);

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
                  <Button size="large" onClick={logoutProc} className="k-button">
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
                    className="k-button"
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

        <div id="header-cat">
          <div id="header-area-cat">
              <>
                <div>
                  <Dropdown overlay={menu}>
                    <Button
                      className="k-button"
                      size="large"
                      icon={<DownOutlined />}
                    >
                      카테고리
                    </Button>
                  </Dropdown>
                </div>
              </>
              <>
                <Dropdown overlay={menu2}>
                    <Button
                      className="k-button"
                      size="large"
                      icon={<PlusOutlined />}
                    >
                      상품 업로드
                    </Button>
                  </Dropdown>
              </>
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
          <Route exact={true} path="/auctionupload">
            <AuctionUpload />
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
